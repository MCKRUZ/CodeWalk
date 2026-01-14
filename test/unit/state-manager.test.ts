/**
 * State Manager Unit Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';

// Mock vscode module
vi.mock('vscode', () => ({
  EventEmitter: class {
    private handlers: Map<string, Function[]> = new Map();
    
    on(event: string, handler: Function) {
      if (!this.handlers.has(event)) {
        this.handlers.set(event, []);
      }
      this.handlers.get(event)!.push(handler);
      return this;
    }
    
    emit(event: string, ...args: unknown[]) {
      const handlers = this.handlers.get(event) || [];
      handlers.forEach(h => h(...args));
    }
  },
}));

// Import after mock
import { StateManager } from '../../src/core/state-manager';
import { CodeSelection } from '../../src/types';

describe('StateManager', () => {
  let stateManager: StateManager;

  const mockSelection: CodeSelection = {
    filePath: '/test/file.ts',
    fileName: 'file.ts',
    range: { startLine: 1, endLine: 10, startColumn: 0, endColumn: 0 },
    content: 'const x = 1;',
    language: 'typescript',
  };

  beforeEach(() => {
    stateManager = new StateManager();
  });

  describe('createWalkthrough', () => {
    it('should create a new walkthrough state', () => {
      const state = stateManager.createWalkthrough(mockSelection);

      expect(state).toBeDefined();
      expect(state.id).toBeDefined();
      expect(state.status).toBe('initializing');
      expect(state.mode).toBe('static');
      expect(state.sourceFile).toBe('/test/file.ts');
      expect(state.language).toBe('typescript');
    });

    it('should emit stateCreated event', () => {
      let emittedState = null;
      stateManager.on('stateCreated', (state: unknown) => {
        emittedState = state;
      });

      stateManager.createWalkthrough(mockSelection);

      expect(emittedState).toBeDefined();
    });
  });

  describe('isActive', () => {
    it('should return false when no walkthrough', () => {
      expect(stateManager.isActive()).toBe(false);
    });

    it('should return true when walkthrough exists', () => {
      stateManager.createWalkthrough(mockSelection);
      expect(stateManager.isActive()).toBe(true);
    });

    it('should return false after reset', () => {
      stateManager.createWalkthrough(mockSelection);
      stateManager.reset();
      expect(stateManager.isActive()).toBe(false);
    });
  });

  describe('setStatus', () => {
    it('should update status', () => {
      stateManager.createWalkthrough(mockSelection);
      stateManager.setStatus('analyzing');

      const state = stateManager.getState();
      expect(state?.status).toBe('analyzing');
    });

    it('should emit error event on error status', () => {
      let errorMsg = null;
      stateManager.on('error', (msg: string) => {
        errorMsg = msg;
      });

      stateManager.createWalkthrough(mockSelection);
      stateManager.setStatus('error', 'Test error');

      expect(errorMsg).toBe('Test error');
    });
  });

  describe('navigation', () => {
    beforeEach(() => {
      stateManager.createWalkthrough(mockSelection);
      stateManager.setSteps([
        { id: 'step-0', index: 0, startLine: 1, endLine: 2, codeSnippet: 'code1', title: 'Step 1', stepType: 'critical' },
        { id: 'step-1', index: 1, startLine: 3, endLine: 4, codeSnippet: 'code2', title: 'Step 2', stepType: 'supporting' },
        { id: 'step-2', index: 2, startLine: 5, endLine: 6, codeSnippet: 'code3', title: 'Step 3', stepType: 'detail' },
      ]);
    });

    it('should navigate to next step', () => {
      const step = stateManager.nextStep();
      expect(step?.id).toBe('step-1');
      expect(stateManager.getState()?.currentStepIndex).toBe(1);
    });

    it('should not go past last step', () => {
      stateManager.nextStep();
      stateManager.nextStep();
      stateManager.nextStep(); // Try to go past

      expect(stateManager.getState()?.currentStepIndex).toBe(2);
    });

    it('should navigate to previous step', () => {
      stateManager.nextStep();
      const step = stateManager.previousStep();
      
      expect(step?.id).toBe('step-0');
      expect(stateManager.getState()?.currentStepIndex).toBe(0);
    });

    it('should not go before first step', () => {
      stateManager.previousStep();
      expect(stateManager.getState()?.currentStepIndex).toBe(0);
    });

    it('should go to specific step', () => {
      const step = stateManager.goToStep(2);
      
      expect(step?.id).toBe('step-2');
      expect(stateManager.getState()?.currentStepIndex).toBe(2);
    });
  });

  describe('conversation', () => {
    it('should add conversation turns', () => {
      stateManager.createWalkthrough(mockSelection);
      
      stateManager.addConversationTurn('user', 'What does this do?');
      stateManager.addConversationTurn('assistant', 'This initializes a variable.');

      const state = stateManager.getState();
      expect(state?.conversationHistory.length).toBe(2);
      expect(state?.conversationHistory[0].role).toBe('user');
      expect(state?.conversationHistory[1].role).toBe('assistant');
    });
  });
});
