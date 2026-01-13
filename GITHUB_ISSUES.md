# CodeWalk GitHub Issues

This file contains all GitHub issues for the CodeWalk project, organized by Epic.
These can be created manually or via GitHub CLI (`gh issue create`).

---

## Labels to Create First

```bash
# Create labels via GitHub CLI
gh label create "epic" --color "3E4B9E" --description "Epic-level tracking issue"
gh label create "story" --color "0E8A16" --description "User story"
gh label create "task" --color "1D76DB" --description "Technical task"
gh label create "phase-1" --color "FBCA04" --description "Phase 1: Static Walkthrough"
gh label create "phase-2" --color "F9A825" --description "Phase 2: Debug Integration"
gh label create "phase-3" --color "E65100" --description "Phase 3: Polish & Beta"
gh label create "priority-p0" --color "B60205" --description "Critical - Must have for MVP"
gh label create "priority-p1" --color "D93F0B" --description "High - Should have for MVP"
gh label create "priority-p2" --color "FBCA04" --description "Medium - Nice to have"
gh label create "frontend" --color "C2E0C6" --description "UI/UX work"
gh label create "backend" --color "BFD4F2" --description "Extension core logic"
gh label create "ai" --color "D4C5F9" --description "AI integration"
gh label create "debug" --color "FEF2C0" --description "Debug integration"
gh label create "infrastructure" --color "E6E6E6" --description "Build, CI/CD, tooling"
gh label create "documentation" --color "0075CA" --description "Documentation"
```

---

# EPIC E-001: Project Setup & Infrastructure

## Issue: [EPIC] Project Setup & Infrastructure

**Labels:** `epic`, `phase-1`, `infrastructure`

### Description

Set up the foundational project structure, build pipeline, and development environment for the CodeWalk VS Code extension.

### Acceptance Criteria
- [ ] VS Code extension scaffold created
- [ ] TypeScript configuration complete
- [ ] Build pipeline working (esbuild)
- [ ] Development workflow documented
- [ ] CI/CD pipeline configured

### Child Stories
- [ ] #2 - Create extension scaffold
- [ ] #3 - Configure build pipeline
- [ ] #4 - Set up development environment
- [ ] #5 - Configure CI/CD

---

## Issue: Create Extension Scaffold

**Labels:** `story`, `phase-1`, `infrastructure`, `priority-p0`

### Description

As a developer, I need a properly structured VS Code extension project so that I can start building features.

### Acceptance Criteria
- [ ] `package.json` with correct VS Code extension configuration
- [ ] TypeScript configuration (`tsconfig.json`)
- [ ] Source directory structure matching spec:
  ```
  src/
  ├── extension.ts
  ├── core/
  ├── analysis/
  ├── debug/
  ├── ai/
  ├── ui/
  └── utils/
  ```
- [ ] Basic extension activates without errors
- [ ] "Hello World" command works to verify setup

### Technical Notes
```json
// package.json engine requirement
{
  "engines": {
    "vscode": "^1.85.0"
  }
}
```

### Definition of Done
- Extension activates in VS Code Extension Development Host
- No TypeScript compilation errors
- Basic command registered and working

---

## Issue: Configure Build Pipeline

**Labels:** `story`, `phase-1`, `infrastructure`, `priority-p0`

### Description

As a developer, I need a fast and reliable build pipeline so that I can iterate quickly during development.

### Acceptance Criteria
- [ ] esbuild configured for bundling
- [ ] `npm run build` produces working extension
- [ ] `npm run watch` enables hot reload during development
- [ ] Source maps generated for debugging
- [ ] Build time < 5 seconds

### Technical Notes
```javascript
// esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/extension.ts'],
  bundle: true,
  outfile: 'dist/extension.js',
  external: ['vscode'],
  format: 'cjs',
  platform: 'node',
  sourcemap: true,
});
```

### Definition of Done
- `npm run build` succeeds
- `npm run watch` recompiles on file changes
- Extension runs from bundled output

---

## Issue: Set Up Development Environment

**Labels:** `story`, `phase-1`, `infrastructure`, `priority-p0`

### Description

As a developer, I need VS Code launch configurations and tasks so that I can debug the extension during development.

### Acceptance Criteria
- [ ] `.vscode/launch.json` configured for extension debugging
- [ ] `.vscode/tasks.json` configured for build tasks
- [ ] F5 launches Extension Development Host
- [ ] Breakpoints work in extension code
- [ ] README with development setup instructions

### Technical Notes
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Run Extension",
      "type": "extensionHost",
      "request": "launch",
      "args": ["--extensionDevelopmentPath=${workspaceFolder}"],
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "preLaunchTask": "npm: watch"
    }
  ]
}
```

### Definition of Done
- F5 launches extension in debug mode
- Can set and hit breakpoints
- Console.log output visible in Debug Console

---

## Issue: Configure CI/CD Pipeline

**Labels:** `story`, `phase-1`, `infrastructure`, `priority-p1`

### Description

As a developer, I need automated CI/CD so that code quality is maintained and releases are streamlined.

### Acceptance Criteria
- [ ] GitHub Actions workflow for CI
- [ ] Runs on every PR and push to main
- [ ] Linting check (ESLint)
- [ ] TypeScript compilation check
- [ ] Unit tests run
- [ ] Build verification

### Technical Notes
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm test
```

### Definition of Done
- CI runs on every PR
- Failed CI blocks PR merge
- Build artifacts generated

---

# EPIC E-002: Static Code Walkthrough

## Issue: [EPIC] Static Code Walkthrough

**Labels:** `epic`, `phase-1`, `backend`

### Description

Implement the core static code walkthrough functionality - allowing users to select code and receive an AI-generated step-by-step walkthrough without debug integration.

### Acceptance Criteria
- [ ] User can select code and start walkthrough
- [ ] AI generates logical steps from code
- [ ] Each step has an explanation
- [ ] Navigation between steps works
- [ ] Q&A functionality works

### Child Stories
- [ ] #7 - Implement code selection handler
- [ ] #8 - Create step generator
- [ ] #9 - Implement state manager
- [ ] #10 - Create walkthrough controller
- [ ] #11 - Implement step navigation
- [ ] #12 - Implement Q&A conversation

---

## Issue: Implement Code Selection Handler

**Labels:** `story`, `phase-1`, `backend`, `priority-p0`

### Description

As a developer, I want to select code in the editor and trigger a walkthrough so that I can understand the selected code.

### Acceptance Criteria
- [ ] Context menu item "Walk Through Selected Code" appears when code is selected
- [ ] Command palette includes "CodeWalk: Start Walkthrough"
- [ ] Keyboard shortcut `Ctrl+Shift+W` (Cmd+Shift+W on Mac) triggers walkthrough
- [ ] Selection is captured with file path, range, and content
- [ ] Works for C# and TypeScript files

### Technical Notes
```typescript
// Command registration
vscode.commands.registerCommand('codewalk.startFromSelection', async () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showWarningMessage('Please select code to walk through');
    return;
  }
  
  const selection = {
    filePath: editor.document.uri.fsPath,
    range: editor.selection,
    content: editor.document.getText(editor.selection),
    language: editor.document.languageId,
  };
  
  await walkthroughController.startWalkthrough(selection);
});
```

### Definition of Done
- All three trigger methods work (context menu, command palette, keyboard)
- Selection data correctly captured
- Walkthrough initiation logged

---

## Issue: Create Step Generator

**Labels:** `story`, `phase-1`, `backend`, `ai`, `priority-p0`

### Description

As the system, I need to analyze code and generate logical steps so that users see a structured walkthrough.

### Acceptance Criteria
- [ ] Analyzes code structure using VS Code Language API
- [ ] Identifies logical code blocks (statements, conditionals, loops, calls)
- [ ] Generates 3-15 steps depending on code complexity
- [ ] Each step has line range, code snippet, and suggested description
- [ ] Works for C# and TypeScript

### Technical Notes
```typescript
interface GeneratedStep {
  startLine: number;
  endLine: number;
  codeSnippet: string;
  stepType: 'critical' | 'supporting' | 'detail';
  suggestedDescription: string;
}

async function generateSteps(code: string, language: string): Promise<GeneratedStep[]> {
  // 1. Get document symbols from language server
  // 2. Identify logical blocks
  // 3. Order by execution flow
  // 4. Return structured steps
}
```

### Definition of Done
- Step generator produces reasonable steps for sample C# code
- Step generator produces reasonable steps for sample TypeScript code
- Steps are ordered logically (execution flow)
- Unit tests pass

---

## Issue: Implement State Manager

**Labels:** `story`, `phase-1`, `backend`, `priority-p0`

### Description

As the system, I need centralized state management so that walkthrough state is consistent across components.

### Acceptance Criteria
- [ ] Single source of truth for walkthrough state
- [ ] Tracks: current walkthrough, steps, current step index, conversation history
- [ ] Supports state transitions (initializing → analyzing → ready → error)
- [ ] Emits events on state changes
- [ ] Can be reset for new walkthroughs

### Technical Notes
```typescript
// src/core/state-manager.ts
interface WalkthroughState {
  id: string;
  status: 'initializing' | 'analyzing' | 'generating' | 'ready' | 'error';
  sourceFile: string;
  selectionRange: SelectionRange;
  steps: WalkthroughStep[];
  currentStepIndex: number;
  mode: 'static' | 'debug';
  conversationHistory: ConversationTurn[];
}

class StateManager extends EventEmitter {
  private state: WalkthroughState | null = null;
  
  createWalkthrough(params: CreateParams): WalkthroughState;
  setSteps(steps: WalkthroughStep[]): void;
  nextStep(): void;
  previousStep(): void;
  goToStep(index: number): void;
  addConversationTurn(turn: ConversationTurn): void;
  getState(): WalkthroughState | null;
  reset(): void;
}
```

### Definition of Done
- State manager correctly tracks all state
- Events fire on state changes
- Unit tests cover all state transitions

---

## Issue: Create Walkthrough Controller

**Labels:** `story`, `phase-1`, `backend`, `priority-p0`

### Description

As the system, I need a central controller to orchestrate the walkthrough flow between components.

### Acceptance Criteria
- [ ] Coordinates between StateManager, StepGenerator, AIClient, and PanelController
- [ ] Handles `startWalkthrough` command flow
- [ ] Handles `nextStep` and `previousStep` commands
- [ ] Handles `askQuestion` command
- [ ] Handles errors gracefully with user feedback

### Technical Notes
```typescript
// src/core/walkthrough-controller.ts
class WalkthroughController {
  constructor(
    private stateManager: StateManager,
    private stepGenerator: StepGenerator,
    private aiClient: IAIClient,
    private panelController: PanelController,
    private editorDecorations: EditorDecorations
  ) {}
  
  async startWalkthrough(selection: CodeSelection): Promise<void> {
    // 1. Create new state
    // 2. Generate steps
    // 3. Get AI explanation for first step
    // 4. Open panel and display
    // 5. Add editor decorations
  }
  
  async nextStep(): Promise<void>;
  async previousStep(): Promise<void>;
  async goToStep(index: number): Promise<void>;
  async askQuestion(question: string): Promise<void>;
  stopWalkthrough(): void;
}
```

### Definition of Done
- Full walkthrough flow works end-to-end
- Error handling shows appropriate messages
- Integration test passes

---

## Issue: Implement Step Navigation

**Labels:** `story`, `phase-1`, `backend`, `frontend`, `priority-p0`

### Description

As a developer, I want to navigate between walkthrough steps so that I can review at my own pace.

### Acceptance Criteria
- [ ] "Next" advances to next step
- [ ] "Previous" returns to previous step
- [ ] Step counter shows "Step X of Y"
- [ ] Can jump to any step by clicking in step list
- [ ] Editor scrolls to show current step's code
- [ ] Keyboard shortcuts work (Alt+Right, Alt+Left)

### Technical Notes
```typescript
// Navigation commands
vscode.commands.registerCommand('codewalk.nextStep', () => {
  walkthroughController.nextStep();
});

vscode.commands.registerCommand('codewalk.previousStep', () => {
  walkthroughController.previousStep();
});

// Scroll editor to step
function scrollToStep(step: WalkthroughStep) {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const range = new vscode.Range(step.startLine, 0, step.endLine, 0);
    editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
  }
}
```

### Definition of Done
- All navigation methods work
- UI updates correctly on step change
- Editor syncs with current step

---

## Issue: Implement Q&A Conversation

**Labels:** `story`, `phase-1`, `backend`, `ai`, `priority-p0`

### Description

As a developer, I want to ask follow-up questions about the current step so that I can clarify things I don't understand.

### Acceptance Criteria
- [ ] Text input field accepts questions
- [ ] Questions are sent to AI with full context
- [ ] Responses appear in conversation area
- [ ] Conversation history is maintained for session
- [ ] Context includes: current step, surrounding code, previous Q&A

### Technical Notes
```typescript
async askQuestion(question: string): Promise<void> {
  const state = this.stateManager.getState();
  if (!state) return;
  
  // Add user question to history
  this.stateManager.addConversationTurn({
    role: 'user',
    content: question,
    stepId: state.steps[state.currentStepIndex].id,
  });
  
  // Build context with conversation history
  const context = this.contextBuilder.buildQAContext(state, question);
  
  // Get AI response
  const response = await this.aiClient.answerQuestion(question, context);
  
  // Add AI response to history
  this.stateManager.addConversationTurn({
    role: 'assistant',
    content: response.explanation,
  });
  
  // Update UI
  this.panelController.updateConversation(state.conversationHistory);
}
```

### Definition of Done
- Questions can be submitted via UI
- AI responses are relevant to the question and context
- Conversation history persists within session

---

# EPIC E-003: AI Integration

## Issue: [EPIC] AI Integration

**Labels:** `epic`, `phase-1`, `ai`

### Description

Implement the AI service layer for generating code explanations, answering questions, and providing intelligent insights.

### Acceptance Criteria
- [ ] AI client abstraction implemented
- [ ] Anthropic provider implemented
- [ ] Prompt templates optimized
- [ ] Context management handles token limits
- [ ] Explanations are high quality

### Child Stories
- [ ] #14 - Create AI client interface
- [ ] #15 - Implement Anthropic provider
- [ ] #16 - Create prompt templates
- [ ] #17 - Implement context builder
- [ ] #18 - Add API key management

---

## Issue: Create AI Client Interface

**Labels:** `story`, `phase-1`, `ai`, `priority-p0`

### Description

As the system, I need an abstract AI client interface so that I can support multiple AI providers.

### Acceptance Criteria
- [ ] `IAIClient` interface defined
- [ ] Methods: `generateSteps`, `generateExplanation`, `answerQuestion`, `healthCheck`
- [ ] Response types defined
- [ ] Error types defined

### Technical Notes
```typescript
// src/ai/ai-client.ts
interface IAIClient {
  generateSteps(context: StepGenerationContext): Promise<StepGenerationResponse>;
  generateExplanation(context: ExplanationContext): Promise<ExplanationResponse>;
  answerQuestion(question: string, context: ExplanationContext): Promise<ExplanationResponse>;
  healthCheck(): Promise<boolean>;
  getTokenUsage(): TokenUsage;
}

interface StepGenerationResponse {
  steps: GeneratedStep[];
  metadata: { modelUsed: string; tokensUsed: number; generationTime: number };
}

interface ExplanationResponse {
  explanation: string;
  intent?: string;
  keyInsights?: string[];
  suggestedQuestions?: string[];
  metadata: { modelUsed: string; tokensUsed: number };
}
```

### Definition of Done
- Interface fully defined
- Types exported
- Mock implementation for testing

---

## Issue: Implement Anthropic Provider

**Labels:** `story`, `phase-1`, `ai`, `priority-p0`

### Description

As the system, I need an Anthropic Claude implementation so that I can generate high-quality explanations.

### Acceptance Criteria
- [ ] Uses `@anthropic-ai/sdk`
- [ ] Implements `IAIClient` interface
- [ ] Uses Claude Sonnet for explanations
- [ ] Handles API errors gracefully
- [ ] Tracks token usage

### Technical Notes
```typescript
// src/ai/providers/anthropic-provider.ts
import Anthropic from '@anthropic-ai/sdk';

class AnthropicProvider implements IAIClient {
  private client: Anthropic;
  
  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }
  
  async generateExplanation(context: ExplanationContext): Promise<ExplanationResponse> {
    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: this.buildPrompt(context) }],
    });
    
    return this.parseResponse(response);
  }
}
```

### Definition of Done
- Provider connects to Anthropic API
- All interface methods implemented
- Error handling tested

---

## Issue: Create Prompt Templates

**Labels:** `story`, `phase-1`, `ai`, `priority-p0`

### Description

As the system, I need optimized prompt templates so that AI generates high-quality, consistent responses.

### Acceptance Criteria
- [ ] Step generation prompt template
- [ ] Explanation prompt template
- [ ] Q&A prompt template
- [ ] Templates use Handlebars-style placeholders
- [ ] Prompts tested with sample code

### Technical Notes
```typescript
// src/ai/prompt-templates.ts
export const EXPLANATION_PROMPT = `
You are an expert code instructor explaining code to a developer.

## Context
- Language: {{language}}
- Step {{stepNumber}} of {{totalSteps}}

## Current Step Code
\`\`\`{{language}}
{{stepCode}}
\`\`\`

{{#if variables}}
## Runtime Values
{{#each variables}}
- {{name}}: {{value}}
{{/each}}
{{/if}}

## Instructions
Explain this code step in a way that helps the developer understand:
1. **What** this code does
2. **Why** it exists
3. **How** it relates to surrounding code

Be concise but thorough (2-4 paragraphs).
`;
```

### Definition of Done
- All three templates created
- Templates produce good results with test code
- Easy to modify and iterate

---

## Issue: Implement Context Builder

**Labels:** `story`, `phase-1`, `ai`, `priority-p0`

### Description

As the system, I need to build rich context for AI prompts while respecting token limits.

### Acceptance Criteria
- [ ] Combines code, symbols, and runtime state
- [ ] Respects token budget (default 8000)
- [ ] Prioritizes: current step > surrounding code > variables > conversation
- [ ] Estimates token usage before sending

### Technical Notes
```typescript
// src/ai/context-builder.ts
class ContextBuilder {
  private readonly maxTokens = 8000;
  private readonly reservedForResponse = 1000;
  
  buildExplanationContext(state: WalkthroughState, step: WalkthroughStep): ExplanationContext {
    const budget = this.maxTokens - this.reservedForResponse;
    let usedTokens = 0;
    
    // Priority 1: Current step code (always include)
    const stepCode = step.codeSnippet;
    usedTokens += this.estimateTokens(stepCode);
    
    // Priority 2-4: Add more context if budget allows
    // ...
    
    return context;
  }
  
  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }
}
```

### Definition of Done
- Context builder respects token limits
- Prioritization works correctly
- Unit tests verify budget management

---

## Issue: Add API Key Management

**Labels:** `story`, `phase-1`, `ai`, `infrastructure`, `priority-p0`

### Description

As a user, I need to securely store my API key so that I can use the AI features.

### Acceptance Criteria
- [ ] API key stored in VS Code SecretStorage (encrypted)
- [ ] Prompt for API key on first use
- [ ] Settings option to update API key
- [ ] Key never logged or exposed
- [ ] Support for both Anthropic and Azure OpenAI keys

### Technical Notes
```typescript
// src/utils/secrets.ts
class SecretStorage {
  constructor(private secretStorage: vscode.SecretStorage) {}
  
  async getAnthropicKey(): Promise<string | undefined> {
    return await this.secretStorage.get('codewalk.anthropicApiKey');
  }
  
  async setAnthropicKey(key: string): Promise<void> {
    await this.secretStorage.store('codewalk.anthropicApiKey', key);
  }
  
  async promptForApiKey(): Promise<string | undefined> {
    return await vscode.window.showInputBox({
      prompt: 'Enter your Anthropic API key',
      password: true,
      ignoreFocusOut: true,
    });
  }
}
```

### Definition of Done
- API key stored securely
- First-use prompt works
- Settings command to update key

---

# EPIC E-004: Debug Integration

## Issue: [EPIC] Debug Integration

**Labels:** `epic`, `phase-2`, `debug`

### Description

Implement debug integration to enhance walkthroughs with live variable values and execution state during debugging sessions.

### Acceptance Criteria
- [ ] Detect active debug sessions
- [ ] Fetch variable values at each step
- [ ] Sync walkthrough with debugger stepping
- [ ] Include runtime context in AI explanations
- [ ] Graceful fallback when debug unavailable

### Child Stories
- [ ] #20 - Implement Debug Bridge
- [ ] #21 - Create Variable Inspector
- [ ] #22 - Implement Debug Event Handler
- [ ] #23 - Add Runtime Context to AI
- [ ] #24 - Implement Debug Mode Toggle

---

## Issue: Implement Debug Bridge

**Labels:** `story`, `phase-2`, `debug`, `priority-p1`

### Description

As the system, I need to interface with VS Code's Debug Adapter Protocol to access runtime information.

### Acceptance Criteria
- [ ] Detect when debug session is active
- [ ] Get current stack frame
- [ ] Get local variables for current scope
- [ ] Evaluate expressions
- [ ] Get call stack

### Technical Notes
```typescript
// src/debug/debug-bridge.ts
class DebugBridge implements IDebugBridge {
  isDebugging(): boolean {
    return vscode.debug.activeDebugSession !== undefined;
  }
  
  async getLocals(): Promise<VariableInfo[]> {
    const session = vscode.debug.activeDebugSession;
    if (!session) return [];
    
    const threads = await session.customRequest('threads');
    const threadId = threads.threads[0]?.id;
    
    const stackTrace = await session.customRequest('stackTrace', {
      threadId,
      startFrame: 0,
      levels: 1,
    });
    
    const frameId = stackTrace.stackFrames[0]?.id;
    const scopes = await session.customRequest('scopes', { frameId });
    
    // Get variables from Local scope
    // ...
  }
}
```

### Definition of Done
- Can detect debug session
- Can fetch variables during debugging
- Works with C# debugger (OmniSharp)
- Works with TypeScript debugger (Node)

---

## Issue: Create Variable Inspector

**Labels:** `story`, `phase-2`, `debug`, `priority-p1`

### Description

As a developer, I want to see current variable values at each step so I understand the runtime state.

### Acceptance Criteria
- [ ] Display relevant variables for current step
- [ ] Show variable name, type, and value
- [ ] Truncate long values with expandable view
- [ ] Update when debugger steps
- [ ] Handle evaluation errors gracefully

### Technical Notes
```typescript
interface VariableInfo {
  name: string;
  value: string;
  type: string;
  scope: 'local' | 'parameter' | 'member';
  isExpandable: boolean;
  children?: VariableInfo[];
  evaluateError?: string;
}

// Truncate long values
function truncateValue(value: string, maxLength: number = 100): string {
  if (value.length <= maxLength) return value;
  return value.substring(0, maxLength - 3) + '...';
}
```

### Definition of Done
- Variables display in panel during debug mode
- Values update on step
- Complex objects show expandable preview

---

## Issue: Implement Debug Event Handler

**Labels:** `story`, `phase-2`, `debug`, `priority-p1`

### Description

As the system, I need to handle debug events so the walkthrough stays synchronized with the debugger.

### Acceptance Criteria
- [ ] Subscribe to debug step events
- [ ] Auto-advance walkthrough when debugger steps (configurable)
- [ ] Handle debug session start/end
- [ ] Update variables on each step

### Technical Notes
```typescript
// src/debug/debug-event-handler.ts
class DebugEventHandler {
  constructor(
    private walkthroughController: WalkthroughController,
    private debugBridge: IDebugBridge
  ) {
    vscode.debug.onDidChangeActiveStackItem(async (stackItem) => {
      if (stackItem && this.walkthroughController.isActive()) {
        await this.onDebugStep();
      }
    });
    
    vscode.debug.onDidTerminateDebugSession(() => {
      this.walkthroughController.exitDebugMode();
    });
  }
  
  private async onDebugStep(): Promise<void> {
    const location = await this.debugBridge.getCurrentLocation();
    // Find matching step and advance if configured
    // Update variables
  }
}
```

### Definition of Done
- Walkthrough syncs with debugger steps
- Variables update automatically
- Clean handling of session end

---

## Issue: Add Runtime Context to AI

**Labels:** `story`, `phase-2`, `ai`, `debug`, `priority-p1`

### Description

As a developer, I want AI explanations to reference actual variable values so the explanation is more concrete.

### Acceptance Criteria
- [ ] Include variable values in AI context when in debug mode
- [ ] AI references specific values in explanations
- [ ] Context builder includes runtime state
- [ ] Explanations are more specific and helpful

### Technical Notes
```typescript
// Enhanced explanation prompt for debug mode
const DEBUG_EXPLANATION_PROMPT = `
...
## Current Runtime Values
{{#each variables}}
- {{name}} ({{type}}): {{value}}
{{/each}}

## Call Stack
{{#each callStack}}
- {{name}} at {{filePath}}:{{line}}
{{/each}}

When explaining, reference the actual current values of variables.
`;
```

### Definition of Done
- AI references actual values during debug
- Explanations are more concrete
- User feedback indicates improvement

---

## Issue: Implement Debug Mode Toggle

**Labels:** `story`, `phase-2`, `debug`, `frontend`, `priority-p1`

### Description

As a developer, I want to toggle debug mode so I can control whether the walkthrough uses runtime information.

### Acceptance Criteria
- [ ] UI indicator shows current mode (Static/Debug)
- [ ] Auto-switch to debug mode when debugging starts (configurable)
- [ ] Manual toggle available
- [ ] Graceful transition between modes

### Technical Notes
```typescript
// Configuration
"codewalk.autoStartDebugMode": {
  "type": "boolean",
  "default": true,
  "description": "Automatically enable debug mode when debugging"
}

// Toggle command
vscode.commands.registerCommand('codewalk.toggleDebugMode', () => {
  if (debugBridge.isDebugging()) {
    walkthroughController.toggleDebugMode();
  } else {
    vscode.window.showWarningMessage('No active debug session');
  }
});
```

### Definition of Done
- Mode indicator visible in panel
- Auto-switch works when configured
- Manual toggle works

---

# EPIC E-005: UI/UX Implementation

## Issue: [EPIC] UI/UX Implementation

**Labels:** `epic`, `phase-1`, `frontend`

### Description

Implement the user interface for the walkthrough panel, editor decorations, and all visual elements.

### Acceptance Criteria
- [ ] Webview panel implemented
- [ ] All UI sections render correctly
- [ ] Editor decorations show step markers
- [ ] Light and dark themes supported
- [ ] Responsive to panel size

### Child Stories
- [ ] #26 - Create Webview Panel
- [ ] #27 - Implement Step List Component
- [ ] #28 - Implement Explanation Component
- [ ] #29 - Implement Conversation Component
- [ ] #30 - Add Editor Decorations

---

## Issue: Create Webview Panel

**Labels:** `story`, `phase-1`, `frontend`, `priority-p0`

### Description

As the system, I need a webview panel to display the walkthrough UI.

### Acceptance Criteria
- [ ] Panel opens beside editor (configurable)
- [ ] Panel title shows "CodeWalk"
- [ ] Panel receives state updates from extension
- [ ] Panel sends commands back to extension
- [ ] Loading state while generating

### Technical Notes
```typescript
// src/ui/panel-controller.ts
class PanelController {
  private panel: vscode.WebviewPanel | undefined;
  
  createPanel(extensionUri: vscode.Uri): void {
    this.panel = vscode.window.createWebviewPanel(
      'codewalkPanel',
      'CodeWalk',
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
      }
    );
    
    this.panel.webview.html = this.getHtmlContent();
    
    this.panel.webview.onDidReceiveMessage((message) => {
      this.handleMessage(message);
    });
  }
  
  postMessage(message: ExtensionToWebviewMessage): void {
    this.panel?.webview.postMessage(message);
  }
}
```

### Definition of Done
- Panel opens and closes correctly
- Message passing works both directions
- Panel persists during tab switches

---

## Issue: Implement Step List Component

**Labels:** `story`, `phase-1`, `frontend`, `priority-p0`

### Description

As a developer, I want to see a list of all steps so I can navigate and track progress.

### Acceptance Criteria
- [ ] Shows numbered list of steps
- [ ] Current step highlighted
- [ ] Clicking step navigates to it
- [ ] Shows step summary/title
- [ ] Collapsible for more space

### Technical Notes
```html
<!-- Step list HTML structure -->
<div class="step-list">
  <div class="step-list-header">
    <span>Steps</span>
    <button class="collapse-btn">▼</button>
  </div>
  <div class="step-list-items">
    <div class="step-item" data-index="0">
      <span class="step-indicator">○</span>
      <span class="step-number">1.</span>
      <span class="step-title">Variable initialization</span>
    </div>
    <div class="step-item current" data-index="1">
      <span class="step-indicator">●</span>
      <span class="step-number">2.</span>
      <span class="step-title">Database query</span>
    </div>
    <!-- ... -->
  </div>
</div>
```

### Definition of Done
- Step list renders all steps
- Current step visually distinct
- Click navigation works

---

## Issue: Implement Explanation Component

**Labels:** `story`, `phase-1`, `frontend`, `priority-p0`

### Description

As a developer, I want to see the AI explanation clearly formatted so I can understand the code.

### Acceptance Criteria
- [ ] Shows code snippet with syntax highlighting
- [ ] Shows AI explanation with markdown rendering
- [ ] Shows line numbers for reference
- [ ] "Copy code" button
- [ ] "Go to code" button to jump in editor

### Technical Notes
```html
<!-- Explanation component structure -->
<div class="explanation-section">
  <div class="code-block">
    <div class="code-header">
      <span class="location">📍 Line 47-49</span>
      <button class="copy-btn">Copy</button>
      <button class="goto-btn">Go to</button>
    </div>
    <pre><code class="language-csharp">
var customer = await _customerRepo
    .GetByIdAsync(request.CustomerId);
    </code></pre>
  </div>
  
  <div class="explanation-text">
    <!-- Rendered markdown -->
  </div>
</div>
```

### Definition of Done
- Code displays with syntax highlighting
- Explanation renders markdown correctly
- Buttons work (copy, go to)

---

## Issue: Implement Conversation Component

**Labels:** `story`, `phase-1`, `frontend`, `priority-p0`

### Description

As a developer, I want to see the Q&A conversation and ask new questions.

### Acceptance Criteria
- [ ] Shows conversation history
- [ ] User messages styled differently from AI
- [ ] Input field for new questions
- [ ] Submit on Enter or button click
- [ ] Loading indicator while waiting for response

### Technical Notes
```html
<!-- Conversation component structure -->
<div class="conversation-section">
  <div class="conversation-history">
    <div class="message user">
      <span class="icon">👤</span>
      <span class="content">What happens if customer is null?</span>
    </div>
    <div class="message assistant">
      <span class="icon">🤖</span>
      <span class="content">If GetByIdAsync returns null...</span>
    </div>
  </div>
  
  <div class="conversation-input">
    <input type="text" placeholder="Ask a question about this code..." />
    <button class="send-btn">→</button>
  </div>
</div>
```

### Definition of Done
- Conversation history displays
- Can submit questions
- Responses appear correctly

---

## Issue: Add Editor Decorations

**Labels:** `story`, `phase-1`, `frontend`, `priority-p0`

### Description

As a developer, I want visual markers in the editor showing walkthrough steps so I can see where I am.

### Acceptance Criteria
- [ ] Current step highlighted with background color
- [ ] Step markers in gutter for all steps
- [ ] Visited steps have subtle indicator
- [ ] Decorations update on step change
- [ ] Decorations clear when walkthrough ends

### Technical Notes
```typescript
// src/ui/editor-decorations.ts
class EditorDecorations {
  private currentStepDecoration = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255, 213, 79, 0.2)',
    borderLeft: '3px solid #FFC107',
    isWholeLine: true,
  });
  
  private stepMarkerDecoration = vscode.window.createTextEditorDecorationType({
    gutterIconPath: this.getGutterIcon(),
    gutterIconSize: 'contain',
  });
  
  highlightStep(editor: vscode.TextEditor, step: WalkthroughStep): void {
    const range = new vscode.Range(step.startLine - 1, 0, step.endLine - 1, 0);
    editor.setDecorations(this.currentStepDecoration, [range]);
  }
  
  clearDecorations(editor: vscode.TextEditor): void {
    editor.setDecorations(this.currentStepDecoration, []);
    editor.setDecorations(this.stepMarkerDecoration, []);
  }
}
```

### Definition of Done
- Current step clearly highlighted
- Gutter markers visible
- Decorations clean up properly

---

# EPIC E-006: Testing & Quality

## Issue: [EPIC] Testing & Quality

**Labels:** `epic`, `phase-1`, `phase-2`, `phase-3`

### Description

Implement comprehensive testing and quality assurance for the extension.

### Child Stories
- [ ] #32 - Set up unit testing framework
- [ ] #33 - Create unit tests for core modules
- [ ] #34 - Create integration tests
- [ ] #35 - Add error handling and logging

---

## Issue: Set Up Unit Testing Framework

**Labels:** `story`, `phase-1`, `infrastructure`, `priority-p1`

### Description

As a developer, I need a testing framework so I can write and run tests.

### Acceptance Criteria
- [ ] Vitest configured for unit tests
- [ ] Test script in package.json
- [ ] Sample test passing
- [ ] Coverage reporting configured
- [ ] Tests run in CI

### Technical Notes
```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  },
  "devDependencies": {
    "vitest": "^1.2.0",
    "@vitest/coverage-v8": "^1.2.0"
  }
}
```

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/unit/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
```

### Definition of Done
- `npm test` runs tests
- Coverage report generated
- CI runs tests

---

## Issue: Create Unit Tests for Core Modules

**Labels:** `story`, `phase-1`, `priority-p1`

### Description

As a developer, I need unit tests for core modules so I can refactor with confidence.

### Acceptance Criteria
- [ ] StateManager tests (80%+ coverage)
- [ ] ContextBuilder tests
- [ ] StepGenerator tests
- [ ] PromptTemplate tests
- [ ] Mock implementations for dependencies

### Definition of Done
- Core modules have 80%+ coverage
- Tests are meaningful, not just coverage padding
- Tests run fast (< 10 seconds total)

---

## Issue: Create Integration Tests

**Labels:** `story`, `phase-2`, `priority-p1`

### Description

As a developer, I need integration tests to verify the full walkthrough flow.

### Acceptance Criteria
- [ ] VS Code extension test runner configured
- [ ] Test: Start walkthrough from selection
- [ ] Test: Navigate between steps
- [ ] Test: Ask question and receive response

### Technical Notes
```typescript
// test/integration/walkthrough.test.ts
import * as vscode from 'vscode';
import * as assert from 'assert';

suite('Walkthrough Integration', () => {
  test('should start walkthrough from selection', async () => {
    // Open test file
    // Make selection
    // Execute command
    // Verify panel opened
    // Verify steps generated
  });
});
```

### Definition of Done
- Integration tests pass locally
- Tests run in CI (may need special runner)
- Key flows covered

---

## Issue: Add Error Handling and Logging

**Labels:** `story`, `phase-1`, `priority-p1`

### Description

As a developer, I need proper error handling and logging so I can diagnose issues.

### Acceptance Criteria
- [ ] Logger utility with levels (debug, info, warn, error)
- [ ] Errors caught and logged appropriately
- [ ] User-friendly error messages shown
- [ ] No unhandled promise rejections
- [ ] Output channel for extension logs

### Technical Notes
```typescript
// src/utils/logger.ts
class Logger {
  private static outputChannel: vscode.OutputChannel;
  
  static init(): void {
    this.outputChannel = vscode.window.createOutputChannel('CodeWalk');
  }
  
  static info(message: string, ...args: any[]): void {
    const formatted = `[INFO] ${new Date().toISOString()} ${message}`;
    this.outputChannel.appendLine(formatted);
    console.log(formatted, ...args);
  }
  
  static error(message: string, error?: Error): void {
    const formatted = `[ERROR] ${new Date().toISOString()} ${message}`;
    this.outputChannel.appendLine(formatted);
    if (error) {
      this.outputChannel.appendLine(error.stack || error.message);
    }
    console.error(formatted, error);
  }
}
```

### Definition of Done
- All modules use logger
- Errors show helpful messages to users
- Logs help diagnose issues

---

# Additional Documentation Issues

## Issue: Create README.md

**Labels:** `documentation`, `priority-p0`

### Description

Create a comprehensive README for the repository.

### Content to Include
- [ ] Project overview and vision
- [ ] Features list
- [ ] Installation instructions (when available)
- [ ] Usage examples with screenshots
- [ ] Development setup instructions
- [ ] Contributing guidelines link
- [ ] License

---

## Issue: Create CONTRIBUTING.md

**Labels:** `documentation`, `priority-p1`

### Description

Create contribution guidelines for external contributors.

### Content to Include
- [ ] How to set up development environment
- [ ] Code style guidelines
- [ ] PR process
- [ ] Issue templates
- [ ] Testing requirements

---

## Issue: Add Technical Specification to Repo

**Labels:** `documentation`, `priority-p0`

### Description

Add the technical specification document to the repository.

### Acceptance Criteria
- [ ] Create `docs/` directory
- [ ] Add `TECHNICAL_SPEC.md`
- [ ] Link from README

---

# GitHub CLI Commands to Create All Issues

Save these commands to create all issues at once:

```bash
#!/bin/bash
# Create all CodeWalk issues

# Epic E-001
gh issue create --title "[EPIC] Project Setup & Infrastructure" --body "..." --label "epic,phase-1,infrastructure"
gh issue create --title "Create Extension Scaffold" --body "..." --label "story,phase-1,infrastructure,priority-p0"
gh issue create --title "Configure Build Pipeline" --body "..." --label "story,phase-1,infrastructure,priority-p0"
gh issue create --title "Set Up Development Environment" --body "..." --label "story,phase-1,infrastructure,priority-p0"
gh issue create --title "Configure CI/CD Pipeline" --body "..." --label "story,phase-1,infrastructure,priority-p1"

# Continue for all issues...
```

---

*Total Issues: 35*
*Epics: 6*
*Stories: 29*
