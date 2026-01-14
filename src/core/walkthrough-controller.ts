/**
 * Walkthrough Controller
 * 
 * Central orchestrator for walkthrough operations.
 * Coordinates between StateManager, AI Client, Panel, and Decorations.
 */

import * as vscode from 'vscode';
import { StateManager } from './state-manager';
import { PanelController } from '../ui/panel-controller';
import { EditorDecorations } from '../ui/editor-decorations';
import { IAIClient } from '../ai/ai-client';
import { StepGenerator } from './step-generator';
import { ContextBuilder } from '../ai/context-builder';
import { Logger } from '../utils/logger';
import {
  CodeSelection,
  WalkthroughStep,
  WalkthroughState,
} from '../types';

export class WalkthroughController {
  private stepGenerator: StepGenerator;
  private contextBuilder: ContextBuilder;
  private disposables: vscode.Disposable[] = [];

  constructor(
    private stateManager: StateManager,
    private aiClient: IAIClient | null,
    private panelController: PanelController,
    private editorDecorations: EditorDecorations
  ) {
    this.stepGenerator = new StepGenerator();
    this.contextBuilder = new ContextBuilder();
    this.setupEventListeners();
  }

  /**
   * Set up internal event listeners
   */
  private setupEventListeners(): void {
    // Listen for state changes and update UI
    this.stateManager.on('stateChanged', (state: WalkthroughState) => {
      this.panelController.postStateUpdate(state);
    });

    this.stateManager.on('stepChanged', (step: WalkthroughStep) => {
      this.highlightCurrentStep();
      void this.ensureStepExplanation(step);
    });

    // Listen for panel messages
    this.panelController.onMessage((message) => {
      this.handlePanelMessage(message);
    });
  }

  /**
   * Start a new walkthrough from code selection
   */
  async startWalkthrough(selection: CodeSelection): Promise<void> {
    Logger.info(`Starting walkthrough for ${selection.fileName}`);

    try {
      // Check for API key
      if (!this.aiClient) {
        const result = await vscode.window.showWarningMessage(
          'No API key configured. Would you like to set one now?',
          'Set API Key',
          'Cancel'
        );
        if (result === 'Set API Key') {
          await vscode.commands.executeCommand('codewalk.setApiKey');
        }
        return;
      }

      // Create new walkthrough state
      this.stateManager.createWalkthrough(selection);

      // Show panel with loading state
      this.panelController.show();
      this.panelController.postLoading(true, 'Analyzing code...');

      // Set context for walkthrough active
      await vscode.commands.executeCommand(
        'setContext',
        'codewalk.walkthroughActive',
        true
      );

      // Generate steps
      this.stateManager.setStatus('analyzing');
      const steps = this.stepGenerator.generateSteps(
        selection.content,
        selection.language,
        selection.range.startLine
      );

      // Convert to WalkthroughSteps with IDs
      const walkthroughSteps: WalkthroughStep[] = steps.map((step, index) => ({
        ...step,
        id: `step-${index}`,
        index,
      }));

      this.stateManager.setSteps(walkthroughSteps);

      // Generate explanation for first step
      this.stateManager.setStatus('generating');
      await this.generateStepExplanation(walkthroughSteps[0]);

      // Update decorations
      this.highlightCurrentStep();

      // Done loading
      this.panelController.postLoading(false);
      this.stateManager.setStatus('ready');

      Logger.info(`Walkthrough started with ${steps.length} steps`);
    } catch (error) {
      Logger.error('Failed to start walkthrough', error as Error);
      this.stateManager.setStatus('error', (error as Error).message);
      this.panelController.postError('Failed to start walkthrough. Check output for details.');
      this.panelController.postLoading(false);
    }
  }

  /**
   * Stop the current walkthrough
   */
  stopWalkthrough(): void {
    Logger.info('Stopping walkthrough');

    this.editorDecorations.clearAll();
    this.stateManager.reset();
    this.panelController.hide();

    void vscode.commands.executeCommand('setContext', 'codewalk.walkthroughActive', false);
  }

  /**
   * Navigate to next step
   */
  async nextStep(): Promise<void> {
    const step = this.stateManager.nextStep();
    if (step) {
      await this.ensureStepExplanation(step);
    }
  }

  /**
   * Navigate to previous step
   */
  async previousStep(): Promise<void> {
    const step = this.stateManager.previousStep();
    if (step) {
      await this.ensureStepExplanation(step);
    }
  }

  /**
   * Navigate to specific step
   */
  async goToStep(index: number): Promise<void> {
    const step = this.stateManager.goToStep(index);
    if (step) {
      await this.ensureStepExplanation(step);
    }
  }

  /**
   * Handle question from user
   */
  async askQuestion(question: string): Promise<void> {
    const state = this.stateManager.getState();
    if (!state || !this.aiClient) {return;}

    Logger.debug(`User question: ${question}`);

    // Add user message to conversation
    this.stateManager.addConversationTurn('user', question);

    try {
      this.panelController.postLoading(true, 'Thinking...');

      const currentStep = this.stateManager.getCurrentStep();
      if (!currentStep) {return;}

      // Build context for Q&A
      const context = this.contextBuilder.buildExplanationContext(
        currentStep,
        state.originalCode,
        state.language,
        state.fileName,
        state.conversationHistory
      );

      // Get AI response
      const response = await this.aiClient.answerQuestion(question, context);

      // Add AI response to conversation
      this.stateManager.addConversationTurn('assistant', response.explanation);

      this.panelController.postLoading(false);
    } catch (error) {
      Logger.error('Failed to answer question', error as Error);
      this.stateManager.addConversationTurn(
        'assistant',
        'Sorry, I encountered an error processing your question. Please try again.'
      );
      this.panelController.postLoading(false);
    }
  }

  /**
   * Check if walkthrough is active
   */
  isActive(): boolean {
    return this.stateManager.isActive();
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    for (const d of this.disposables) {
      d.dispose();
    }
    this.editorDecorations.clearAll();
  }

  /**
   * Generate explanation for a step if not already present
   */
  private async ensureStepExplanation(step: WalkthroughStep): Promise<void> {
    if (step.explanation || !this.aiClient) {return;}
    await this.generateStepExplanation(step);
  }

  /**
   * Generate AI explanation for a step
   */
  private async generateStepExplanation(step: WalkthroughStep): Promise<void> {
    const state = this.stateManager.getState();
    if (!state || !this.aiClient) {return;}

    try {
      this.panelController.postLoading(true, 'Generating explanation...');

      const context = this.contextBuilder.buildExplanationContext(
        step,
        state.originalCode,
        state.language,
        state.fileName,
        state.conversationHistory
      );

      const response = await this.aiClient.generateExplanation(context);

      this.stateManager.updateStepExplanation(step.id, response.explanation);
      this.panelController.postStepExplanation(step.id, response.explanation);
      this.panelController.postLoading(false);
    } catch (error) {
      Logger.error(`Failed to generate explanation for step ${step.id}`, error as Error);
      this.panelController.postLoading(false);
    }
  }

  /**
   * Highlight current step in editor
   */
  private highlightCurrentStep(): void {
    const state = this.stateManager.getState();
    if (!state) {return;}

    const currentStep = state.steps[state.currentStepIndex];
    if (!currentStep) {return;}

    // Find the editor for this file
    const editor = vscode.window.visibleTextEditors.find(
      (e) => e.document.uri.fsPath === state.sourceFile
    );

    if (editor) {
      this.editorDecorations.highlightStep(editor, currentStep, state.steps);
      
      // Scroll to step
      const range = new vscode.Range(
        currentStep.startLine - 1,
        0,
        currentStep.endLine - 1,
        0
      );
      editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
    }
  }

  /**
   * Handle messages from webview panel
   */
  private handlePanelMessage(message: unknown): void {
    const msg = message as { type: string; [key: string]: unknown };

    switch (msg.type) {
      case 'goToStep':
        void this.goToStep(msg.index as number);
        break;
      case 'nextStep':
        void this.nextStep();
        break;
      case 'previousStep':
        void this.previousStep();
        break;
      case 'askQuestion':
        void this.askQuestion(msg.question as string);
        break;
      case 'stopWalkthrough':
        this.stopWalkthrough();
        break;
      case 'goToCode':
        this.goToCodeLocation(msg.startLine as number, msg.endLine as number);
        break;
    }
  }

  /**
   * Navigate editor to specific code location
   */
  private goToCodeLocation(startLine: number, endLine: number): void {
    const state = this.stateManager.getState();
    if (!state) {return;}

    const editor = vscode.window.visibleTextEditors.find(
      (e) => e.document.uri.fsPath === state.sourceFile
    );

    if (editor) {
      const range = new vscode.Range(startLine - 1, 0, endLine - 1, 0);
      editor.selection = new vscode.Selection(range.start, range.end);
      editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
    }
  }
}
