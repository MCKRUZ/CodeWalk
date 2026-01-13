#!/bin/bash

# CodeWalk GitHub Issue Creation Script
# Run this from the repository root after installing GitHub CLI (gh)
# Prerequisites: gh auth login

set -e

REPO="MCKRUZ/CodeWalk"

echo "🚀 Creating labels..."

# Create labels
gh label create "epic" --color "3E4B9E" --description "Epic-level tracking issue" --repo $REPO 2>/dev/null || echo "Label 'epic' already exists"
gh label create "story" --color "0E8A16" --description "User story" --repo $REPO 2>/dev/null || echo "Label 'story' already exists"
gh label create "task" --color "1D76DB" --description "Technical task" --repo $REPO 2>/dev/null || echo "Label 'task' already exists"
gh label create "phase-1" --color "FBCA04" --description "Phase 1: Static Walkthrough" --repo $REPO 2>/dev/null || echo "Label 'phase-1' already exists"
gh label create "phase-2" --color "F9A825" --description "Phase 2: Debug Integration" --repo $REPO 2>/dev/null || echo "Label 'phase-2' already exists"
gh label create "phase-3" --color "E65100" --description "Phase 3: Polish & Beta" --repo $REPO 2>/dev/null || echo "Label 'phase-3' already exists"
gh label create "priority-p0" --color "B60205" --description "Critical - Must have for MVP" --repo $REPO 2>/dev/null || echo "Label 'priority-p0' already exists"
gh label create "priority-p1" --color "D93F0B" --description "High - Should have for MVP" --repo $REPO 2>/dev/null || echo "Label 'priority-p1' already exists"
gh label create "priority-p2" --color "FBCA04" --description "Medium - Nice to have" --repo $REPO 2>/dev/null || echo "Label 'priority-p2' already exists"
gh label create "frontend" --color "C2E0C6" --description "UI/UX work" --repo $REPO 2>/dev/null || echo "Label 'frontend' already exists"
gh label create "backend" --color "BFD4F2" --description "Extension core logic" --repo $REPO 2>/dev/null || echo "Label 'backend' already exists"
gh label create "ai" --color "D4C5F9" --description "AI integration" --repo $REPO 2>/dev/null || echo "Label 'ai' already exists"
gh label create "debug" --color "FEF2C0" --description "Debug integration" --repo $REPO 2>/dev/null || echo "Label 'debug' already exists"
gh label create "infrastructure" --color "E6E6E6" --description "Build, CI/CD, tooling" --repo $REPO 2>/dev/null || echo "Label 'infrastructure' already exists"
gh label create "documentation" --color "0075CA" --description "Documentation" --repo $REPO 2>/dev/null || echo "Label 'documentation' already exists"

echo "✅ Labels created!"
echo ""
echo "🚀 Creating issues..."

# ============================================================================
# EPIC E-001: Project Setup & Infrastructure
# ============================================================================

gh issue create \
  --repo $REPO \
  --title "[EPIC] E-001: Project Setup & Infrastructure" \
  --label "epic,phase-1,infrastructure" \
  --body "## Description

Set up the foundational project structure, build pipeline, and development environment for the CodeWalk VS Code extension.

## Acceptance Criteria
- [ ] VS Code extension scaffold created
- [ ] TypeScript configuration complete
- [ ] Build pipeline working (esbuild)
- [ ] Development workflow documented
- [ ] CI/CD pipeline configured

## Child Stories
- [ ] Create extension scaffold
- [ ] Configure build pipeline
- [ ] Set up development environment
- [ ] Configure CI/CD

## Priority
**P0 - Critical for MVP**"

echo "Created Epic E-001"

gh issue create \
  --repo $REPO \
  --title "Create Extension Scaffold" \
  --label "story,phase-1,infrastructure,priority-p0" \
  --body "## User Story
As a developer, I need a properly structured VS Code extension project so that I can start building features.

## Acceptance Criteria
- [ ] \`package.json\` with correct VS Code extension configuration
- [ ] TypeScript configuration (\`tsconfig.json\`)
- [ ] Source directory structure:
\`\`\`
src/
├── extension.ts
├── core/
├── analysis/
├── debug/
├── ai/
├── ui/
└── utils/
\`\`\`
- [ ] Basic extension activates without errors
- [ ] \"Hello World\" command works to verify setup

## Technical Notes
\`\`\`json
{
  \"engines\": {
    \"vscode\": \"^1.85.0\"
  }
}
\`\`\`

## Definition of Done
- Extension activates in VS Code Extension Development Host
- No TypeScript compilation errors
- Basic command registered and working

## Estimated Effort
**2-4 hours**"

echo "Created: Create Extension Scaffold"

gh issue create \
  --repo $REPO \
  --title "Configure Build Pipeline" \
  --label "story,phase-1,infrastructure,priority-p0" \
  --body "## User Story
As a developer, I need a fast and reliable build pipeline so that I can iterate quickly during development.

## Acceptance Criteria
- [ ] esbuild configured for bundling
- [ ] \`npm run build\` produces working extension
- [ ] \`npm run watch\` enables hot reload during development
- [ ] Source maps generated for debugging
- [ ] Build time < 5 seconds

## Technical Notes
\`\`\`javascript
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
\`\`\`

## Definition of Done
- \`npm run build\` succeeds
- \`npm run watch\` recompiles on file changes
- Extension runs from bundled output

## Estimated Effort
**2-3 hours**"

echo "Created: Configure Build Pipeline"

gh issue create \
  --repo $REPO \
  --title "Set Up Development Environment" \
  --label "story,phase-1,infrastructure,priority-p0" \
  --body "## User Story
As a developer, I need VS Code launch configurations and tasks so that I can debug the extension during development.

## Acceptance Criteria
- [ ] \`.vscode/launch.json\` configured for extension debugging
- [ ] \`.vscode/tasks.json\` configured for build tasks
- [ ] F5 launches Extension Development Host
- [ ] Breakpoints work in extension code
- [ ] README with development setup instructions

## Technical Notes
\`\`\`json
// .vscode/launch.json
{
  \"version\": \"0.2.0\",
  \"configurations\": [
    {
      \"name\": \"Run Extension\",
      \"type\": \"extensionHost\",
      \"request\": \"launch\",
      \"args\": [\"--extensionDevelopmentPath=\${workspaceFolder}\"],
      \"outFiles\": [\"\${workspaceFolder}/dist/**/*.js\"],
      \"preLaunchTask\": \"npm: watch\"
    }
  ]
}
\`\`\`

## Definition of Done
- F5 launches extension in debug mode
- Can set and hit breakpoints
- Console.log output visible in Debug Console

## Estimated Effort
**1-2 hours**"

echo "Created: Set Up Development Environment"

gh issue create \
  --repo $REPO \
  --title "Configure CI/CD Pipeline" \
  --label "story,phase-1,infrastructure,priority-p1" \
  --body "## User Story
As a developer, I need automated CI/CD so that code quality is maintained and releases are streamlined.

## Acceptance Criteria
- [ ] GitHub Actions workflow for CI
- [ ] Runs on every PR and push to main
- [ ] Linting check (ESLint)
- [ ] TypeScript compilation check
- [ ] Unit tests run
- [ ] Build verification

## Technical Notes
\`\`\`yaml
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
\`\`\`

## Definition of Done
- CI runs on every PR
- Failed CI blocks PR merge
- Build artifacts generated

## Estimated Effort
**2-3 hours**"

echo "Created: Configure CI/CD Pipeline"

# ============================================================================
# EPIC E-002: Static Code Walkthrough
# ============================================================================

gh issue create \
  --repo $REPO \
  --title "[EPIC] E-002: Static Code Walkthrough" \
  --label "epic,phase-1,backend" \
  --body "## Description

Implement the core static code walkthrough functionality - allowing users to select code and receive an AI-generated step-by-step walkthrough without debug integration.

## Acceptance Criteria
- [ ] User can select code and start walkthrough
- [ ] AI generates logical steps from code
- [ ] Each step has an explanation
- [ ] Navigation between steps works
- [ ] Q&A functionality works

## Child Stories
- [ ] Implement code selection handler
- [ ] Create step generator
- [ ] Implement state manager
- [ ] Create walkthrough controller
- [ ] Implement step navigation
- [ ] Implement Q&A conversation

## Priority
**P0 - Core MVP Feature**"

echo "Created Epic E-002"

gh issue create \
  --repo $REPO \
  --title "Implement Code Selection Handler" \
  --label "story,phase-1,backend,priority-p0" \
  --body "## User Story
As a developer, I want to select code in the editor and trigger a walkthrough so that I can understand the selected code.

## Acceptance Criteria
- [ ] Context menu item \"Walk Through Selected Code\" appears when code is selected
- [ ] Command palette includes \"CodeWalk: Start Walkthrough\"
- [ ] Keyboard shortcut \`Ctrl+Shift+W\` (Cmd+Shift+W on Mac) triggers walkthrough
- [ ] Selection is captured with file path, range, and content
- [ ] Works for C# and TypeScript files

## Technical Notes
\`\`\`typescript
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
\`\`\`

## Definition of Done
- All three trigger methods work (context menu, command palette, keyboard)
- Selection data correctly captured
- Walkthrough initiation logged

## Estimated Effort
**2-3 hours**"

echo "Created: Implement Code Selection Handler"

gh issue create \
  --repo $REPO \
  --title "Create Step Generator" \
  --label "story,phase-1,backend,ai,priority-p0" \
  --body "## User Story
As the system, I need to analyze code and generate logical steps so that users see a structured walkthrough.

## Acceptance Criteria
- [ ] Analyzes code structure using VS Code Language API
- [ ] Identifies logical code blocks (statements, conditionals, loops, calls)
- [ ] Generates 3-15 steps depending on code complexity
- [ ] Each step has line range, code snippet, and suggested description
- [ ] Works for C# and TypeScript

## Technical Notes
\`\`\`typescript
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
\`\`\`

## Definition of Done
- Step generator produces reasonable steps for sample C# code
- Step generator produces reasonable steps for sample TypeScript code
- Steps are ordered logically (execution flow)
- Unit tests pass

## Estimated Effort
**4-6 hours**"

echo "Created: Create Step Generator"

gh issue create \
  --repo $REPO \
  --title "Implement State Manager" \
  --label "story,phase-1,backend,priority-p0" \
  --body "## User Story
As the system, I need centralized state management so that walkthrough state is consistent across components.

## Acceptance Criteria
- [ ] Single source of truth for walkthrough state
- [ ] Tracks: current walkthrough, steps, current step index, conversation history
- [ ] Supports state transitions (initializing → analyzing → ready → error)
- [ ] Emits events on state changes
- [ ] Can be reset for new walkthroughs

## Technical Notes
\`\`\`typescript
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
  createWalkthrough(params: CreateParams): WalkthroughState;
  setSteps(steps: WalkthroughStep[]): void;
  nextStep(): void;
  previousStep(): void;
  goToStep(index: number): void;
  addConversationTurn(turn: ConversationTurn): void;
  getState(): WalkthroughState | null;
  reset(): void;
}
\`\`\`

## Definition of Done
- State manager correctly tracks all state
- Events fire on state changes
- Unit tests cover all state transitions

## Estimated Effort
**3-4 hours**"

echo "Created: Implement State Manager"

gh issue create \
  --repo $REPO \
  --title "Create Walkthrough Controller" \
  --label "story,phase-1,backend,priority-p0" \
  --body "## User Story
As the system, I need a central controller to orchestrate the walkthrough flow between components.

## Acceptance Criteria
- [ ] Coordinates between StateManager, StepGenerator, AIClient, and PanelController
- [ ] Handles \`startWalkthrough\` command flow
- [ ] Handles \`nextStep\` and \`previousStep\` commands
- [ ] Handles \`askQuestion\` command
- [ ] Handles errors gracefully with user feedback

## Technical Notes
\`\`\`typescript
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
\`\`\`

## Definition of Done
- Full walkthrough flow works end-to-end
- Error handling shows appropriate messages
- Integration test passes

## Estimated Effort
**4-6 hours**"

echo "Created: Create Walkthrough Controller"

gh issue create \
  --repo $REPO \
  --title "Implement Step Navigation" \
  --label "story,phase-1,backend,frontend,priority-p0" \
  --body "## User Story
As a developer, I want to navigate between walkthrough steps so that I can review at my own pace.

## Acceptance Criteria
- [ ] \"Next\" advances to next step
- [ ] \"Previous\" returns to previous step
- [ ] Step counter shows \"Step X of Y\"
- [ ] Can jump to any step by clicking in step list
- [ ] Editor scrolls to show current step's code
- [ ] Keyboard shortcuts work (Alt+Right, Alt+Left)

## Technical Notes
\`\`\`typescript
vscode.commands.registerCommand('codewalk.nextStep', () => {
  walkthroughController.nextStep();
});

vscode.commands.registerCommand('codewalk.previousStep', () => {
  walkthroughController.previousStep();
});

function scrollToStep(step: WalkthroughStep) {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const range = new vscode.Range(step.startLine, 0, step.endLine, 0);
    editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
  }
}
\`\`\`

## Definition of Done
- All navigation methods work
- UI updates correctly on step change
- Editor syncs with current step

## Estimated Effort
**2-3 hours**"

echo "Created: Implement Step Navigation"

gh issue create \
  --repo $REPO \
  --title "Implement Q&A Conversation" \
  --label "story,phase-1,backend,ai,priority-p0" \
  --body "## User Story
As a developer, I want to ask follow-up questions about the current step so that I can clarify things I don't understand.

## Acceptance Criteria
- [ ] Text input field accepts questions
- [ ] Questions are sent to AI with full context
- [ ] Responses appear in conversation area
- [ ] Conversation history is maintained for session
- [ ] Context includes: current step, surrounding code, previous Q&A

## Technical Notes
\`\`\`typescript
async askQuestion(question: string): Promise<void> {
  const state = this.stateManager.getState();
  if (!state) return;
  
  this.stateManager.addConversationTurn({
    role: 'user',
    content: question,
    stepId: state.steps[state.currentStepIndex].id,
  });
  
  const context = this.contextBuilder.buildQAContext(state, question);
  const response = await this.aiClient.answerQuestion(question, context);
  
  this.stateManager.addConversationTurn({
    role: 'assistant',
    content: response.explanation,
  });
  
  this.panelController.updateConversation(state.conversationHistory);
}
\`\`\`

## Definition of Done
- Questions can be submitted via UI
- AI responses are relevant to the question and context
- Conversation history persists within session

## Estimated Effort
**3-4 hours**"

echo "Created: Implement Q&A Conversation"

# ============================================================================
# EPIC E-003: AI Integration
# ============================================================================

gh issue create \
  --repo $REPO \
  --title "[EPIC] E-003: AI Integration" \
  --label "epic,phase-1,ai" \
  --body "## Description

Implement the AI service layer for generating code explanations, answering questions, and providing intelligent insights.

## Acceptance Criteria
- [ ] AI client abstraction implemented
- [ ] Anthropic provider implemented
- [ ] Prompt templates optimized
- [ ] Context management handles token limits
- [ ] Explanations are high quality

## Child Stories
- [ ] Create AI client interface
- [ ] Implement Anthropic provider
- [ ] Create prompt templates
- [ ] Implement context builder
- [ ] Add API key management

## Priority
**P0 - Core MVP Feature**"

echo "Created Epic E-003"

gh issue create \
  --repo $REPO \
  --title "Create AI Client Interface" \
  --label "story,phase-1,ai,priority-p0" \
  --body "## User Story
As the system, I need an abstract AI client interface so that I can support multiple AI providers.

## Acceptance Criteria
- [ ] \`IAIClient\` interface defined
- [ ] Methods: \`generateSteps\`, \`generateExplanation\`, \`answerQuestion\`, \`healthCheck\`
- [ ] Response types defined
- [ ] Error types defined

## Technical Notes
\`\`\`typescript
interface IAIClient {
  generateSteps(context: StepGenerationContext): Promise<StepGenerationResponse>;
  generateExplanation(context: ExplanationContext): Promise<ExplanationResponse>;
  answerQuestion(question: string, context: ExplanationContext): Promise<ExplanationResponse>;
  healthCheck(): Promise<boolean>;
  getTokenUsage(): TokenUsage;
}

interface ExplanationResponse {
  explanation: string;
  intent?: string;
  keyInsights?: string[];
  suggestedQuestions?: string[];
  metadata: { modelUsed: string; tokensUsed: number };
}
\`\`\`

## Definition of Done
- Interface fully defined
- Types exported
- Mock implementation for testing

## Estimated Effort
**2-3 hours**"

echo "Created: Create AI Client Interface"

gh issue create \
  --repo $REPO \
  --title "Implement Anthropic Provider" \
  --label "story,phase-1,ai,priority-p0" \
  --body "## User Story
As the system, I need an Anthropic Claude implementation so that I can generate high-quality explanations.

## Acceptance Criteria
- [ ] Uses \`@anthropic-ai/sdk\`
- [ ] Implements \`IAIClient\` interface
- [ ] Uses Claude Sonnet for explanations
- [ ] Handles API errors gracefully
- [ ] Tracks token usage

## Technical Notes
\`\`\`typescript
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
\`\`\`

## Definition of Done
- Provider connects to Anthropic API
- All interface methods implemented
- Error handling tested

## Estimated Effort
**4-6 hours**"

echo "Created: Implement Anthropic Provider"

gh issue create \
  --repo $REPO \
  --title "Create Prompt Templates" \
  --label "story,phase-1,ai,priority-p0" \
  --body "## User Story
As the system, I need optimized prompt templates so that AI generates high-quality, consistent responses.

## Acceptance Criteria
- [ ] Step generation prompt template
- [ ] Explanation prompt template
- [ ] Q&A prompt template
- [ ] Templates use Handlebars-style placeholders
- [ ] Prompts tested with sample code

## Technical Notes
See docs/TECHNICAL_SPEC.md for detailed prompt templates including:
- STEP_GENERATION_PROMPT
- EXPLANATION_PROMPT
- QA_PROMPT

## Definition of Done
- All three templates created
- Templates produce good results with test code
- Easy to modify and iterate

## Estimated Effort
**3-4 hours**"

echo "Created: Create Prompt Templates"

gh issue create \
  --repo $REPO \
  --title "Implement Context Builder" \
  --label "story,phase-1,ai,priority-p0" \
  --body "## User Story
As the system, I need to build rich context for AI prompts while respecting token limits.

## Acceptance Criteria
- [ ] Combines code, symbols, and runtime state
- [ ] Respects token budget (default 8000)
- [ ] Prioritizes: current step > surrounding code > variables > conversation
- [ ] Estimates token usage before sending

## Technical Notes
\`\`\`typescript
class ContextBuilder {
  private readonly maxTokens = 8000;
  private readonly reservedForResponse = 1000;
  
  buildExplanationContext(state: WalkthroughState, step: WalkthroughStep): ExplanationContext {
    const budget = this.maxTokens - this.reservedForResponse;
    // Priority-based context building...
  }
  
  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }
}
\`\`\`

## Definition of Done
- Context builder respects token limits
- Prioritization works correctly
- Unit tests verify budget management

## Estimated Effort
**3-4 hours**"

echo "Created: Implement Context Builder"

gh issue create \
  --repo $REPO \
  --title "Add API Key Management" \
  --label "story,phase-1,ai,infrastructure,priority-p0" \
  --body "## User Story
As a user, I need to securely store my API key so that I can use the AI features.

## Acceptance Criteria
- [ ] API key stored in VS Code SecretStorage (encrypted)
- [ ] Prompt for API key on first use
- [ ] Settings option to update API key
- [ ] Key never logged or exposed
- [ ] Support for both Anthropic and Azure OpenAI keys

## Technical Notes
\`\`\`typescript
class SecretStorage {
  constructor(private secretStorage: vscode.SecretStorage) {}
  
  async getAnthropicKey(): Promise<string | undefined> {
    return await this.secretStorage.get('codewalk.anthropicApiKey');
  }
  
  async promptForApiKey(): Promise<string | undefined> {
    return await vscode.window.showInputBox({
      prompt: 'Enter your Anthropic API key',
      password: true,
      ignoreFocusOut: true,
    });
  }
}
\`\`\`

## Definition of Done
- API key stored securely
- First-use prompt works
- Settings command to update key

## Estimated Effort
**2-3 hours**"

echo "Created: Add API Key Management"

# ============================================================================
# EPIC E-004: Debug Integration
# ============================================================================

gh issue create \
  --repo $REPO \
  --title "[EPIC] E-004: Debug Integration" \
  --label "epic,phase-2,debug" \
  --body "## Description

Implement debug integration to enhance walkthroughs with live variable values and execution state during debugging sessions.

## Acceptance Criteria
- [ ] Detect active debug sessions
- [ ] Fetch variable values at each step
- [ ] Sync walkthrough with debugger stepping
- [ ] Include runtime context in AI explanations
- [ ] Graceful fallback when debug unavailable

## Child Stories
- [ ] Implement Debug Bridge
- [ ] Create Variable Inspector
- [ ] Implement Debug Event Handler
- [ ] Add Runtime Context to AI
- [ ] Implement Debug Mode Toggle

## Priority
**P1 - Phase 2 Feature**"

echo "Created Epic E-004"

gh issue create \
  --repo $REPO \
  --title "Implement Debug Bridge" \
  --label "story,phase-2,debug,priority-p1" \
  --body "## User Story
As the system, I need to interface with VS Code's Debug Adapter Protocol to access runtime information.

## Acceptance Criteria
- [ ] Detect when debug session is active
- [ ] Get current stack frame
- [ ] Get local variables for current scope
- [ ] Evaluate expressions
- [ ] Get call stack

## Technical Notes
\`\`\`typescript
class DebugBridge implements IDebugBridge {
  isDebugging(): boolean {
    return vscode.debug.activeDebugSession !== undefined;
  }
  
  async getLocals(): Promise<VariableInfo[]> {
    const session = vscode.debug.activeDebugSession;
    if (!session) return [];
    
    const threads = await session.customRequest('threads');
    const stackTrace = await session.customRequest('stackTrace', {...});
    const scopes = await session.customRequest('scopes', { frameId });
    // Get variables from Local scope
  }
}
\`\`\`

## Definition of Done
- Can detect debug session
- Can fetch variables during debugging
- Works with C# debugger (OmniSharp)
- Works with TypeScript debugger (Node)

## Estimated Effort
**6-8 hours**"

echo "Created: Implement Debug Bridge"

gh issue create \
  --repo $REPO \
  --title "Create Variable Inspector" \
  --label "story,phase-2,debug,priority-p1" \
  --body "## User Story
As a developer, I want to see current variable values at each step so I understand the runtime state.

## Acceptance Criteria
- [ ] Display relevant variables for current step
- [ ] Show variable name, type, and value
- [ ] Truncate long values with expandable view
- [ ] Update when debugger steps
- [ ] Handle evaluation errors gracefully

## Definition of Done
- Variables display in panel during debug mode
- Values update on step
- Complex objects show expandable preview

## Estimated Effort
**4-6 hours**"

echo "Created: Create Variable Inspector"

gh issue create \
  --repo $REPO \
  --title "Implement Debug Event Handler" \
  --label "story,phase-2,debug,priority-p1" \
  --body "## User Story
As the system, I need to handle debug events so the walkthrough stays synchronized with the debugger.

## Acceptance Criteria
- [ ] Subscribe to debug step events
- [ ] Auto-advance walkthrough when debugger steps (configurable)
- [ ] Handle debug session start/end
- [ ] Update variables on each step

## Definition of Done
- Walkthrough syncs with debugger steps
- Variables update automatically
- Clean handling of session end

## Estimated Effort
**4-6 hours**"

echo "Created: Implement Debug Event Handler"

gh issue create \
  --repo $REPO \
  --title "Add Runtime Context to AI" \
  --label "story,phase-2,ai,debug,priority-p1" \
  --body "## User Story
As a developer, I want AI explanations to reference actual variable values so the explanation is more concrete.

## Acceptance Criteria
- [ ] Include variable values in AI context when in debug mode
- [ ] AI references specific values in explanations
- [ ] Context builder includes runtime state
- [ ] Explanations are more specific and helpful

## Definition of Done
- AI references actual values during debug
- Explanations are more concrete
- User feedback indicates improvement

## Estimated Effort
**3-4 hours**"

echo "Created: Add Runtime Context to AI"

gh issue create \
  --repo $REPO \
  --title "Implement Debug Mode Toggle" \
  --label "story,phase-2,debug,frontend,priority-p1" \
  --body "## User Story
As a developer, I want to toggle debug mode so I can control whether the walkthrough uses runtime information.

## Acceptance Criteria
- [ ] UI indicator shows current mode (Static/Debug)
- [ ] Auto-switch to debug mode when debugging starts (configurable)
- [ ] Manual toggle available
- [ ] Graceful transition between modes

## Definition of Done
- Mode indicator visible in panel
- Auto-switch works when configured
- Manual toggle works

## Estimated Effort
**2-3 hours**"

echo "Created: Implement Debug Mode Toggle"

# ============================================================================
# EPIC E-005: UI/UX Implementation
# ============================================================================

gh issue create \
  --repo $REPO \
  --title "[EPIC] E-005: UI/UX Implementation" \
  --label "epic,phase-1,frontend" \
  --body "## Description

Implement the user interface for the walkthrough panel, editor decorations, and all visual elements.

## Acceptance Criteria
- [ ] Webview panel implemented
- [ ] All UI sections render correctly
- [ ] Editor decorations show step markers
- [ ] Light and dark themes supported
- [ ] Responsive to panel size

## Child Stories
- [ ] Create Webview Panel
- [ ] Implement Step List Component
- [ ] Implement Explanation Component
- [ ] Implement Conversation Component
- [ ] Add Editor Decorations

## Priority
**P0 - Core MVP Feature**"

echo "Created Epic E-005"

gh issue create \
  --repo $REPO \
  --title "Create Webview Panel" \
  --label "story,phase-1,frontend,priority-p0" \
  --body "## User Story
As the system, I need a webview panel to display the walkthrough UI.

## Acceptance Criteria
- [ ] Panel opens beside editor (configurable)
- [ ] Panel title shows \"CodeWalk\"
- [ ] Panel receives state updates from extension
- [ ] Panel sends commands back to extension
- [ ] Loading state while generating

## Technical Notes
\`\`\`typescript
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
      }
    );
  }
}
\`\`\`

## Definition of Done
- Panel opens and closes correctly
- Message passing works both directions
- Panel persists during tab switches

## Estimated Effort
**4-6 hours**"

echo "Created: Create Webview Panel"

gh issue create \
  --repo $REPO \
  --title "Implement Step List Component" \
  --label "story,phase-1,frontend,priority-p0" \
  --body "## User Story
As a developer, I want to see a list of all steps so I can navigate and track progress.

## Acceptance Criteria
- [ ] Shows numbered list of steps
- [ ] Current step highlighted
- [ ] Clicking step navigates to it
- [ ] Shows step summary/title
- [ ] Collapsible for more space

## Definition of Done
- Step list renders all steps
- Current step visually distinct
- Click navigation works

## Estimated Effort
**3-4 hours**"

echo "Created: Implement Step List Component"

gh issue create \
  --repo $REPO \
  --title "Implement Explanation Component" \
  --label "story,phase-1,frontend,priority-p0" \
  --body "## User Story
As a developer, I want to see the AI explanation clearly formatted so I can understand the code.

## Acceptance Criteria
- [ ] Shows code snippet with syntax highlighting
- [ ] Shows AI explanation with markdown rendering
- [ ] Shows line numbers for reference
- [ ] \"Copy code\" button
- [ ] \"Go to code\" button to jump in editor

## Definition of Done
- Code displays with syntax highlighting
- Explanation renders markdown correctly
- Buttons work (copy, go to)

## Estimated Effort
**4-5 hours**"

echo "Created: Implement Explanation Component"

gh issue create \
  --repo $REPO \
  --title "Implement Conversation Component" \
  --label "story,phase-1,frontend,priority-p0" \
  --body "## User Story
As a developer, I want to see the Q&A conversation and ask new questions.

## Acceptance Criteria
- [ ] Shows conversation history
- [ ] User messages styled differently from AI
- [ ] Input field for new questions
- [ ] Submit on Enter or button click
- [ ] Loading indicator while waiting for response

## Definition of Done
- Conversation history displays
- Can submit questions
- Responses appear correctly

## Estimated Effort
**3-4 hours**"

echo "Created: Implement Conversation Component"

gh issue create \
  --repo $REPO \
  --title "Add Editor Decorations" \
  --label "story,phase-1,frontend,priority-p0" \
  --body "## User Story
As a developer, I want visual markers in the editor showing walkthrough steps so I can see where I am.

## Acceptance Criteria
- [ ] Current step highlighted with background color
- [ ] Step markers in gutter for all steps
- [ ] Visited steps have subtle indicator
- [ ] Decorations update on step change
- [ ] Decorations clear when walkthrough ends

## Technical Notes
\`\`\`typescript
class EditorDecorations {
  private currentStepDecoration = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255, 213, 79, 0.2)',
    borderLeft: '3px solid #FFC107',
    isWholeLine: true,
  });
  
  highlightStep(editor: vscode.TextEditor, step: WalkthroughStep): void {
    const range = new vscode.Range(step.startLine - 1, 0, step.endLine - 1, 0);
    editor.setDecorations(this.currentStepDecoration, [range]);
  }
}
\`\`\`

## Definition of Done
- Current step clearly highlighted
- Gutter markers visible
- Decorations clean up properly

## Estimated Effort
**3-4 hours**"

echo "Created: Add Editor Decorations"

# ============================================================================
# EPIC E-006: Testing & Quality
# ============================================================================

gh issue create \
  --repo $REPO \
  --title "[EPIC] E-006: Testing & Quality" \
  --label "epic,phase-1,phase-2" \
  --body "## Description

Implement comprehensive testing and quality assurance for the extension.

## Child Stories
- [ ] Set up unit testing framework
- [ ] Create unit tests for core modules
- [ ] Create integration tests
- [ ] Add error handling and logging

## Priority
**P1 - Quality Assurance**"

echo "Created Epic E-006"

gh issue create \
  --repo $REPO \
  --title "Set Up Unit Testing Framework" \
  --label "story,phase-1,infrastructure,priority-p1" \
  --body "## User Story
As a developer, I need a testing framework so I can write and run tests.

## Acceptance Criteria
- [ ] Vitest configured for unit tests
- [ ] Test script in package.json
- [ ] Sample test passing
- [ ] Coverage reporting configured
- [ ] Tests run in CI

## Definition of Done
- \`npm test\` runs tests
- Coverage report generated
- CI runs tests

## Estimated Effort
**2-3 hours**"

echo "Created: Set Up Unit Testing Framework"

gh issue create \
  --repo $REPO \
  --title "Create Unit Tests for Core Modules" \
  --label "story,phase-1,priority-p1" \
  --body "## User Story
As a developer, I need unit tests for core modules so I can refactor with confidence.

## Acceptance Criteria
- [ ] StateManager tests (80%+ coverage)
- [ ] ContextBuilder tests
- [ ] StepGenerator tests
- [ ] PromptTemplate tests
- [ ] Mock implementations for dependencies

## Definition of Done
- Core modules have 80%+ coverage
- Tests are meaningful, not just coverage padding
- Tests run fast (< 10 seconds total)

## Estimated Effort
**6-8 hours**"

echo "Created: Create Unit Tests for Core Modules"

gh issue create \
  --repo $REPO \
  --title "Create Integration Tests" \
  --label "story,phase-2,priority-p1" \
  --body "## User Story
As a developer, I need integration tests to verify the full walkthrough flow.

## Acceptance Criteria
- [ ] VS Code extension test runner configured
- [ ] Test: Start walkthrough from selection
- [ ] Test: Navigate between steps
- [ ] Test: Ask question and receive response

## Definition of Done
- Integration tests pass locally
- Tests run in CI (may need special runner)
- Key flows covered

## Estimated Effort
**6-8 hours**"

echo "Created: Create Integration Tests"

gh issue create \
  --repo $REPO \
  --title "Add Error Handling and Logging" \
  --label "story,phase-1,priority-p1" \
  --body "## User Story
As a developer, I need proper error handling and logging so I can diagnose issues.

## Acceptance Criteria
- [ ] Logger utility with levels (debug, info, warn, error)
- [ ] Errors caught and logged appropriately
- [ ] User-friendly error messages shown
- [ ] No unhandled promise rejections
- [ ] Output channel for extension logs

## Definition of Done
- All modules use logger
- Errors show helpful messages to users
- Logs help diagnose issues

## Estimated Effort
**3-4 hours**"

echo "Created: Add Error Handling and Logging"

# ============================================================================
# Documentation Issues
# ============================================================================

gh issue create \
  --repo $REPO \
  --title "Create CONTRIBUTING.md" \
  --label "documentation,priority-p1" \
  --body "## Description
Create contribution guidelines for external contributors.

## Content to Include
- [ ] How to set up development environment
- [ ] Code style guidelines
- [ ] PR process
- [ ] Issue templates
- [ ] Testing requirements

## Estimated Effort
**2-3 hours**"

echo "Created: Create CONTRIBUTING.md"

gh issue create \
  --repo $REPO \
  --title "Add Technical Specification to Repo" \
  --label "documentation,priority-p0" \
  --body "## Description
Add the technical specification document to the repository.

## Acceptance Criteria
- [ ] Create \`docs/\` directory
- [ ] Add \`TECHNICAL_SPEC.md\`
- [ ] Link from README

## Estimated Effort
**30 minutes**"

echo "Created: Add Technical Specification to Repo"

echo ""
echo "✅ All issues created successfully!"
echo ""
echo "📊 Summary:"
echo "   - 6 Epics"
echo "   - 27 Stories"
echo "   - 2 Documentation issues"
echo "   - Total: 35 issues"
echo ""
echo "🔗 View issues at: https://github.com/MCKRUZ/CodeWalk/issues"
