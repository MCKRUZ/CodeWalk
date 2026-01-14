/**
 * Secret Storage
 * 
 * Secure storage for API keys using VS Code's SecretStorage.
 */

import * as vscode from 'vscode';

const ANTHROPIC_KEY = 'codewalk.anthropicApiKey';
const AZURE_OPENAI_KEY = 'codewalk.azureOpenAIKey';
const AZURE_OPENAI_ENDPOINT = 'codewalk.azureOpenAIEndpoint';

export class SecretStorage {
  constructor(private secretStorage: vscode.SecretStorage) {}

  /**
   * Get Anthropic API key
   */
  async getAnthropicKey(): Promise<string | undefined> {
    return this.secretStorage.get(ANTHROPIC_KEY);
  }

  /**
   * Set Anthropic API key
   */
  async setAnthropicKey(key: string): Promise<void> {
    await this.secretStorage.store(ANTHROPIC_KEY, key);
  }

  /**
   * Delete Anthropic API key
   */
  async deleteAnthropicKey(): Promise<void> {
    await this.secretStorage.delete(ANTHROPIC_KEY);
  }

  /**
   * Get Azure OpenAI API key
   */
  async getAzureOpenAIKey(): Promise<string | undefined> {
    return this.secretStorage.get(AZURE_OPENAI_KEY);
  }

  /**
   * Set Azure OpenAI API key
   */
  async setAzureOpenAIKey(key: string): Promise<void> {
    await this.secretStorage.store(AZURE_OPENAI_KEY, key);
  }

  /**
   * Get Azure OpenAI endpoint
   */
  async getAzureOpenAIEndpoint(): Promise<string | undefined> {
    return this.secretStorage.get(AZURE_OPENAI_ENDPOINT);
  }

  /**
   * Set Azure OpenAI endpoint
   */
  async setAzureOpenAIEndpoint(endpoint: string): Promise<void> {
    await this.secretStorage.store(AZURE_OPENAI_ENDPOINT, endpoint);
  }

  /**
   * Check if any API key is configured
   */
  async hasApiKey(): Promise<boolean> {
    const anthropicKey = await this.getAnthropicKey();
    const azureKey = await this.getAzureOpenAIKey();
    return !!(anthropicKey || azureKey);
  }

  /**
   * Prompt user for API key
   */
  async promptForApiKey(provider: 'anthropic' | 'azure-openai'): Promise<string | undefined> {
    const key = await vscode.window.showInputBox({
      prompt: `Enter your ${provider === 'anthropic' ? 'Anthropic' : 'Azure OpenAI'} API key`,
      password: true,
      ignoreFocusOut: true,
      placeHolder: provider === 'anthropic' ? 'sk-ant-...' : 'Your API key',
    });

    if (key) {
      if (provider === 'anthropic') {
        await this.setAnthropicKey(key);
      } else {
        await this.setAzureOpenAIKey(key);
      }
    }

    return key;
  }
}
