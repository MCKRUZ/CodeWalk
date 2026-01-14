/**
 * CodeWalk Extension Entry Point
 * 
 * This is the main entry point for the CodeWalk VS Code extension.
 * It handles activation, command registration, and dependency injection.
 */

import * as vscode from 'vscode';
import { StateManager } from './core/state-manager';
import { WalkthroughController } from './core/walkthrough-controller';
import { PanelController } from './ui/panel-controller';
import { EditorDecorations } from './ui/editor-decorations';
import { Logger } from './utils/logger';
import { SecretStorage } from './utils/secrets';
import { createAIClient } from './ai/ai-client-factory';

let walkthroughController: WalkthroughController | undefined;

/**
 * Called when the extension is activated.
 * Activation happens on first command execution or when activation events trigger.
 */
export async function activate(context: vscode.ExtensionContext): Promise<void> {
  Logger.init();
  Logger.info('CodeWalk extension activating...');

  try {
    // Initialize core services
    const secretStorage = new SecretStorage(context.secrets);
    const stateManager = new StateManager();
    const panelController = new PanelController(context.extensionUri);
    const editorDecorations = new EditorDecorations();

    // Create AI client (may be undefined if no API key)
    const aiClient = await createAIClient(secretStorage);

    // Create walkthrough controller
    walkthroughController = new WalkthroughController(
      stateManager,
      aiClient,
      panelController,
      editorDecorations
    );

    // Register commands
    registerCommands(context, walkthroughController, secretStorage);

    // Set up event listeners
    setupEventListeners(context, stateManager);

    Logger.info('CodeWalk extension activated successfully');
  } catch (error) {
    Logger.error('Failed to activate CodeWalk extension', error as Error);
    vscode.window.showErrorMessage('CodeWalk failed to activate. Check output for details.');
  }
}

/**
 * Register all extension commands
 */
function registerCommands(
  context: vscode.ExtensionContext,
  controller: WalkthroughController,
  secretStorage: SecretStorage
): void {
  // Start walkthrough from selection
  context.subscriptions.push(
    vscode.commands.registerCommand('codewalk.startWalkthrough', async () => {
      const editor = vscode.window.activeTextEditor;
      
      if (!editor || editor.selection.isEmpty) {
        vscode.window.showWarningMessage('Please select code to walk through');
        return;
      }

      const selection = {
        filePath: editor.document.uri.fsPath,
        fileName: editor.document.fileName.split(/[/\\]/).pop() || 'unknown',
        range: {
          startLine: editor.selection.start.line + 1,
          endLine: editor.selection.end.line + 1,
          startColumn: editor.selection.start.character,
          endColumn: editor.selection.end.character,
        },
        content: editor.document.getText(editor.selection),
        language: editor.document.languageId,
      };

      await controller.startWalkthrough(selection);
    })
  );

  // Stop walkthrough
  context.subscriptions.push(
    vscode.commands.registerCommand('codewalk.stopWalkthrough', () => {
      controller.stopWalkthrough();
    })
  );

  // Navigate steps
  context.subscriptions.push(
    vscode.commands.registerCommand('codewalk.nextStep', () => {
      controller.nextStep();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codewalk.previousStep', () => {
      controller.previousStep();
    })
  );

  // Set API key
  context.subscriptions.push(
    vscode.commands.registerCommand('codewalk.setApiKey', async () => {
      const provider = await vscode.window.showQuickPick(
        ['Anthropic', 'Azure OpenAI'],
        { placeHolder: 'Select AI provider' }
      );

      if (!provider) {
        return;
      }

      const key = await vscode.window.showInputBox({
        prompt: `Enter your ${provider} API key`,
        password: true,
        ignoreFocusOut: true,
      });

      if (key) {
        if (provider === 'Anthropic') {
          await secretStorage.setAnthropicKey(key);
        } else {
          await secretStorage.setAzureOpenAIKey(key);
        }
        vscode.window.showInformationMessage(`${provider} API key saved successfully`);
      }
    })
  );
}

/**
 * Set up event listeners for editor and debug events
 */
function setupEventListeners(
  context: vscode.ExtensionContext,
  stateManager: StateManager
): void {
  // Listen for active editor changes
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor && stateManager.isActive()) {
        // Could update decorations or sync state here
      }
    })
  );

  // Listen for debug session changes (Phase 2)
  context.subscriptions.push(
    vscode.debug.onDidStartDebugSession((session) => {
      Logger.debug(`Debug session started: ${session.name}`);
      // Phase 2: Auto-enable debug mode
    })
  );

  context.subscriptions.push(
    vscode.debug.onDidTerminateDebugSession((session) => {
      Logger.debug(`Debug session ended: ${session.name}`);
      // Phase 2: Exit debug mode
    })
  );
}

/**
 * Called when the extension is deactivated
 */
export function deactivate(): void {
  Logger.info('CodeWalk extension deactivating...');
  walkthroughController?.dispose();
}
