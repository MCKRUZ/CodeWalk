/**
 * AI Client Interface
 * 
 * Abstract interface for AI providers.
 * Allows swapping between Anthropic, Azure OpenAI, etc.
 */

import {
  StepGenerationContext,
  StepGenerationResponse,
  ExplanationContext,
  ExplanationResponse,
} from '../types';

export interface IAIClient {
  /**
   * Generate steps from code (optional - can use local step generator)
   */
  generateSteps?(context: StepGenerationContext): Promise<StepGenerationResponse>;

  /**
   * Generate explanation for a code step
   */
  generateExplanation(context: ExplanationContext): Promise<ExplanationResponse>;

  /**
   * Answer a follow-up question
   */
  answerQuestion(question: string, context: ExplanationContext): Promise<ExplanationResponse>;

  /**
   * Check if the client is properly configured
   */
  healthCheck(): Promise<boolean>;

  /**
   * Get token usage statistics
   */
  getTokenUsage(): TokenUsage;
}

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}
