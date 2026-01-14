/**
 * Webview Content
 * 
 * HTML content for the walkthrough panel.
 */

import * as vscode from 'vscode';

export function getWebviewContent(
  webview: vscode.Webview,
  extensionUri: vscode.Uri
): string {
  // Get nonce for content security
  const nonce = getNonce();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">
  <title>CodeWalk</title>
  <style>
    :root {
      --vscode-font-family: var(--vscode-editor-font-family, 'Consolas', monospace);
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
      padding: 16px;
      line-height: 1.5;
    }
    
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      gap: 16px;
    }
    
    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid var(--vscode-progressBar-background);
      border-top-color: var(--vscode-button-background);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--vscode-panel-border);
    }
    
    .header h2 {
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .step-counter {
      font-size: 12px;
      color: var(--vscode-descriptionForeground);
    }
    
    .step-list {
      margin-bottom: 16px;
    }
    
    .step-list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: 8px;
      background: var(--vscode-sideBar-background);
      border-radius: 4px;
      margin-bottom: 8px;
    }
    
    .step-list-header:hover {
      background: var(--vscode-list-hoverBackground);
    }
    
    .step-items {
      max-height: 200px;
      overflow-y: auto;
    }
    
    .step-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px;
      cursor: pointer;
      border-radius: 4px;
      font-size: 12px;
    }
    
    .step-item:hover {
      background: var(--vscode-list-hoverBackground);
    }
    
    .step-item.current {
      background: var(--vscode-list-activeSelectionBackground);
      color: var(--vscode-list-activeSelectionForeground);
    }
    
    .step-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--vscode-descriptionForeground);
    }
    
    .step-item.current .step-indicator {
      background: var(--vscode-button-background);
    }
    
    .step-item.critical .step-indicator {
      background: var(--vscode-charts-red);
    }
    
    .code-block {
      background: var(--vscode-textCodeBlock-background);
      border-radius: 4px;
      margin-bottom: 16px;
      overflow: hidden;
    }
    
    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: var(--vscode-sideBar-background);
      font-size: 11px;
    }
    
    .code-header button {
      background: transparent;
      border: none;
      color: var(--vscode-button-foreground);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
    }
    
    .code-header button:hover {
      background: var(--vscode-button-hoverBackground);
    }
    
    .code-content {
      padding: 12px;
      overflow-x: auto;
      font-family: var(--vscode-editor-font-family);
      font-size: var(--vscode-editor-font-size);
      white-space: pre;
    }
    
    .explanation {
      margin-bottom: 16px;
      padding: 12px;
      background: var(--vscode-sideBar-background);
      border-radius: 4px;
      font-size: 13px;
    }
    
    .explanation p {
      margin-bottom: 8px;
    }
    
    .explanation p:last-child {
      margin-bottom: 0;
    }
    
    .navigation {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }
    
    .nav-btn {
      flex: 1;
      padding: 8px 16px;
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }
    
    .nav-btn:hover {
      background: var(--vscode-button-hoverBackground);
    }
    
    .nav-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .conversation {
      border-top: 1px solid var(--vscode-panel-border);
      padding-top: 16px;
    }
    
    .conversation h3 {
      font-size: 12px;
      margin-bottom: 12px;
      color: var(--vscode-descriptionForeground);
    }
    
    .messages {
      max-height: 200px;
      overflow-y: auto;
      margin-bottom: 12px;
    }
    
    .message {
      padding: 8px 12px;
      border-radius: 4px;
      margin-bottom: 8px;
      font-size: 13px;
    }
    
    .message.user {
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      margin-left: 20%;
    }
    
    .message.assistant {
      background: var(--vscode-sideBar-background);
      margin-right: 20%;
    }
    
    .input-area {
      display: flex;
      gap: 8px;
    }
    
    .input-area input {
      flex: 1;
      padding: 8px 12px;
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      border: 1px solid var(--vscode-input-border);
      border-radius: 4px;
      font-size: 13px;
    }
    
    .input-area input:focus {
      outline: none;
      border-color: var(--vscode-focusBorder);
    }
    
    .input-area button {
      padding: 8px 16px;
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .error {
      padding: 12px;
      background: var(--vscode-inputValidation-errorBackground);
      border: 1px solid var(--vscode-inputValidation-errorBorder);
      border-radius: 4px;
      color: var(--vscode-errorForeground);
      margin-bottom: 16px;
    }
    
    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: var(--vscode-descriptionForeground);
    }
    
    .empty-state h3 {
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <div id="app">
    <div class="empty-state">
      <h3>Welcome to CodeWalk</h3>
      <p>Select code in the editor and press <kbd>Ctrl+Shift+W</kbd> to start a walkthrough.</p>
    </div>
  </div>
  
  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
    
    let state = null;
    let isLoading = false;
    let loadingMessage = '';
    let error = null;
    
    // Handle messages from extension
    window.addEventListener('message', event => {
      const message = event.data;
      
      switch (message.type) {
        case 'stateUpdate':
          state = message.state;
          render();
          break;
        case 'stepExplanation':
          if (state) {
            const step = state.steps.find(s => s.id === message.stepId);
            if (step) {
              step.explanation = message.explanation;
              render();
            }
          }
          break;
        case 'conversationUpdate':
          if (state) {
            state.conversationHistory = message.history;
            render();
          }
          break;
        case 'loading':
          isLoading = message.isLoading;
          loadingMessage = message.message || 'Loading...';
          render();
          break;
        case 'error':
          error = message.message;
          render();
          break;
      }
    });
    
    // Send message to extension
    function sendMessage(message) {
      vscode.postMessage(message);
    }
    
    // Render the UI
    function render() {
      const app = document.getElementById('app');
      
      if (isLoading) {
        app.innerHTML = \`
          <div class="loading">
            <div class="spinner"></div>
            <div>\${loadingMessage}</div>
          </div>
        \`;
        return;
      }
      
      if (error) {
        app.innerHTML = \`
          <div class="error">\${error}</div>
          <button class="nav-btn" onclick="error = null; render();">Dismiss</button>
        \`;
        return;
      }
      
      if (!state || state.steps.length === 0) {
        app.innerHTML = \`
          <div class="empty-state">
            <h3>Welcome to CodeWalk</h3>
            <p>Select code in the editor and press <kbd>Ctrl+Shift+W</kbd> to start a walkthrough.</p>
          </div>
        \`;
        return;
      }
      
      const currentStep = state.steps[state.currentStepIndex];
      const isFirst = state.currentStepIndex === 0;
      const isLast = state.currentStepIndex === state.steps.length - 1;
      
      app.innerHTML = \`
        <div class="header">
          <h2>📚 \${state.fileName}</h2>
          <span class="step-counter">Step \${state.currentStepIndex + 1} of \${state.steps.length}</span>
        </div>
        
        <div class="step-list">
          <div class="step-list-header">
            <span>Steps</span>
            <span>▼</span>
          </div>
          <div class="step-items">
            \${state.steps.map((step, i) => \`
              <div class="step-item \${i === state.currentStepIndex ? 'current' : ''} \${step.stepType}" 
                   onclick="goToStep(\${i})">
                <span class="step-indicator"></span>
                <span>\${i + 1}. \${step.title}</span>
              </div>
            \`).join('')}
          </div>
        </div>
        
        <div class="code-block">
          <div class="code-header">
            <span>📍 Lines \${currentStep.startLine}-\${currentStep.endLine}</span>
            <div>
              <button onclick="copyCode()">Copy</button>
              <button onclick="goToCode()">Go to</button>
            </div>
          </div>
          <div class="code-content">\${escapeHtml(currentStep.codeSnippet)}</div>
        </div>
        
        <div class="explanation">
          \${currentStep.explanation 
            ? formatExplanation(currentStep.explanation)
            : '<em>Generating explanation...</em>'}
        </div>
        
        <div class="navigation">
          <button class="nav-btn" onclick="previousStep()" \${isFirst ? 'disabled' : ''}>
            ← Previous
          </button>
          <button class="nav-btn" onclick="nextStep()" \${isLast ? 'disabled' : ''}>
            Next →
          </button>
        </div>
        
        <div class="conversation">
          <h3>💬 Ask a Question</h3>
          <div class="messages">
            \${state.conversationHistory.map(turn => \`
              <div class="message \${turn.role}">
                \${escapeHtml(turn.content)}
              </div>
            \`).join('')}
          </div>
          <div class="input-area">
            <input type="text" 
                   id="questionInput" 
                   placeholder="Ask about this code..."
                   onkeydown="if(event.key === 'Enter') askQuestion()">
            <button onclick="askQuestion()">Send</button>
          </div>
        </div>
      \`;
    }
    
    function goToStep(index) {
      sendMessage({ type: 'goToStep', index });
    }
    
    function nextStep() {
      sendMessage({ type: 'nextStep' });
    }
    
    function previousStep() {
      sendMessage({ type: 'previousStep' });
    }
    
    function askQuestion() {
      const input = document.getElementById('questionInput');
      const question = input.value.trim();
      if (question) {
        sendMessage({ type: 'askQuestion', question });
        input.value = '';
      }
    }
    
    function copyCode() {
      if (state) {
        const currentStep = state.steps[state.currentStepIndex];
        navigator.clipboard.writeText(currentStep.codeSnippet);
      }
    }
    
    function goToCode() {
      if (state) {
        const currentStep = state.steps[state.currentStepIndex];
        sendMessage({ 
          type: 'goToCode', 
          startLine: currentStep.startLine, 
          endLine: currentStep.endLine 
        });
      }
    }
    
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
    
    function formatExplanation(text) {
      // Simple markdown-like formatting
      return text
        .split('\\n\\n')
        .map(p => '<p>' + escapeHtml(p) + '</p>')
        .join('');
    }
    
    // Initial render
    render();
    
    // Notify extension that webview is ready
    sendMessage({ type: 'ready' });
  </script>
</body>
</html>`;
}

function getNonce(): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
