/**
 * State Manager
 * 
 * Centralized state management for walkthrough sessions.
 * Uses EventEmitter pattern for state change notifications.
 */

import { EventEmitter } from 'events';
import {
  WalkthroughState,
  WalkthroughStep,
  WalkthroughStatus,
  WalkthroughMode,
  ConversationTurn,
  CodeSelection,
  StateEvent,
} from '../types';
import { generateId } from '../utils/helpers';

export class StateManager extends EventEmitter {
  private state: WalkthroughState | null = null;

  /**
   * Create a new walkthrough session
   */
  createWalkthrough(selection: CodeSelection): WalkthroughState {
    this.state = {
      id: generateId(),
      status: 'initializing',
      mode: 'static',
      sourceFile: selection.filePath,
      fileName: selection.fileName,
      language: selection.language,
      selectionRange: selection.range,
      originalCode: selection.content,
      steps: [],
      currentStepIndex: 0,
      conversationHistory: [],
      createdAt: new Date(),
    };

    this.emit('stateCreated', this.state);
    return this.state;
  }

  /**
   * Get current state (immutable copy)
   */
  getState(): WalkthroughState | null {
    return this.state ? { ...this.state } : null;
  }

  /**
   * Check if a walkthrough is active
   */
  isActive(): boolean {
    return this.state !== null && this.state.status !== 'error';
  }

  /**
   * Update walkthrough status
   */
  setStatus(status: WalkthroughStatus, error?: string): void {
    if (!this.state) return;

    this.state = {
      ...this.state,
      status,
      error,
    };

    this.emit('stateChanged', this.state);

    if (status === 'error') {
      this.emit('error', error);
    }
  }

  /**
   * Set the generated steps
   */
  setSteps(steps: WalkthroughStep[]): void {
    if (!this.state) return;

    this.state = {
      ...this.state,
      steps,
      currentStepIndex: 0,
      status: 'ready',
    };

    this.emit('stateChanged', this.state);
  }

  /**
   * Update a step's explanation
   */
  updateStepExplanation(stepId: string, explanation: string): void {
    if (!this.state) return;

    const stepIndex = this.state.steps.findIndex((s) => s.id === stepId);
    if (stepIndex === -1) return;

    const updatedSteps = [...this.state.steps];
    updatedSteps[stepIndex] = {
      ...updatedSteps[stepIndex],
      explanation,
    };

    this.state = {
      ...this.state,
      steps: updatedSteps,
    };

    this.emit('stateChanged', this.state);
  }

  /**
   * Navigate to next step
   */
  nextStep(): WalkthroughStep | null {
    if (!this.state || this.state.steps.length === 0) return null;

    const newIndex = Math.min(
      this.state.currentStepIndex + 1,
      this.state.steps.length - 1
    );

    if (newIndex !== this.state.currentStepIndex) {
      this.state = {
        ...this.state,
        currentStepIndex: newIndex,
      };
      this.emit('stepChanged', this.state.steps[newIndex]);
    }

    return this.state.steps[newIndex];
  }

  /**
   * Navigate to previous step
   */
  previousStep(): WalkthroughStep | null {
    if (!this.state || this.state.steps.length === 0) return null;

    const newIndex = Math.max(this.state.currentStepIndex - 1, 0);

    if (newIndex !== this.state.currentStepIndex) {
      this.state = {
        ...this.state,
        currentStepIndex: newIndex,
      };
      this.emit('stepChanged', this.state.steps[newIndex]);
    }

    return this.state.steps[newIndex];
  }

  /**
   * Navigate to specific step
   */
  goToStep(index: number): WalkthroughStep | null {
    if (!this.state || this.state.steps.length === 0) return null;

    const clampedIndex = Math.max(0, Math.min(index, this.state.steps.length - 1));

    if (clampedIndex !== this.state.currentStepIndex) {
      this.state = {
        ...this.state,
        currentStepIndex: clampedIndex,
      };
      this.emit('stepChanged', this.state.steps[clampedIndex]);
    }

    return this.state.steps[clampedIndex];
  }

  /**
   * Get current step
   */
  getCurrentStep(): WalkthroughStep | null {
    if (!this.state || this.state.steps.length === 0) return null;
    return this.state.steps[this.state.currentStepIndex];
  }

  /**
   * Add a conversation turn
   */
  addConversationTurn(role: 'user' | 'assistant', content: string): void {
    if (!this.state) return;

    const currentStep = this.getCurrentStep();
    const turn: ConversationTurn = {
      id: generateId(),
      role,
      content,
      stepId: currentStep?.id,
      timestamp: new Date(),
    };

    this.state = {
      ...this.state,
      conversationHistory: [...this.state.conversationHistory, turn],
    };

    this.emit('conversationUpdated', this.state.conversationHistory);
  }

  /**
   * Set walkthrough mode (static/debug)
   */
  setMode(mode: WalkthroughMode): void {
    if (!this.state) return;

    this.state = {
      ...this.state,
      mode,
    };

    this.emit('stateChanged', this.state);
  }

  /**
   * Update step variables (debug mode)
   */
  updateStepVariables(stepId: string, variables: WalkthroughStep['variables']): void {
    if (!this.state) return;

    const stepIndex = this.state.steps.findIndex((s) => s.id === stepId);
    if (stepIndex === -1) return;

    const updatedSteps = [...this.state.steps];
    updatedSteps[stepIndex] = {
      ...updatedSteps[stepIndex],
      variables,
    };

    this.state = {
      ...this.state,
      steps: updatedSteps,
    };

    this.emit('stateChanged', this.state);
  }

  /**
   * Reset state (end walkthrough)
   */
  reset(): void {
    if (this.state) {
      this.emit('walkthroughEnded', this.state.id);
    }
    this.state = null;
  }

  /**
   * Subscribe to state events with type safety
   */
  onStateEvent(event: StateEvent, listener: (...args: unknown[]) => void): this {
    return this.on(event, listener);
  }
}
