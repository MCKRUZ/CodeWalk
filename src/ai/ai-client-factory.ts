/**
 * AI Client Factory
 * 
 * Creates the appropriate AI client based on configuration.
 */

import * as vscode from 'vscode';
import { IAIClient } from './ai-client';
import { AnthropicProvider } from './anthropic-provider';
import { SecretStorage } from '../utils/secrets';
import { Logger } from '../utils/logger';

/**
 * Create an AI client based on user configuration
 */
export async function createAIClient(
  secretStorage: SecretStorage
): Promise<IAIClient | null> {
  const config = vscode.workspace.getConfiguration('codewalk');
  const provider = config.get<string>('aiProvider', 'anthropic');

  Logger.debug(`Creating AI client for provider: ${provider}`);

  switch (provider) {
    case 'anthropic': {
      const apiKey = await secretStorage.getAnthropicKey();
      if (!apiKey) {
        Logger.warn('No Anthropic API key configured');
        return null;
      }
      return new AnthropicProvider(apiKey);
    }

    case 'azure-openai': {
      const apiKey = await secretStorage.getAzureOpenAIKey();
      if (!apiKey) {
        Logger.warn('No Azure OpenAI API key configured');
        return null;
      }
      // TODO: Implement Azure OpenAI provider
      Logger.warn('Azure OpenAI provider not yet implemented');
      return null;
    }

    default:
      Logger.error(`Unknown AI provider: ${provider}`);
      return null;
  }
}
