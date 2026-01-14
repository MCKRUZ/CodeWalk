/**
 * Context Builder
 * 
 * Builds rich context for AI prompts while respecting token limits.
 */

import {
  WalkthroughStep,
  ConversationTurn,
  VariableInfo,
  ExplanationContext,
} from '../types';

export class ContextBuilder {
  private readonly maxTokens: number;
  private readonly reservedForResponse: number;

  constructor(maxTokens: number = 8000, reservedForResponse: number = 1500) {
    this.maxTokens = maxTokens;
    this.reservedForResponse = reservedForResponse;
  }

  /**
   * Build context for explanation generation
   */
  buildExplanationContext(
    step: WalkthroughStep,
    fullCode: string,
    language: string,
    fileName: string,
    conversationHistory: ConversationTurn[],
    variables?: VariableInfo[]
  ): ExplanationContext {
    const budget = this.maxTokens - this.reservedForResponse;
    let usedTokens = 0;

    // Priority 1: Current step code (always include)
    usedTokens += this.estimateTokens(step.codeSnippet);

    // Priority 2: Full code context (truncate if needed)
    let contextCode = fullCode;
    const fullCodeTokens = this.estimateTokens(fullCode);
    
    if (usedTokens + fullCodeTokens > budget * 0.6) {
      // Truncate full code, keeping area around current step
      contextCode = this.truncateAroundStep(fullCode, step, budget * 0.4);
    }
    usedTokens += this.estimateTokens(contextCode);

    // Priority 3: Variables (if in debug mode)
    const includedVariables = variables?.slice(0, 10); // Max 10 variables
    if (includedVariables) {
      usedTokens += this.estimateTokens(JSON.stringify(includedVariables));
    }

    // Priority 4: Recent conversation (last 4 turns)
    const recentHistory = this.trimConversationHistory(
      conversationHistory,
      budget - usedTokens
    );

    return {
      step,
      fullCode: contextCode,
      language,
      fileName,
      conversationHistory: recentHistory,
      variables: includedVariables,
    };
  }

  /**
   * Estimate token count (rough approximation)
   */
  private estimateTokens(text: string): number {
    // Rough estimate: ~4 characters per token
    return Math.ceil(text.length / 4);
  }

  /**
   * Truncate code keeping area around current step
   */
  private truncateAroundStep(
    code: string,
    step: WalkthroughStep,
    maxTokens: number
  ): string {
    const lines = code.split('\n');
    const stepStart = step.startLine - 1;
    const stepEnd = step.endLine - 1;

    // Calculate how many lines we can include
    const maxLines = Math.floor(maxTokens / 10); // Rough estimate
    const contextLines = Math.floor((maxLines - (stepEnd - stepStart)) / 2);

    const startLine = Math.max(0, stepStart - contextLines);
    const endLine = Math.min(lines.length - 1, stepEnd + contextLines);

    const truncatedLines = lines.slice(startLine, endLine + 1);

    let result = '';
    if (startLine > 0) {
      result += '// ... (code above truncated)\n\n';
    }
    result += truncatedLines.join('\n');
    if (endLine < lines.length - 1) {
      result += '\n\n// ... (code below truncated)';
    }

    return result;
  }

  /**
   * Trim conversation history to fit budget
   */
  private trimConversationHistory(
    history: ConversationTurn[],
    maxTokens: number
  ): ConversationTurn[] {
    if (history.length === 0) return [];

    const result: ConversationTurn[] = [];
    let tokens = 0;

    // Take most recent turns first
    for (let i = history.length - 1; i >= 0; i--) {
      const turn = history[i];
      const turnTokens = this.estimateTokens(turn.content);

      if (tokens + turnTokens > maxTokens) {
        break;
      }

      result.unshift(turn);
      tokens += turnTokens;
    }

    return result;
  }
}
