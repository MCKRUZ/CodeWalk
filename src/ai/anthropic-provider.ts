/**
 * Anthropic Provider
 * 
 * Implementation of IAIClient using Anthropic's Claude API.
 */

import Anthropic from '@anthropic-ai/sdk';
import { IAIClient, TokenUsage } from './ai-client';
import {
  ExplanationContext,
  ExplanationResponse,
} from '../types';
import { EXPLANATION_PROMPT, QA_PROMPT } from './prompt-templates';
import { Logger } from '../utils/logger';

export class AnthropicProvider implements IAIClient {
  private client: Anthropic;
  private tokenUsage: TokenUsage = {
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
  };

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  /**
   * Generate explanation for a code step
   */
  async generateExplanation(context: ExplanationContext): Promise<ExplanationResponse> {
    const prompt = this.buildExplanationPrompt(context);

    try {
      const response = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      });

      // Track token usage
      this.tokenUsage.inputTokens += response.usage.input_tokens;
      this.tokenUsage.outputTokens += response.usage.output_tokens;
      this.tokenUsage.totalTokens += response.usage.input_tokens + response.usage.output_tokens;

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type');
      }

      return {
        explanation: content.text,
        metadata: {
          modelUsed: response.model,
          tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
        },
      };
    } catch (error) {
      Logger.error('Anthropic API error', error as Error);
      throw error;
    }
  }

  /**
   * Answer a follow-up question
   */
  async answerQuestion(
    question: string,
    context: ExplanationContext
  ): Promise<ExplanationResponse> {
    const prompt = this.buildQAPrompt(question, context);

    try {
      const response = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      });

      this.tokenUsage.inputTokens += response.usage.input_tokens;
      this.tokenUsage.outputTokens += response.usage.output_tokens;
      this.tokenUsage.totalTokens += response.usage.input_tokens + response.usage.output_tokens;

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type');
      }

      return {
        explanation: content.text,
        metadata: {
          modelUsed: response.model,
          tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
        },
      };
    } catch (error) {
      Logger.error('Anthropic API error during Q&A', error as Error);
      throw error;
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      // Simple API call to verify key works
      await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Hello' }],
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get token usage
   */
  getTokenUsage(): TokenUsage {
    return { ...this.tokenUsage };
  }

  /**
   * Build explanation prompt
   */
  private buildExplanationPrompt(context: ExplanationContext): string {
    let prompt = EXPLANATION_PROMPT;

    prompt = prompt.replace('{{language}}', context.language);
    prompt = prompt.replace('{{fileName}}', context.fileName);
    prompt = prompt.replace('{{stepCode}}', context.step.codeSnippet);
    prompt = prompt.replace('{{stepTitle}}', context.step.title);
    prompt = prompt.replace('{{fullCode}}', context.fullCode);

    // Add variables if present (debug mode)
    if (context.variables && context.variables.length > 0) {
      const varsText = context.variables
        .map((v) => `- ${v.name} (${v.type}): ${v.value}`)
        .join('\n');
      prompt = prompt.replace('{{variables}}', varsText);
    } else {
      prompt = prompt.replace('{{variables}}', 'No runtime variables available');
    }

    return prompt;
  }

  /**
   * Build Q&A prompt
   */
  private buildQAPrompt(question: string, context: ExplanationContext): string {
    let prompt = QA_PROMPT;

    prompt = prompt.replace('{{language}}', context.language);
    prompt = prompt.replace('{{fileName}}', context.fileName);
    prompt = prompt.replace('{{stepCode}}', context.step.codeSnippet);
    prompt = prompt.replace('{{stepTitle}}', context.step.title);
    prompt = prompt.replace('{{question}}', question);

    // Add conversation history
    if (context.conversationHistory.length > 0) {
      const historyText = context.conversationHistory
        .slice(-6) // Last 6 turns
        .map((turn) => `${turn.role === 'user' ? 'User' : 'Assistant'}: ${turn.content}`)
        .join('\n\n');
      prompt = prompt.replace('{{conversationHistory}}', historyText);
    } else {
      prompt = prompt.replace('{{conversationHistory}}', 'No previous conversation');
    }

    return prompt;
  }
}
