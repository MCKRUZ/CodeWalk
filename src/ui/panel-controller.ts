/**
 * Panel Controller
 * 
 * Manages the webview panel for displaying walkthrough UI.
 */

import * as vscode from 'vscode';
import {
  WalkthroughState,
  ExtensionToWebviewMessage,
  WebviewToExtensionMessage,
  ConversationTurn,
} from '../types';
import { getWebviewContent } from './webview-content';

export class PanelController {
  private panel: vscode.WebviewPanel | undefined;
  private messageHandlers: ((message: WebviewToExtensionMessage) => void)[] = [];

  constructor(private extensionUri: vscode.Uri) {}

  /**
   * Show the panel (create if needed)
   */
  show(): void {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.Beside);
      return;
    }

    this.panel = vscode.window.createWebviewPanel(
      'codewalkPanel',
      'CodeWalk',
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.joinPath(this.extensionUri, 'media'),
        ],
      }
    );

    this.panel.webview.html = getWebviewContent(
      this.panel.webview,
      this.extensionUri
    );

    // Handle messages from webview
    this.panel.webview.onDidReceiveMessage((message: WebviewToExtensionMessage) => {
      this.messageHandlers.forEach((handler) => handler(message));
    });

    // Handle panel disposal
    this.panel.onDidDispose(() => {
      this.panel = undefined;
    });
  }

  /**
   * Hide the panel
   */
  hide(): void {
    this.panel?.dispose();
    this.panel = undefined;
  }

  /**
   * Register a message handler
   */
  onMessage(handler: (message: WebviewToExtensionMessage) => void): void {
    this.messageHandlers.push(handler);
  }

  /**
   * Post state update to webview
   */
  postStateUpdate(state: WalkthroughState): void {
    this.postMessage({ type: 'stateUpdate', state });
  }

  /**
   * Post step explanation to webview
   */
  postStepExplanation(stepId: string, explanation: string): void {
    this.postMessage({ type: 'stepExplanation', stepId, explanation });
  }

  /**
   * Post conversation update to webview
   */
  postConversationUpdate(history: ConversationTurn[]): void {
    this.postMessage({ type: 'conversationUpdate', history });
  }

  /**
   * Post error to webview
   */
  postError(message: string): void {
    this.postMessage({ type: 'error', message });
  }

  /**
   * Post loading state to webview
   */
  postLoading(isLoading: boolean, message?: string): void {
    this.postMessage({ type: 'loading', isLoading, message });
  }

  /**
   * Post message to webview
   */
  private postMessage(message: ExtensionToWebviewMessage): void {
    void this.panel?.webview.postMessage(message);
  }
}
