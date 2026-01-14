/**
 * CodeWalk Type Definitions
 * 
 * Core types and interfaces used throughout the extension.
 */

// ============================================================================
// Code Selection Types
// ============================================================================

export interface SelectionRange {
  startLine: number;
  endLine: number;
  startColumn: number;
  endColumn: number;
}

export interface CodeSelection {
  filePath: string;
  fileName: string;
  range: SelectionRange;
  content: string;
  language: string;
}

// ============================================================================
// Walkthrough Types
// ============================================================================

export type WalkthroughStatus = 
  | 'initializing'
  | 'analyzing'
  | 'generating'
  | 'ready'
  | 'error';

export type WalkthroughMode = 'static' | 'debug';

export interface WalkthroughStep {
  id: string;
  index: number;
  startLine: number;
  endLine: number;
  codeSnippet: string;
  title: string;
  explanation?: string;
  stepType: 'critical' | 'supporting' | 'detail';
  variables?: VariableInfo[];
}

export interface WalkthroughState {
  id: string;
  status: WalkthroughStatus;
  mode: WalkthroughMode;
  sourceFile: string;
  fileName: string;
  language: string;
  selectionRange: SelectionRange;
  originalCode: string;
  steps: WalkthroughStep[];
  currentStepIndex: number;
  conversationHistory: ConversationTurn[];
  error?: string;
  createdAt: Date;
}

// ============================================================================
// Conversation Types
// ============================================================================

export type ConversationRole = 'user' | 'assistant';

export interface ConversationTurn {
  id: string;
  role: ConversationRole;
  content: string;
  stepId?: string;
  timestamp: Date;
}

// ============================================================================
// Debug Types (Phase 2)
// ============================================================================

export interface VariableInfo {
  name: string;
  value: string;
  type: string;
  scope: 'local' | 'parameter' | 'member' | 'global';
  isExpandable: boolean;
  children?: VariableInfo[];
  evaluateError?: string;
}

export interface StackFrame {
  id: number;
  name: string;
  filePath: string;
  line: number;
  column: number;
}

// ============================================================================
// AI Types
// ============================================================================

export interface StepGenerationContext {
  code: string;
  language: string;
  fileName: string;
}

export interface StepGenerationResponse {
  steps: GeneratedStep[];
  metadata: {
    modelUsed: string;
    tokensUsed: number;
    generationTime: number;
  };
}

export interface GeneratedStep {
  startLine: number;
  endLine: number;
  codeSnippet: string;
  title: string;
  stepType: 'critical' | 'supporting' | 'detail';
}

export interface ExplanationContext {
  step: WalkthroughStep;
  fullCode: string;
  language: string;
  fileName: string;
  conversationHistory: ConversationTurn[];
  variables?: VariableInfo[];
  surroundingCode?: string;
}

export interface ExplanationResponse {
  explanation: string;
  intent?: string;
  keyInsights?: string[];
  suggestedQuestions?: string[];
  metadata: {
    modelUsed: string;
    tokensUsed: number;
  };
}

// ============================================================================
// UI Message Types
// ============================================================================

export type ExtensionToWebviewMessage =
  | { type: 'stateUpdate'; state: WalkthroughState }
  | { type: 'stepExplanation'; stepId: string; explanation: string }
  | { type: 'conversationUpdate'; history: ConversationTurn[] }
  | { type: 'error'; message: string }
  | { type: 'loading'; isLoading: boolean; message?: string };

export type WebviewToExtensionMessage =
  | { type: 'ready' }
  | { type: 'goToStep'; index: number }
  | { type: 'nextStep' }
  | { type: 'previousStep' }
  | { type: 'askQuestion'; question: string }
  | { type: 'stopWalkthrough' }
  | { type: 'copyCode'; code: string }
  | { type: 'goToCode'; startLine: number; endLine: number };

// ============================================================================
// Event Types
// ============================================================================

export type StateEvent =
  | 'stateCreated'
  | 'stateChanged'
  | 'stepChanged'
  | 'conversationUpdated'
  | 'walkthroughEnded'
  | 'error';
