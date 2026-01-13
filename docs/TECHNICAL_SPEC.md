# CodeWalk: AI-Powered Interactive Code Walkthrough Extension

## Technical Specification Document - MVP

**Version:** 1.0  
**Date:** January 13, 2026  
**Author:** Matt (Azure Developer/Architect)  
**Status:** Draft

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision](#2-product-vision)
3. [MVP Scope Definition](#3-mvp-scope-definition)
4. [User Stories & Requirements](#4-user-stories--requirements)
5. [Technical Architecture](#5-technical-architecture)
6. [Data Models](#6-data-models)
7. [API Contracts](#7-api-contracts)
8. [UI/UX Specifications](#8-uiux-specifications)
9. [AI Integration](#9-ai-integration)
10. [Debug Integration](#10-debug-integration)
11. [Extension APIs & Hooks](#11-extension-apis--hooks)
12. [Security Considerations](#12-security-considerations)
13. [Testing Strategy](#13-testing-strategy)
14. [Development Phases](#14-development-phases)
15. [Technical Risks & Mitigations](#15-technical-risks--mitigations)
16. [Success Metrics](#16-success-metrics)
17. [Future Roadmap](#17-future-roadmap)
18. [Appendices](#18-appendices)

---

## 1. Executive Summary

### 1.1 Product Name
**CodeWalk** - AI-Powered Interactive Code Walkthrough Extension

### 1.2 Problem Statement
Developers frequently need to understand unfamiliar codebases, debug complex execution flows, or explain code to others. Current solutions fall into three inadequate categories:

1. **Manual documentation tools** (CodeTour): Require pre-authored content, no AI, no debug integration
2. **AI coding assistants** (Copilot Chat): Can explain code but lack step-by-step structure and debug sync
3. **Traditional debuggers**: Allow stepping through code but provide no explanations

### 1.3 Solution
CodeWalk combines all three paradigms into a single experience:
- **AI-generated** step-by-step explanations (no manual authoring)
- **Debug-synchronized** walkthrough with live variable values
- **Interactive Q&A** allowing users to ask questions at any step

### 1.4 Target Platforms (MVP)
- **Primary:** VS Code (larger market, faster iteration)
- **Secondary:** Visual Studio 2022+ (post-MVP)

### 1.5 MVP Timeline
- **Phase 1 (Static Walkthrough):** 4 weeks
- **Phase 2 (Debug Integration):** 4 weeks
- **Phase 3 (Polish & Beta):** 2 weeks
- **Total MVP:** 10 weeks

---

## 2. Product Vision

### 2.1 Vision Statement
*"Every developer should be able to point at any code and say 'walk me through this' - and get an intelligent, contextual, step-by-step explanation that adapts to their questions and shows them exactly what's happening at runtime."*

### 2.2 Target Users

| User Persona | Primary Use Case | Value Proposition |
|--------------|------------------|-------------------|
| Junior Developer | Learning unfamiliar codebase | Accelerated onboarding without bothering seniors |
| Senior Developer | Debugging complex flows | Runtime state visibility with AI insights |
| Tech Lead | Code review understanding | Quick comprehension of PR changes |
| Educator | Teaching programming concepts | Interactive, step-by-step demonstrations |
| Support Engineer | Production debugging | Understanding code paths during incidents |

### 2.3 Competitive Differentiation

```
                    Manual Authoring    AI-Powered    Debug Sync    Interactive Q&A
                    ─────────────────   ──────────    ──────────    ───────────────
CodeTour                  ✓                 ✗             ✗              ✗
Copilot Chat              ✗                 ✓             ✗              ✓
Traditional Debugger      ✗                 ✗             ✓              ✗
CodeWalk (Ours)           ✗                 ✓             ✓              ✓
```

---

## 3. MVP Scope Definition

### 3.1 In Scope (MVP)

| Feature | Description | Priority |
|---------|-------------|----------|
| Static Code Selection | User selects code range to walk through | P0 |
| AI Step Generation | Auto-generate logical steps from code | P0 |
| AI Explanations | Generate natural language explanations per step | P0 |
| Step Navigation | Next/Previous/Jump-to-step controls | P0 |
| Q&A at Each Step | Ask follow-up questions with conversation context | P0 |
| Side Panel UI | Rich walkthrough display panel | P0 |
| Debug Session Detection | Detect when debugging and offer enhanced mode | P1 |
| Live Variable Display | Show relevant variables at each step (debug mode) | P1 |
| Call Stack Context | Include call stack in AI context (debug mode) | P1 |
| Step Sync on Debug Step | Auto-advance walkthrough when debugger steps | P1 |
| C# Language Support | Full support for C# code analysis | P0 |
| TypeScript/JavaScript Support | Basic support for TS/JS | P1 |

### 3.2 Out of Scope (MVP)

| Feature | Reason | Target Release |
|---------|--------|----------------|
| Visual Studio support | Different extension model | v1.1 |
| Multi-language full support | Complexity; start with C#/TS | v1.1 |
| Tour recording/saving | Focus on AI-generated first | v1.2 |
| Team sharing features | Requires backend infrastructure | v1.2 |
| Custom AI model selection | Start with single provider | v1.2 |
| Copilot Chat integration | API maturity concerns | v1.1 |
| Code modification suggestions | Scope creep | v2.0 |

### 3.3 MVP Success Criteria

1. User can select code range and receive AI-generated walkthrough within 3 seconds
2. Walkthrough correctly identifies logical steps (80%+ user satisfaction)
3. Q&A maintains conversation context across 5+ turns
4. Debug mode shows accurate variable values at each step
5. Extension startup time < 2 seconds
6. No memory leaks during extended sessions

---

## 4. User Stories & Requirements

### 4.1 Epic: Static Walkthrough

#### US-001: Start Walkthrough from Selection
**As a** developer  
**I want to** select a code region and start a walkthrough  
**So that** I can understand what the code does step-by-step

**Acceptance Criteria:**
- [ ] Can select code via mouse drag or keyboard
- [ ] Context menu shows "Start CodeWalk" option
- [ ] Command palette includes "CodeWalk: Start Walkthrough" command
- [ ] Keyboard shortcut available (Ctrl+Shift+W / Cmd+Shift+W)
- [ ] Walkthrough panel opens within 3 seconds

#### US-002: View Step Explanation
**As a** developer  
**I want to** see an AI-generated explanation for each step  
**So that** I understand what the code does and why

**Acceptance Criteria:**
- [ ] Each step shows the relevant code snippet
- [ ] Each step shows a natural language explanation
- [ ] Explanation addresses "what" and "why"
- [ ] Code is syntax-highlighted in the panel
- [ ] Current step is highlighted in the editor

#### US-003: Navigate Between Steps
**As a** developer  
**I want to** move forward and backward through steps  
**So that** I can review at my own pace

**Acceptance Criteria:**
- [ ] "Next" button advances to next step
- [ ] "Previous" button returns to previous step
- [ ] Step counter shows "Step X of Y"
- [ ] Clicking step in list jumps to that step
- [ ] Editor scrolls to show current step's code

#### US-004: Ask Questions
**As a** developer  
**I want to** ask follow-up questions about the current step  
**So that** I can clarify things I don't understand

**Acceptance Criteria:**
- [ ] Text input field at bottom of panel
- [ ] Enter key or button submits question
- [ ] Response appears in panel within 5 seconds
- [ ] Conversation history maintained for session
- [ ] Can ask about code, variables, patterns, etc.

### 4.2 Epic: Debug Integration

#### US-005: Detect Debug Session
**As a** developer  
**I want** CodeWalk to detect when I'm debugging  
**So that** it can offer enhanced features

**Acceptance Criteria:**
- [ ] Extension detects active debug session
- [ ] Panel shows "Debug Mode" indicator when active
- [ ] Graceful fallback when debug unavailable

#### US-006: View Live Variables
**As a** developer debugging code  
**I want to** see current variable values at each step  
**So that** I understand the runtime state

**Acceptance Criteria:**
- [ ] Relevant variables shown for current step
- [ ] Values update when debugger steps
- [ ] Complex objects show expandable preview
- [ ] Type information displayed with values

#### US-007: Sync with Debugger Steps
**As a** developer debugging code  
**I want** the walkthrough to advance when I step in the debugger  
**So that** explanations stay synchronized with execution

**Acceptance Criteria:**
- [ ] Walkthrough advances on Step Over (F10)
- [ ] Walkthrough advances on Step Into (F11)
- [ ] User can disable auto-sync if desired
- [ ] Manual navigation still works during debug

### 4.3 Non-Functional Requirements

| ID | Requirement | Target | Measurement |
|----|-------------|--------|-------------|
| NFR-001 | Initial step generation | < 3 seconds | Time from selection to first step displayed |
| NFR-002 | Step navigation | < 500ms | Time between clicking Next and UI update |
| NFR-003 | Q&A response time | < 5 seconds | Time from question submit to response |
| NFR-004 | Memory usage | < 100MB | Extension memory footprint |
| NFR-005 | Extension activation | < 2 seconds | Time from VS Code start to ready |
| NFR-006 | Debug variable fetch | < 1 second | Time to retrieve and display variables |

---

## 5. Technical Architecture

### 5.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              VS CODE                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐   │
│  │   Editor Layer   │     │   Extension Host │     │   Debug Adapter  │   │
│  │                  │     │                  │     │   Protocol       │   │
│  │  • Selection     │     │  • Activation    │     │                  │   │
│  │  • Decorations   │     │  • Commands      │     │  • Step Events   │   │
│  │  • CodeLens      │     │  • Events        │     │  • Variables     │   │
│  │                  │     │                  │     │  • Call Stack    │   │
│  └────────┬─────────┘     └────────┬─────────┘     └────────┬─────────┘   │
│           │                        │                        │             │
│           └────────────────────────┼────────────────────────┘             │
│                                    │                                       │
│                         ┌──────────▼──────────┐                           │
│                         │                     │                           │
│                         │   CODEWALK CORE     │                           │
│                         │                     │                           │
│                         │  ┌───────────────┐  │                           │
│                         │  │ Walkthrough   │  │                           │
│                         │  │ Controller    │  │                           │
│                         │  └───────┬───────┘  │                           │
│                         │          │          │                           │
│                         │  ┌───────▼───────┐  │                           │
│                         │  │ State Manager │  │                           │
│                         │  └───────┬───────┘  │                           │
│                         │          │          │                           │
│                         └──────────┼──────────┘                           │
│                                    │                                       │
│  ┌─────────────────────────────────┼─────────────────────────────────────┐│
│  │                                 │                                      ││
│  │  ┌──────────────┐    ┌──────────▼─────────┐    ┌──────────────────┐  ││
│  │  │              │    │                    │    │                  │  ││
│  │  │ Code Analyzer│◄───┤  Context Builder   ├───►│  Debug Bridge    │  ││
│  │  │              │    │                    │    │                  │  ││
│  │  │ • AST Parse  │    │  • Code Context    │    │  • Variables     │  ││
│  │  │ • Symbols    │    │  • Runtime State   │    │  • Call Stack    │  ││
│  │  │ • Flow Graph │    │  • Conversation    │    │  • Breakpoints   │  ││
│  │  │              │    │                    │    │                  │  ││
│  │  └──────────────┘    └──────────┬─────────┘    └──────────────────┘  ││
│  │                                 │                                      ││
│  └─────────────────────────────────┼─────────────────────────────────────┘│
│                                    │                                       │
│  ┌─────────────────────────────────┼─────────────────────────────────────┐│
│  │                                 │              UI LAYER                ││
│  │  ┌──────────────┐    ┌──────────▼─────────┐    ┌──────────────────┐  ││
│  │  │              │    │                    │    │                  │  ││
│  │  │  Webview     │◄───┤  Panel Controller  ├───►│  Editor          │  ││
│  │  │  Panel       │    │                    │    │  Decorations     │  ││
│  │  │              │    │                    │    │                  │  ││
│  │  └──────────────┘    └────────────────────┘    └──────────────────┘  ││
│  │                                                                        ││
│  └────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTPS
                                    ▼
                    ┌───────────────────────────────┐
                    │                               │
                    │      AI SERVICE LAYER         │
                    │                               │
                    │  ┌─────────────────────────┐  │
                    │  │    AI Client Adapter    │  │
                    │  │                         │  │
                    │  │  • Azure OpenAI         │  │
                    │  │  • Anthropic Claude     │  │
                    │  │  • GitHub Copilot*      │  │
                    │  │                         │  │
                    │  └─────────────────────────┘  │
                    │                               │
                    └───────────────────────────────┘
```

### 5.2 Component Breakdown

#### 5.2.1 Walkthrough Controller
Central orchestrator managing walkthrough lifecycle.

**Responsibilities:**
- Initiate walkthrough from code selection
- Coordinate between analyzers, AI, and UI
- Manage step progression and state
- Handle user commands (next, previous, ask)

#### 5.2.2 State Manager
Single source of truth for walkthrough state.

**Responsibilities:**
- Maintain current walkthrough state
- Track conversation history
- Manage step collection and current position
- Handle state persistence (if needed)

#### 5.2.3 Code Analyzer
Static code analysis using Language Server Protocol.

**Responsibilities:**
- Parse code into AST
- Identify logical code blocks/steps
- Extract symbol information
- Build control flow graph (for step sequencing)

#### 5.2.4 Context Builder
Assembles rich context for AI prompts.

**Responsibilities:**
- Combine code, symbols, and runtime state
- Format context for AI consumption
- Manage token budgets
- Prioritize relevant information

#### 5.2.5 Debug Bridge
Interface with VS Code Debug Adapter Protocol.

**Responsibilities:**
- Monitor debug session lifecycle
- Fetch variable values on demand
- Retrieve call stack information
- Subscribe to debug step events

#### 5.2.6 AI Client Adapter
Abstraction over AI service providers.

**Responsibilities:**
- Manage API authentication
- Send prompts and receive responses
- Handle streaming responses
- Implement retry logic and error handling

#### 5.2.7 Panel Controller
Manages the webview-based UI panel.

**Responsibilities:**
- Create and manage webview panel
- Handle messages between extension and webview
- Coordinate UI updates with state changes
- Manage panel lifecycle

### 5.3 Technology Stack

| Component | Technology | Justification |
|-----------|------------|---------------|
| Extension Runtime | TypeScript | VS Code standard, type safety |
| Code Analysis | VS Code Language Server API | Access to language features |
| UI Panel | Webview (HTML/CSS/JS) | Rich, customizable UI |
| UI Framework | Preact or vanilla | Lightweight, fast |
| State Management | Custom (simple state pattern) | Minimal dependencies |
| AI Client | Anthropic SDK / Azure OpenAI SDK | Primary AI providers |
| Build Tool | esbuild | Fast bundling |
| Testing | Vitest + VS Code Extension Test | Fast unit tests, integration |

### 5.4 Directory Structure

```
codewalk/
├── .vscode/
│   ├── launch.json              # Debug configurations
│   └── tasks.json               # Build tasks
├── src/
│   ├── extension.ts             # Extension entry point
│   ├── core/
│   │   ├── walkthrough-controller.ts
│   │   ├── state-manager.ts
│   │   └── types.ts             # Core type definitions
│   ├── analysis/
│   │   ├── code-analyzer.ts
│   │   ├── step-generator.ts
│   │   └── languages/
│   │       ├── csharp-analyzer.ts
│   │       └── typescript-analyzer.ts
│   ├── debug/
│   │   ├── debug-bridge.ts
│   │   ├── variable-inspector.ts
│   │   └── debug-event-handler.ts
│   ├── ai/
│   │   ├── ai-client.ts         # Abstract client
│   │   ├── context-builder.ts
│   │   ├── prompt-templates.ts
│   │   └── providers/
│   │       ├── anthropic-provider.ts
│   │       └── azure-openai-provider.ts
│   ├── ui/
│   │   ├── panel-controller.ts
│   │   ├── editor-decorations.ts
│   │   └── webview/
│   │       ├── index.html
│   │       ├── styles.css
│   │       └── main.js
│   └── utils/
│       ├── logger.ts
│       ├── config.ts
│       └── telemetry.ts
├── test/
│   ├── unit/
│   │   ├── state-manager.test.ts
│   │   ├── step-generator.test.ts
│   │   └── context-builder.test.ts
│   ├── integration/
│   │   └── walkthrough-flow.test.ts
│   └── fixtures/
│       └── sample-code/
├── media/
│   ├── icon.png
│   └── walkthrough-icon.svg
├── package.json
├── tsconfig.json
├── esbuild.config.js
└── README.md
```

---

## 6. Data Models

### 6.1 Core Types

```typescript
// src/core/types.ts

/**
 * Represents a single step in a walkthrough
 */
export interface WalkthroughStep {
  id: string;
  stepNumber: number;
  
  // Code location
  filePath: string;
  startLine: number;
  endLine: number;
  startColumn: number;
  endColumn: number;
  
  // Code content
  codeSnippet: string;
  surroundingContext: string;
  
  // AI-generated content
  explanation: string;
  intent?: string;          // Why this code exists
  keyInsights?: string[];   // Notable patterns, gotchas
  
  // Debug state (populated during debug mode)
  variables?: VariableInfo[];
  callStack?: StackFrame[];
  
  // Metadata
  generatedAt: Date;
  analysisType: 'static' | 'runtime';
}

/**
 * Variable information from debugger
 */
export interface VariableInfo {
  name: string;
  value: string;
  type: string;
  scope: 'local' | 'parameter' | 'member' | 'global';
  isExpandable: boolean;
  children?: VariableInfo[];
  evaluateError?: string;
}

/**
 * Stack frame from debugger
 */
export interface StackFrame {
  id: number;
  name: string;
  filePath: string;
  line: number;
  column: number;
}

/**
 * Complete walkthrough state
 */
export interface WalkthroughState {
  id: string;
  status: WalkthroughStatus;
  
  // Source information
  sourceFile: string;
  selectionRange: SelectionRange;
  
  // Steps
  steps: WalkthroughStep[];
  currentStepIndex: number;
  
  // Mode
  mode: WalkthroughMode;
  debugSessionId?: string;
  
  // Conversation
  conversationHistory: ConversationTurn[];
  
  // Metadata
  createdAt: Date;
  lastUpdatedAt: Date;
}

export type WalkthroughStatus = 
  | 'initializing'
  | 'analyzing'
  | 'generating'
  | 'ready'
  | 'error';

export type WalkthroughMode = 'static' | 'debug';

export interface SelectionRange {
  startLine: number;
  endLine: number;
  startColumn: number;
  endColumn: number;
}

/**
 * Conversation turn for Q&A
 */
export interface ConversationTurn {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  stepId?: string;  // Which step this relates to
}
```

### 6.2 Analysis Types

```typescript
// src/analysis/types.ts

/**
 * Result of code analysis
 */
export interface CodeAnalysisResult {
  language: SupportedLanguage;
  blocks: CodeBlock[];
  symbols: SymbolInfo[];
  controlFlow: ControlFlowNode[];
}

export type SupportedLanguage = 'csharp' | 'typescript' | 'javascript';

/**
 * Logical code block identified during analysis
 */
export interface CodeBlock {
  id: string;
  type: CodeBlockType;
  range: SelectionRange;
  code: string;
  children?: CodeBlock[];
  
  // Semantic information
  symbolRefs: string[];      // Symbols referenced
  symbolDefs: string[];      // Symbols defined
  complexity: number;        // Cyclomatic complexity
}

export type CodeBlockType = 
  | 'function'
  | 'method'
  | 'class'
  | 'conditional'
  | 'loop'
  | 'try-catch'
  | 'statement'
  | 'expression'
  | 'assignment'
  | 'call';

/**
 * Symbol information
 */
export interface SymbolInfo {
  name: string;
  kind: SymbolKind;
  type?: string;
  range: SelectionRange;
  documentation?: string;
}

export type SymbolKind = 
  | 'variable'
  | 'parameter'
  | 'function'
  | 'method'
  | 'class'
  | 'interface'
  | 'property'
  | 'field';

/**
 * Control flow graph node
 */
export interface ControlFlowNode {
  id: string;
  blockId: string;
  type: 'entry' | 'exit' | 'statement' | 'branch' | 'merge';
  successors: string[];
  predecessors: string[];
}
```

### 6.3 AI Types

```typescript
// src/ai/types.ts

/**
 * Context sent to AI for step generation
 */
export interface StepGenerationContext {
  // Code context
  codeToAnalyze: string;
  language: SupportedLanguage;
  filePath: string;
  
  // Semantic context
  symbols: SymbolInfo[];
  controlFlow: ControlFlowNode[];
  
  // Optional: Surrounding context
  precedingCode?: string;
  followingCode?: string;
  fileContext?: string;
}

/**
 * Context sent to AI for explanation
 */
export interface ExplanationContext {
  // Current step
  step: WalkthroughStep;
  stepNumber: number;
  totalSteps: number;
  
  // Code context
  fullCode: string;
  language: SupportedLanguage;
  
  // Runtime context (debug mode)
  variables?: VariableInfo[];
  callStack?: StackFrame[];
  
  // Conversation context
  conversationHistory: ConversationTurn[];
  
  // User context
  userQuestion?: string;
}

/**
 * AI response for step generation
 */
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
  suggestedExplanation: string;
  stepType: 'critical' | 'supporting' | 'detail';
}

/**
 * AI response for explanation
 */
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
```

### 6.4 Configuration Types

```typescript
// src/utils/config.ts

/**
 * Extension configuration
 */
export interface CodeWalkConfig {
  // AI Provider
  aiProvider: 'anthropic' | 'azure-openai';
  apiKey?: string;           // Optional: can use VS Code secret storage
  azureEndpoint?: string;    // For Azure OpenAI
  azureDeployment?: string;
  
  // Behavior
  autoStartDebugMode: boolean;
  autoAdvanceOnStep: boolean;
  maxStepsPerWalkthrough: number;
  
  // UI
  panelPosition: 'beside' | 'below';
  showInlineDecorations: boolean;
  theme: 'auto' | 'light' | 'dark';
  
  // AI
  explanationDetail: 'brief' | 'standard' | 'detailed';
  includeCodePatterns: boolean;
  includePotentialIssues: boolean;
  
  // Telemetry
  enableTelemetry: boolean;
}

export const DEFAULT_CONFIG: CodeWalkConfig = {
  aiProvider: 'anthropic',
  autoStartDebugMode: true,
  autoAdvanceOnStep: true,
  maxStepsPerWalkthrough: 50,
  panelPosition: 'beside',
  showInlineDecorations: true,
  theme: 'auto',
  explanationDetail: 'standard',
  includeCodePatterns: true,
  includePotentialIssues: true,
  enableTelemetry: true,
};
```

---

## 7. API Contracts

### 7.1 Extension Commands

```json
// package.json contributions
{
  "contributes": {
    "commands": [
      {
        "command": "codewalk.start",
        "title": "Start CodeWalk",
        "category": "CodeWalk",
        "icon": "$(play)"
      },
      {
        "command": "codewalk.startFromSelection",
        "title": "Walk Through Selected Code",
        "category": "CodeWalk"
      },
      {
        "command": "codewalk.nextStep",
        "title": "Next Step",
        "category": "CodeWalk",
        "icon": "$(arrow-right)"
      },
      {
        "command": "codewalk.previousStep",
        "title": "Previous Step",
        "category": "CodeWalk",
        "icon": "$(arrow-left)"
      },
      {
        "command": "codewalk.askQuestion",
        "title": "Ask About Current Step",
        "category": "CodeWalk"
      },
      {
        "command": "codewalk.stop",
        "title": "End Walkthrough",
        "category": "CodeWalk",
        "icon": "$(stop)"
      },
      {
        "command": "codewalk.toggleDebugMode",
        "title": "Toggle Debug Mode",
        "category": "CodeWalk"
      }
    ],
    "menus": {
      "editor/context": [
        {
          "command": "codewalk.startFromSelection",
          "group": "codewalk",
          "when": "editorHasSelection"
        }
      ]
    },
    "keybindings": [
      {
        "command": "codewalk.startFromSelection",
        "key": "ctrl+shift+w",
        "mac": "cmd+shift+w",
        "when": "editorHasSelection"
      },
      {
        "command": "codewalk.nextStep",
        "key": "alt+right",
        "when": "codewalk.isActive"
      },
      {
        "command": "codewalk.previousStep",
        "key": "alt+left",
        "when": "codewalk.isActive"
      }
    ]
  }
}
```

### 7.2 Webview Message Protocol

```typescript
// Messages from Extension to Webview
type ExtensionToWebviewMessage = 
  | { type: 'init'; state: WalkthroughState }
  | { type: 'stepUpdated'; step: WalkthroughStep; index: number; total: number }
  | { type: 'variablesUpdated'; variables: VariableInfo[] }
  | { type: 'conversationUpdated'; turns: ConversationTurn[] }
  | { type: 'loading'; message: string }
  | { type: 'error'; error: string }
  | { type: 'debugModeChanged'; isDebugMode: boolean };

// Messages from Webview to Extension
type WebviewToExtensionMessage = 
  | { type: 'ready' }
  | { type: 'nextStep' }
  | { type: 'previousStep' }
  | { type: 'goToStep'; stepIndex: number }
  | { type: 'askQuestion'; question: string }
  | { type: 'expandVariable'; variablePath: string }
  | { type: 'stopWalkthrough' }
  | { type: 'copyCode'; code: string };
```

### 7.3 AI Service Interface

```typescript
// src/ai/ai-client.ts

/**
 * Abstract interface for AI providers
 */
export interface IAIClient {
  /**
   * Generate steps from code
   */
  generateSteps(context: StepGenerationContext): Promise<StepGenerationResponse>;
  
  /**
   * Generate explanation for a step
   */
  generateExplanation(context: ExplanationContext): Promise<ExplanationResponse>;
  
  /**
   * Answer a user question
   */
  answerQuestion(
    question: string,
    context: ExplanationContext
  ): Promise<ExplanationResponse>;
  
  /**
   * Check if service is available
   */
  healthCheck(): Promise<boolean>;
  
  /**
   * Get current token usage
   */
  getTokenUsage(): TokenUsage;
}

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  estimatedCost: number;
}
```

### 7.4 Debug Bridge Interface

```typescript
// src/debug/debug-bridge.ts

/**
 * Interface for debug integration
 */
export interface IDebugBridge {
  /**
   * Check if a debug session is active
   */
  isDebugging(): boolean;
  
  /**
   * Get current debug session
   */
  getActiveSession(): vscode.DebugSession | undefined;
  
  /**
   * Get variables for current scope
   */
  getLocals(): Promise<VariableInfo[]>;
  
  /**
   * Get specific variable value
   */
  evaluateExpression(expression: string): Promise<VariableInfo>;
  
  /**
   * Get current call stack
   */
  getCallStack(): Promise<StackFrame[]>;
  
  /**
   * Get current source location
   */
  getCurrentLocation(): Promise<SourceLocation | undefined>;
  
  /**
   * Subscribe to debug step events
   */
  onDidStep(callback: (location: SourceLocation) => void): vscode.Disposable;
  
  /**
   * Subscribe to debug session end
   */
  onDidEndSession(callback: () => void): vscode.Disposable;
}

export interface SourceLocation {
  filePath: string;
  line: number;
  column: number;
}
```

---

## 8. UI/UX Specifications

### 8.1 Panel Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  HEADER                                                     │ │
│ │  ┌─────────────────────────────────────────────────────┐   │ │
│ │  │ 🚶 CodeWalk    [Static/Debug Mode]    Step 3 of 8   │   │ │
│ │  │                                           [×] Close │   │ │
│ │  └─────────────────────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  STEP LIST (collapsible)                                    │ │
│ │  ┌─────────────────────────────────────────────────────┐   │ │
│ │  │ ○ 1. Variable initialization                        │   │ │
│ │  │ ○ 2. Input validation                               │   │ │
│ │  │ ● 3. Database query ← Current                       │   │ │
│ │  │ ○ 4. Result processing                              │   │ │
│ │  │ ○ 5. Response formatting                            │   │ │
│ │  └─────────────────────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  CODE BLOCK                                                 │ │
│ │  ┌─────────────────────────────────────────────────────┐   │ │
│ │  │  📍 Line 47-49                          [Copy] [Go] │   │ │
│ │  │  ─────────────────────────────────────────────────  │   │ │
│ │  │  ```csharp                                          │   │ │
│ │  │  var customer = await _customerRepo                 │   │ │
│ │  │      .GetByIdAsync(request.CustomerId);             │   │ │
│ │  │  ```                                                │   │ │
│ │  └─────────────────────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  EXPLANATION                                                │ │
│ │  ┌─────────────────────────────────────────────────────┐   │ │
│ │  │                                                     │   │ │
│ │  │  This line fetches the customer record from the     │   │ │
│ │  │  database using the ID from the incoming request.   │   │ │
│ │  │                                                     │   │ │
│ │  │  **What's happening:**                              │   │ │
│ │  │  The `_customerRepo` service uses the Repository    │   │ │
│ │  │  pattern to abstract database access. The `await`   │   │ │
│ │  │  keyword means this is asynchronous - the thread    │   │ │
│ │  │  is released while waiting for the database.        │   │ │
│ │  │                                                     │   │ │
│ │  │  **Why it matters:**                                │   │ │
│ │  │  This is the first data validation point. If no     │   │ │
│ │  │  customer exists, the next line throws an           │   │ │
│ │  │  exception to prevent processing invalid orders.    │   │ │
│ │  │                                                     │   │ │
│ │  └─────────────────────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  VARIABLES (Debug Mode Only)                                │ │
│ │  ┌─────────────────────────────────────────────────────┐   │ │
│ │  │  📊 Current Values                                  │   │ │
│ │  │  ─────────────────────────────────────────────────  │   │ │
│ │  │  request.CustomerId  "cust-8847"         string     │   │ │
│ │  │  ▶ _customerRepo     SqlCustomerRepo...  ICustomer  │   │ │
│ │  │  customer            null (not assigned) Customer?  │   │ │
│ │  └─────────────────────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  CONVERSATION                                               │ │
│ │  ┌─────────────────────────────────────────────────────┐   │ │
│ │  │  👤 What happens if the customer isn't found?       │   │ │
│ │  │  ─────────────────────────────────────────────────  │   │ │
│ │  │  🤖 If `GetByIdAsync` returns null, the next line  │   │ │
│ │  │  (line 50) throws a `CustomerNotFoundException`.    │   │ │
│ │  │  This prevents the order from being processed...    │   │ │
│ │  └─────────────────────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  INPUT                                                      │ │
│ │  ┌─────────────────────────────────────────────────────┐   │ │
│ │  │  💬 Ask a question about this code...          [→]  │   │ │
│ │  └─────────────────────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │  NAVIGATION                                                 │ │
│ │  ┌─────────────────────────────────────────────────────┐   │ │
│ │  │      [← Previous]    [Step Into]    [Next →]        │   │ │
│ │  │                                                     │   │ │
│ │  │                 [ End Walkthrough ]                 │   │ │
│ │  └─────────────────────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2 Editor Decorations

```typescript
// Current step highlight in editor
const currentStepDecoration = vscode.window.createTextEditorDecorationType({
  backgroundColor: 'rgba(255, 213, 79, 0.2)',  // Soft yellow
  borderLeft: '3px solid #FFC107',
  isWholeLine: true,
});

// All steps marker (gutter icon)
const stepMarkerDecoration = vscode.window.createTextEditorDecorationType({
  gutterIconPath: 'path/to/step-marker.svg',
  gutterIconSize: 'contain',
});

// Visited step (dimmed)
const visitedStepDecoration = vscode.window.createTextEditorDecorationType({
  backgroundColor: 'rgba(76, 175, 80, 0.1)',  // Very soft green
});
```

### 8.3 Color Scheme

| Element | Light Theme | Dark Theme | Purpose |
|---------|-------------|------------|---------|
| Current Step Background | `#FFF8E1` | `#3E2723` | Highlight active step |
| Current Step Border | `#FFC107` | `#FFB300` | Visual indicator |
| Code Block Background | `#F5F5F5` | `#1E1E1E` | Code readability |
| Variable Value | `#1976D2` | `#64B5F6` | String values |
| Variable Type | `#7B7B7B` | `#9E9E9E` | Type hints |
| User Message | `#E3F2FD` | `#1A237E` | User input |
| AI Response | `#FFFFFF` | `#2D2D2D` | AI output |

### 8.4 Responsive Behavior

| Panel Width | Behavior |
|-------------|----------|
| < 300px | Collapse step list, stack sections vertically |
| 300-500px | Show step list collapsed by default |
| > 500px | Show step list expanded |

---

## 9. AI Integration

### 9.1 Prompt Templates

#### 9.1.1 Step Generation Prompt

```typescript
export const STEP_GENERATION_PROMPT = `
You are an expert code instructor analyzing code to create a step-by-step walkthrough.

## Your Task
Analyze the provided code and identify logical steps that would help a developer understand the code flow.

## Input
- Language: {{language}}
- File: {{filePath}}
- Code:
\`\`\`{{language}}
{{code}}
\`\`\`

## Symbol Information
{{symbolsJson}}

## Instructions
1. Identify 3-15 logical steps (fewer for simple code, more for complex)
2. Each step should represent a meaningful unit of work
3. Group related statements that work together
4. Prioritize: function calls, conditionals, loops, assignments with side effects
5. Don't create steps for trivial code (simple variable declarations, closing braces)

## Output Format
Return a JSON array of steps:
\`\`\`json
{
  "steps": [
    {
      "startLine": 10,
      "endLine": 12,
      "summary": "Brief 5-10 word description",
      "stepType": "critical|supporting|detail"
    }
  ]
}
\`\`\`

Only return the JSON, no other text.
`;
```

#### 9.1.2 Explanation Prompt

```typescript
export const EXPLANATION_PROMPT = `
You are an expert code instructor explaining code to a developer.

## Context
- Language: {{language}}
- File: {{filePath}}
- Step {{stepNumber}} of {{totalSteps}}

## The Code (Full Context)
\`\`\`{{language}}
{{fullCode}}
\`\`\`

## Current Step (Lines {{startLine}}-{{endLine}})
\`\`\`{{language}}
{{stepCode}}
\`\`\`

{{#if variables}}
## Runtime Values (Debug Mode)
{{#each variables}}
- {{name}} ({{type}}): {{value}}
{{/each}}
{{/if}}

{{#if callStack}}
## Call Stack
{{#each callStack}}
- {{name}} at {{filePath}}:{{line}}
{{/each}}
{{/if}}

{{#if conversationHistory}}
## Previous Conversation
{{#each conversationHistory}}
{{role}}: {{content}}
{{/each}}
{{/if}}

## Instructions
Explain this code step in a way that helps the developer understand:
1. **What** this code does (the mechanics)
2. **Why** it exists (the purpose/intent)
3. **How** it relates to the surrounding code

Guidelines:
- Be concise but thorough (2-4 paragraphs)
- Use the actual variable names and values shown
- Point out notable patterns or potential issues
- If this is debug mode, reference the runtime values
- Don't be condescending; assume the reader is a developer

## Output Format
Return a JSON object:
\`\`\`json
{
  "explanation": "Your explanation here...",
  "intent": "Optional: one-sentence purpose",
  "keyInsights": ["Optional: 1-3 notable observations"],
  "suggestedQuestions": ["Optional: 2-3 questions user might ask"]
}
\`\`\`
`;
```

#### 9.1.3 Q&A Prompt

```typescript
export const QA_PROMPT = `
You are an expert code instructor answering a developer's question.

## Context
- Language: {{language}}
- Currently viewing step {{stepNumber}} of {{totalSteps}}

## Current Step Code
\`\`\`{{language}}
{{stepCode}}
\`\`\`

## Full Code Context
\`\`\`{{language}}
{{fullCode}}
\`\`\`

{{#if variables}}
## Current Runtime Values
{{#each variables}}
- {{name}} ({{type}}): {{value}}
{{/each}}
{{/if}}

## Conversation History
{{#each conversationHistory}}
{{role}}: {{content}}
{{/each}}

## User's Question
{{question}}

## Instructions
Answer the question directly and helpfully:
- Reference specific line numbers when relevant
- Use the actual variable names and values
- If the question is unclear, ask for clarification
- If you don't know, say so honestly
- Keep the answer focused and concise

Respond conversationally, not in JSON format.
`;
```

### 9.2 Context Management

```typescript
// src/ai/context-builder.ts

export class ContextBuilder {
  private readonly maxTokens: number = 8000;
  private readonly reservedForResponse: number = 1000;
  
  buildStepContext(
    state: WalkthroughState,
    step: WalkthroughStep,
    options: ContextOptions
  ): ExplanationContext {
    // Calculate token budget
    const budget = this.maxTokens - this.reservedForResponse;
    let usedTokens = 0;
    
    // Priority 1: Current step code (always include)
    const stepCode = step.codeSnippet;
    usedTokens += this.estimateTokens(stepCode);
    
    // Priority 2: Surrounding context (if budget allows)
    let surroundingCode = '';
    if (usedTokens + this.estimateTokens(step.surroundingContext) < budget * 0.5) {
      surroundingCode = step.surroundingContext;
      usedTokens += this.estimateTokens(surroundingCode);
    }
    
    // Priority 3: Variables (debug mode, if budget allows)
    let variables: VariableInfo[] = [];
    if (options.includeVariables && step.variables) {
      const varJson = JSON.stringify(step.variables);
      if (usedTokens + this.estimateTokens(varJson) < budget * 0.7) {
        variables = step.variables;
        usedTokens += this.estimateTokens(varJson);
      }
    }
    
    // Priority 4: Conversation history (recent, if budget allows)
    let conversationHistory: ConversationTurn[] = [];
    if (options.includeConversation && state.conversationHistory.length > 0) {
      // Include most recent turns that fit
      const recentTurns = [...state.conversationHistory].reverse();
      for (const turn of recentTurns) {
        const turnTokens = this.estimateTokens(turn.content);
        if (usedTokens + turnTokens < budget * 0.9) {
          conversationHistory.unshift(turn);
          usedTokens += turnTokens;
        } else {
          break;
        }
      }
    }
    
    return {
      step,
      stepNumber: state.currentStepIndex + 1,
      totalSteps: state.steps.length,
      fullCode: surroundingCode || stepCode,
      language: this.detectLanguage(state.sourceFile),
      variables,
      callStack: step.callStack,
      conversationHistory,
    };
  }
  
  private estimateTokens(text: string): number {
    // Rough estimation: ~4 characters per token
    return Math.ceil(text.length / 4);
  }
}
```

### 9.3 AI Client Implementation (Anthropic)

```typescript
// src/ai/providers/anthropic-provider.ts

import Anthropic from '@anthropic-ai/sdk';

export class AnthropicProvider implements IAIClient {
  private client: Anthropic;
  private tokenUsage: TokenUsage = { inputTokens: 0, outputTokens: 0, estimatedCost: 0 };
  
  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }
  
  async generateSteps(context: StepGenerationContext): Promise<StepGenerationResponse> {
    const prompt = this.buildStepGenerationPrompt(context);
    
    const startTime = Date.now();
    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    });
    
    // Update token usage
    this.tokenUsage.inputTokens += response.usage.input_tokens;
    this.tokenUsage.outputTokens += response.usage.output_tokens;
    
    // Parse response
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }
    
    const parsed = this.parseJsonResponse<{ steps: GeneratedStep[] }>(content.text);
    
    return {
      steps: parsed.steps,
      metadata: {
        modelUsed: 'claude-sonnet-4-20250514',
        tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
        generationTime: Date.now() - startTime,
      },
    };
  }
  
  async generateExplanation(context: ExplanationContext): Promise<ExplanationResponse> {
    const prompt = this.buildExplanationPrompt(context);
    
    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });
    
    this.tokenUsage.inputTokens += response.usage.input_tokens;
    this.tokenUsage.outputTokens += response.usage.output_tokens;
    
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }
    
    const parsed = this.parseJsonResponse<ExplanationResponse>(content.text);
    
    return {
      ...parsed,
      metadata: {
        modelUsed: 'claude-sonnet-4-20250514',
        tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
      },
    };
  }
  
  async answerQuestion(
    question: string,
    context: ExplanationContext
  ): Promise<ExplanationResponse> {
    const prompt = this.buildQAPrompt(question, context);
    
    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });
    
    this.tokenUsage.inputTokens += response.usage.input_tokens;
    this.tokenUsage.outputTokens += response.usage.output_tokens;
    
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }
    
    return {
      explanation: content.text,
      metadata: {
        modelUsed: 'claude-sonnet-4-20250514',
        tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
      },
    };
  }
  
  private parseJsonResponse<T>(text: string): T {
    // Extract JSON from markdown code blocks if present
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    const jsonStr = jsonMatch ? jsonMatch[1].trim() : text.trim();
    return JSON.parse(jsonStr);
  }
  
  // ... prompt building methods
}
```

---

## 10. Debug Integration

### 10.1 Debug Bridge Implementation

```typescript
// src/debug/debug-bridge.ts

import * as vscode from 'vscode';

export class DebugBridge implements IDebugBridge {
  private stepListeners: Set<(location: SourceLocation) => void> = new Set();
  private endSessionListeners: Set<() => void> = new Set();
  
  constructor() {
    // Subscribe to debug events
    vscode.debug.onDidChangeActiveStackItem(async (stackItem) => {
      if (stackItem) {
        const location = await this.getCurrentLocation();
        if (location) {
          this.stepListeners.forEach(listener => listener(location));
        }
      }
    });
    
    vscode.debug.onDidTerminateDebugSession(() => {
      this.endSessionListeners.forEach(listener => listener());
    });
  }
  
  isDebugging(): boolean {
    return vscode.debug.activeDebugSession !== undefined;
  }
  
  getActiveSession(): vscode.DebugSession | undefined {
    return vscode.debug.activeDebugSession;
  }
  
  async getLocals(): Promise<VariableInfo[]> {
    const session = this.getActiveSession();
    if (!session) return [];
    
    try {
      // Get the current thread and stack frame
      const threads = await session.customRequest('threads');
      const threadId = threads.threads[0]?.id;
      if (!threadId) return [];
      
      const stackTrace = await session.customRequest('stackTrace', {
        threadId,
        startFrame: 0,
        levels: 1,
      });
      
      const frameId = stackTrace.stackFrames[0]?.id;
      if (!frameId) return [];
      
      // Get scopes for the frame
      const scopes = await session.customRequest('scopes', { frameId });
      
      const variables: VariableInfo[] = [];
      
      for (const scope of scopes.scopes) {
        if (scope.name === 'Locals' || scope.name === 'Arguments') {
          const varsResponse = await session.customRequest('variables', {
            variablesReference: scope.variablesReference,
          });
          
          for (const v of varsResponse.variables) {
            variables.push({
              name: v.name,
              value: this.truncateValue(v.value, 100),
              type: v.type || 'unknown',
              scope: scope.name === 'Arguments' ? 'parameter' : 'local',
              isExpandable: v.variablesReference > 0,
            });
          }
        }
      }
      
      return variables;
    } catch (error) {
      console.error('Failed to get locals:', error);
      return [];
    }
  }
  
  async evaluateExpression(expression: string): Promise<VariableInfo> {
    const session = this.getActiveSession();
    if (!session) {
      return {
        name: expression,
        value: '<no debug session>',
        type: 'unknown',
        scope: 'local',
        isExpandable: false,
        evaluateError: 'No active debug session',
      };
    }
    
    try {
      const stackTrace = await this.getStackTraceInternal(session);
      const frameId = stackTrace?.stackFrames[0]?.id;
      
      const result = await session.customRequest('evaluate', {
        expression,
        frameId,
        context: 'watch',
      });
      
      return {
        name: expression,
        value: this.truncateValue(result.result, 100),
        type: result.type || 'unknown',
        scope: 'local',
        isExpandable: result.variablesReference > 0,
      };
    } catch (error: any) {
      return {
        name: expression,
        value: '<evaluation failed>',
        type: 'unknown',
        scope: 'local',
        isExpandable: false,
        evaluateError: error.message,
      };
    }
  }
  
  async getCallStack(): Promise<StackFrame[]> {
    const session = this.getActiveSession();
    if (!session) return [];
    
    try {
      const threads = await session.customRequest('threads');
      const threadId = threads.threads[0]?.id;
      if (!threadId) return [];
      
      const stackTrace = await session.customRequest('stackTrace', {
        threadId,
        startFrame: 0,
        levels: 10,
      });
      
      return stackTrace.stackFrames.map((frame: any) => ({
        id: frame.id,
        name: frame.name,
        filePath: frame.source?.path || '<unknown>',
        line: frame.line,
        column: frame.column,
      }));
    } catch (error) {
      console.error('Failed to get call stack:', error);
      return [];
    }
  }
  
  async getCurrentLocation(): Promise<SourceLocation | undefined> {
    const session = this.getActiveSession();
    if (!session) return undefined;
    
    try {
      const threads = await session.customRequest('threads');
      const threadId = threads.threads[0]?.id;
      if (!threadId) return undefined;
      
      const stackTrace = await session.customRequest('stackTrace', {
        threadId,
        startFrame: 0,
        levels: 1,
      });
      
      const frame = stackTrace.stackFrames[0];
      if (!frame?.source?.path) return undefined;
      
      return {
        filePath: frame.source.path,
        line: frame.line,
        column: frame.column,
      };
    } catch (error) {
      console.error('Failed to get current location:', error);
      return undefined;
    }
  }
  
  onDidStep(callback: (location: SourceLocation) => void): vscode.Disposable {
    this.stepListeners.add(callback);
    return new vscode.Disposable(() => {
      this.stepListeners.delete(callback);
    });
  }
  
  onDidEndSession(callback: () => void): vscode.Disposable {
    this.endSessionListeners.add(callback);
    return new vscode.Disposable(() => {
      this.endSessionListeners.delete(callback);
    });
  }
  
  private truncateValue(value: string, maxLength: number): string {
    if (value.length <= maxLength) return value;
    return value.substring(0, maxLength - 3) + '...';
  }
}
```

### 10.2 Debug Event Handler

```typescript
// src/debug/debug-event-handler.ts

export class DebugEventHandler {
  private walkthroughController: WalkthroughController;
  private debugBridge: IDebugBridge;
  private disposables: vscode.Disposable[] = [];
  
  constructor(
    walkthroughController: WalkthroughController,
    debugBridge: IDebugBridge
  ) {
    this.walkthroughController = walkthroughController;
    this.debugBridge = debugBridge;
    
    this.setupEventHandlers();
  }
  
  private setupEventHandlers(): void {
    // Handle debug step events
    this.disposables.push(
      this.debugBridge.onDidStep(async (location) => {
        const state = this.walkthroughController.getState();
        if (!state || state.mode !== 'debug') return;
        
        // Check if we should auto-advance
        const config = vscode.workspace.getConfiguration('codewalk');
        if (!config.get<boolean>('autoAdvanceOnStep', true)) return;
        
        // Find step that matches current location
        const matchingStepIndex = state.steps.findIndex(step => 
          step.filePath === location.filePath &&
          location.line >= step.startLine &&
          location.line <= step.endLine
        );
        
        if (matchingStepIndex !== -1 && matchingStepIndex !== state.currentStepIndex) {
          await this.walkthroughController.goToStep(matchingStepIndex);
        }
        
        // Update variables for current step
        await this.updateVariablesForCurrentStep();
      })
    );
    
    // Handle debug session end
    this.disposables.push(
      this.debugBridge.onDidEndSession(() => {
        this.walkthroughController.exitDebugMode();
      })
    );
    
    // Handle debug session start
    this.disposables.push(
      vscode.debug.onDidStartDebugSession(() => {
        const state = this.walkthroughController.getState();
        if (state && state.status === 'ready') {
          // Offer to switch to debug mode
          this.promptDebugMode();
        }
      })
    );
  }
  
  private async updateVariablesForCurrentStep(): Promise<void> {
    const variables = await this.debugBridge.getLocals();
    const callStack = await this.debugBridge.getCallStack();
    
    await this.walkthroughController.updateStepRuntimeState(variables, callStack);
  }
  
  private async promptDebugMode(): Promise<void> {
    const config = vscode.workspace.getConfiguration('codewalk');
    if (config.get<boolean>('autoStartDebugMode', true)) {
      await this.walkthroughController.enterDebugMode();
      return;
    }
    
    const result = await vscode.window.showInformationMessage(
      'Debug session detected. Enable CodeWalk debug mode for live variable values?',
      'Yes',
      'No',
      "Don't ask again"
    );
    
    if (result === 'Yes') {
      await this.walkthroughController.enterDebugMode();
    } else if (result === "Don't ask again") {
      await config.update('autoStartDebugMode', false, vscode.ConfigurationTarget.Global);
    }
  }
  
  dispose(): void {
    this.disposables.forEach(d => d.dispose());
  }
}
```

---

## 11. Extension APIs & Hooks

### 11.1 Package.json Configuration

```json
{
  "name": "codewalk",
  "displayName": "CodeWalk",
  "description": "AI-powered interactive code walkthrough with debug integration",
  "version": "0.1.0",
  "publisher": "your-publisher",
  "engines": {
    "vscode": "^1.85.0"
  },
  "categories": [
    "Debuggers",
    "Education",
    "Other"
  ],
  "keywords": [
    "code walkthrough",
    "AI",
    "debugging",
    "code explanation",
    "learning"
  ],
  "activationEvents": [
    "onCommand:codewalk.start",
    "onCommand:codewalk.startFromSelection",
    "onDebug"
  ],
  "main": "./dist/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "codewalk.startFromSelection",
        "title": "Walk Through Selected Code",
        "category": "CodeWalk",
        "icon": "$(play)"
      },
      {
        "command": "codewalk.nextStep",
        "title": "Next Step",
        "category": "CodeWalk"
      },
      {
        "command": "codewalk.previousStep",
        "title": "Previous Step",
        "category": "CodeWalk"
      },
      {
        "command": "codewalk.stop",
        "title": "End Walkthrough",
        "category": "CodeWalk"
      }
    ],
    "menus": {
      "editor/context": [
        {
          "command": "codewalk.startFromSelection",
          "group": "codewalk@1",
          "when": "editorHasSelection && editorLangId =~ /^(csharp|typescript|javascript)$/"
        }
      ],
      "editor/title": [
        {
          "command": "codewalk.startFromSelection",
          "group": "navigation",
          "when": "editorHasSelection && codewalk.supported"
        }
      ]
    },
    "keybindings": [
      {
        "command": "codewalk.startFromSelection",
        "key": "ctrl+shift+w",
        "mac": "cmd+shift+w",
        "when": "editorHasSelection"
      },
      {
        "command": "codewalk.nextStep",
        "key": "alt+right",
        "when": "codewalk.isActive"
      },
      {
        "command": "codewalk.previousStep",
        "key": "alt+left",
        "when": "codewalk.isActive"
      },
      {
        "command": "codewalk.stop",
        "key": "escape",
        "when": "codewalk.isActive"
      }
    ],
    "configuration": {
      "title": "CodeWalk",
      "properties": {
        "codewalk.aiProvider": {
          "type": "string",
          "enum": ["anthropic", "azure-openai"],
          "default": "anthropic",
          "description": "AI provider for code explanations"
        },
        "codewalk.anthropicApiKey": {
          "type": "string",
          "default": "",
          "description": "Anthropic API key (stored securely)"
        },
        "codewalk.azureEndpoint": {
          "type": "string",
          "default": "",
          "description": "Azure OpenAI endpoint URL"
        },
        "codewalk.azureDeployment": {
          "type": "string",
          "default": "",
          "description": "Azure OpenAI deployment name"
        },
        "codewalk.autoStartDebugMode": {
          "type": "boolean",
          "default": true,
          "description": "Automatically enable debug mode when debugging"
        },
        "codewalk.autoAdvanceOnStep": {
          "type": "boolean",
          "default": true,
          "description": "Auto-advance walkthrough when debugger steps"
        },
        "codewalk.explanationDetail": {
          "type": "string",
          "enum": ["brief", "standard", "detailed"],
          "default": "standard",
          "description": "Level of detail in explanations"
        },
        "codewalk.panelPosition": {
          "type": "string",
          "enum": ["beside", "below"],
          "default": "beside",
          "description": "Position of the walkthrough panel"
        },
        "codewalk.showInlineDecorations": {
          "type": "boolean",
          "default": true,
          "description": "Show step markers in the editor gutter"
        }
      }
    },
    "viewsContainers": {
      "activitybar": [
        {
          "id": "codewalk",
          "title": "CodeWalk",
          "icon": "media/codewalk-icon.svg"
        }
      ]
    },
    "views": {
      "codewalk": [
        {
          "id": "codewalk.history",
          "name": "Recent Walkthroughs",
          "when": "codewalk.hasHistory"
        }
      ]
    }
  },
  "scripts": {
    "vscode:prepublish": "npm run build",
    "build": "esbuild src/extension.ts --bundle --outfile=dist/extension.js --external:vscode --format=cjs --platform=node",
    "watch": "npm run build -- --watch",
    "test": "vitest",
    "lint": "eslint src --ext ts"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/vscode": "^1.85.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "esbuild": "^0.20.0",
    "eslint": "^8.56.0",
    "typescript": "^5.3.0",
    "vitest": "^1.2.0"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.32.0"
  }
}
```

### 11.2 Extension Entry Point

```typescript
// src/extension.ts

import * as vscode from 'vscode';
import { WalkthroughController } from './core/walkthrough-controller';
import { StateManager } from './core/state-manager';
import { CodeAnalyzer } from './analysis/code-analyzer';
import { DebugBridge } from './debug/debug-bridge';
import { DebugEventHandler } from './debug/debug-event-handler';
import { AIClientFactory } from './ai/ai-client-factory';
import { PanelController } from './ui/panel-controller';
import { EditorDecorations } from './ui/editor-decorations';
import { Logger } from './utils/logger';

let walkthroughController: WalkthroughController | undefined;

export async function activate(context: vscode.ExtensionContext) {
  Logger.info('CodeWalk extension activating...');
  
  // Initialize components
  const stateManager = new StateManager();
  const codeAnalyzer = new CodeAnalyzer();
  const debugBridge = new DebugBridge();
  const aiClient = AIClientFactory.create(context);
  const panelController = new PanelController(context.extensionUri);
  const editorDecorations = new EditorDecorations();
  
  // Create main controller
  walkthroughController = new WalkthroughController(
    stateManager,
    codeAnalyzer,
    debugBridge,
    aiClient,
    panelController,
    editorDecorations
  );
  
  // Setup debug event handler
  const debugEventHandler = new DebugEventHandler(walkthroughController, debugBridge);
  
  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('codewalk.startFromSelection', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.selection.isEmpty) {
        vscode.window.showWarningMessage('Please select code to walk through');
        return;
      }
      
      await walkthroughController?.startWalkthrough(
        editor.document,
        editor.selection
      );
    }),
    
    vscode.commands.registerCommand('codewalk.nextStep', () => {
      walkthroughController?.nextStep();
    }),
    
    vscode.commands.registerCommand('codewalk.previousStep', () => {
      walkthroughController?.previousStep();
    }),
    
    vscode.commands.registerCommand('codewalk.stop', () => {
      walkthroughController?.stopWalkthrough();
    }),
    
    vscode.commands.registerCommand('codewalk.askQuestion', async () => {
      const question = await vscode.window.showInputBox({
        prompt: 'Ask a question about the current code',
        placeHolder: 'What does this do?'
      });
      
      if (question) {
        await walkthroughController?.askQuestion(question);
      }
    })
  );
  
  // Set context for when clauses
  vscode.commands.executeCommand('setContext', 'codewalk.supported', true);
  
  // Cleanup
  context.subscriptions.push({
    dispose: () => {
      walkthroughController?.dispose();
      debugEventHandler.dispose();
    }
  });
  
  Logger.info('CodeWalk extension activated');
}

export function deactivate() {
  walkthroughController?.dispose();
  Logger.info('CodeWalk extension deactivated');
}
```

---

## 12. Security Considerations

### 12.1 API Key Storage

```typescript
// src/utils/secrets.ts

export class SecretStorage {
  private static readonly ANTHROPIC_KEY = 'codewalk.anthropicApiKey';
  private static readonly AZURE_KEY = 'codewalk.azureApiKey';
  
  constructor(private secretStorage: vscode.SecretStorage) {}
  
  async getAnthropicKey(): Promise<string | undefined> {
    // First check secret storage
    let key = await this.secretStorage.get(SecretStorage.ANTHROPIC_KEY);
    if (key) return key;
    
    // Fall back to settings (not recommended, but supported)
    const config = vscode.workspace.getConfiguration('codewalk');
    key = config.get<string>('anthropicApiKey');
    
    // If found in settings, migrate to secret storage
    if (key) {
      await this.setAnthropicKey(key);
      await config.update('anthropicApiKey', undefined, vscode.ConfigurationTarget.Global);
    }
    
    return key;
  }
  
  async setAnthropicKey(key: string): Promise<void> {
    await this.secretStorage.store(SecretStorage.ANTHROPIC_KEY, key);
  }
  
  async promptForApiKey(provider: 'anthropic' | 'azure'): Promise<string | undefined> {
    const key = await vscode.window.showInputBox({
      prompt: `Enter your ${provider === 'anthropic' ? 'Anthropic' : 'Azure OpenAI'} API key`,
      password: true,
      ignoreFocusOut: true,
    });
    
    if (key) {
      if (provider === 'anthropic') {
        await this.setAnthropicKey(key);
      } else {
        await this.secretStorage.store(SecretStorage.AZURE_KEY, key);
      }
    }
    
    return key;
  }
}
```

### 12.2 Data Privacy

| Data Type | Storage | Transmission | Retention |
|-----------|---------|--------------|-----------|
| API Keys | VS Code SecretStorage | HTTPS only | Until user removes |
| Code snippets | In-memory only | To AI provider (HTTPS) | Session only |
| Explanations | In-memory only | None | Session only |
| Conversation | In-memory only | To AI provider (HTTPS) | Session only |
| Variable values | In-memory only | To AI provider (HTTPS) | Session only |

### 12.3 Security Best Practices

1. **No code leaves the machine except to AI provider**
2. **API keys stored in VS Code SecretStorage (encrypted)**
3. **No telemetry includes code content**
4. **All external communication over HTTPS**
5. **Users control what code is analyzed**

---

## 13. Testing Strategy

### 13.1 Test Categories

| Category | Framework | Coverage Target | Focus |
|----------|-----------|-----------------|-------|
| Unit Tests | Vitest | 80% | Core logic, state management |
| Integration Tests | VS Code Test | 60% | Extension lifecycle, commands |
| E2E Tests | Manual + Playwright | Key flows | Full user scenarios |
| AI Response Tests | Snapshot | N/A | Prompt quality validation |

### 13.2 Unit Test Examples

```typescript
// test/unit/state-manager.test.ts

import { describe, it, expect, beforeEach } from 'vitest';
import { StateManager } from '../../src/core/state-manager';

describe('StateManager', () => {
  let stateManager: StateManager;
  
  beforeEach(() => {
    stateManager = new StateManager();
  });
  
  describe('initialization', () => {
    it('should create walkthrough with correct initial state', () => {
      const state = stateManager.createWalkthrough({
        sourceFile: '/test/file.cs',
        selectionRange: { startLine: 1, endLine: 10, startColumn: 0, endColumn: 0 },
      });
      
      expect(state.status).toBe('initializing');
      expect(state.steps).toHaveLength(0);
      expect(state.currentStepIndex).toBe(0);
      expect(state.mode).toBe('static');
    });
  });
  
  describe('step navigation', () => {
    it('should advance to next step', () => {
      const state = stateManager.createWalkthrough({
        sourceFile: '/test/file.cs',
        selectionRange: { startLine: 1, endLine: 10, startColumn: 0, endColumn: 0 },
      });
      
      stateManager.setSteps([
        createMockStep(1),
        createMockStep(2),
        createMockStep(3),
      ]);
      
      stateManager.nextStep();
      expect(stateManager.getState()?.currentStepIndex).toBe(1);
      
      stateManager.nextStep();
      expect(stateManager.getState()?.currentStepIndex).toBe(2);
    });
    
    it('should not advance past last step', () => {
      stateManager.createWalkthrough({
        sourceFile: '/test/file.cs',
        selectionRange: { startLine: 1, endLine: 10, startColumn: 0, endColumn: 0 },
      });
      
      stateManager.setSteps([createMockStep(1), createMockStep(2)]);
      stateManager.goToStep(1); // Go to last step
      
      stateManager.nextStep();
      expect(stateManager.getState()?.currentStepIndex).toBe(1);
    });
  });
  
  describe('conversation', () => {
    it('should add conversation turns', () => {
      stateManager.createWalkthrough({
        sourceFile: '/test/file.cs',
        selectionRange: { startLine: 1, endLine: 10, startColumn: 0, endColumn: 0 },
      });
      
      stateManager.addConversationTurn({
        role: 'user',
        content: 'What does this do?',
      });
      
      stateManager.addConversationTurn({
        role: 'assistant',
        content: 'This code...',
      });
      
      const state = stateManager.getState();
      expect(state?.conversationHistory).toHaveLength(2);
      expect(state?.conversationHistory[0].role).toBe('user');
    });
  });
});

function createMockStep(id: number): WalkthroughStep {
  return {
    id: `step-${id}`,
    stepNumber: id,
    filePath: '/test/file.cs',
    startLine: id * 10,
    endLine: id * 10 + 5,
    startColumn: 0,
    endColumn: 0,
    codeSnippet: `// Step ${id}`,
    surroundingContext: '',
    explanation: `Explanation for step ${id}`,
    generatedAt: new Date(),
    analysisType: 'static',
  };
}
```

### 13.3 Integration Test Example

```typescript
// test/integration/walkthrough-flow.test.ts

import * as vscode from 'vscode';
import * as assert from 'assert';
import { activate } from '../../src/extension';

suite('Walkthrough Integration Tests', () => {
  test('should start walkthrough from selection', async () => {
    // Open a test file
    const doc = await vscode.workspace.openTextDocument({
      content: `
public class Test {
    public void Method() {
        var x = 1;
        var y = 2;
        var z = x + y;
        Console.WriteLine(z);
    }
}`,
      language: 'csharp',
    });
    
    const editor = await vscode.window.showTextDocument(doc);
    
    // Select the method body
    editor.selection = new vscode.Selection(
      new vscode.Position(2, 0),
      new vscode.Position(6, 0)
    );
    
    // Execute command
    await vscode.commands.executeCommand('codewalk.startFromSelection');
    
    // Wait for panel to appear
    await sleep(3000);
    
    // Verify walkthrough started (check context)
    const isActive = await vscode.commands.executeCommand('getContext', 'codewalk.isActive');
    assert.strictEqual(isActive, true);
  });
});

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

---

## 14. Development Phases

### 14.1 Phase 1: Static Walkthrough (Weeks 1-4)

| Week | Focus | Deliverables |
|------|-------|--------------|
| 1 | Project Setup | Extension scaffold, build pipeline, basic UI shell |
| 2 | Code Analysis | Step generator, C# analyzer, symbol extraction |
| 3 | AI Integration | Anthropic client, prompt templates, explanation generation |
| 4 | UI Polish | Panel UI, editor decorations, navigation, Q&A |

**Phase 1 Exit Criteria:**
- [ ] User can select C# code and see AI-generated walkthrough
- [ ] Navigation works (next/prev/jump)
- [ ] Q&A works with context retention
- [ ] Panel displays correctly in light/dark themes

### 14.2 Phase 2: Debug Integration (Weeks 5-8)

| Week | Focus | Deliverables |
|------|-------|--------------|
| 5 | Debug Bridge | DAP integration, variable fetching, call stack |
| 6 | Event Handling | Step sync, session lifecycle, mode switching |
| 7 | Enhanced Context | Variables in explanations, runtime-aware prompts |
| 8 | Integration Testing | E2E flows, edge cases, performance tuning |

**Phase 2 Exit Criteria:**
- [ ] Debug mode activates automatically when debugging
- [ ] Variables display correctly for each step
- [ ] Walkthrough syncs with debugger stepping
- [ ] Performance remains acceptable (< 1s for variable fetch)

### 14.3 Phase 3: Polish & Beta (Weeks 9-10)

| Week | Focus | Deliverables |
|------|-------|--------------|
| 9 | Stability | Bug fixes, error handling, edge cases |
| 10 | Release Prep | Documentation, marketplace listing, beta release |

**Phase 3 Exit Criteria:**
- [ ] No P0/P1 bugs
- [ ] Documentation complete
- [ ] Marketplace listing ready
- [ ] Beta feedback mechanism in place

### 14.4 Milestone Summary

```
Week  1    2    3    4    5    6    7    8    9    10
      │    │    │    │    │    │    │    │    │    │
      ├────┴────┴────┴────┤    │    │    │    │    │
      │   Phase 1         │    │    │    │    │    │
      │   Static          ├────┴────┴────┴────┤    │
      │   Walkthrough     │   Phase 2         │    │
      │                   │   Debug           ├────┴────┤
      │                   │   Integration     │  Phase 3│
      │                   │                   │  Polish │
      ▼                   ▼                   ▼         ▼
    [Scaffold]      [Static MVP]      [Debug MVP]  [Beta]
```

---

## 15. Technical Risks & Mitigations

### 15.1 Risk Matrix

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| AI response latency > 5s | Medium | High | Streaming responses, loading indicators, caching |
| Debug API limitations | Medium | High | Graceful degradation, test across debuggers |
| Token costs excessive | Medium | Medium | Context windowing, caching, usage tracking |
| Step generation quality | Medium | High | Prompt iteration, user feedback loop |
| Memory leaks | Low | High | Strict disposal patterns, leak testing |
| VS Code API changes | Low | Medium | Pin VS Code engine version, monitor deprecations |

### 15.2 Detailed Mitigations

#### Risk: AI Response Latency
```typescript
// Implement streaming for long responses
async generateExplanationStreaming(
  context: ExplanationContext,
  onChunk: (chunk: string) => void
): Promise<void> {
  const stream = await this.client.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }],
  });
  
  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      onChunk(event.delta.text);
    }
  }
}
```

#### Risk: Debug API Limitations
```typescript
// Graceful degradation when debug info unavailable
async getVariablesSafe(): Promise<VariableInfo[]> {
  try {
    return await this.getLocals();
  } catch (error) {
    Logger.warn('Failed to get debug variables, continuing without', error);
    return [];
  }
}
```

---

## 16. Success Metrics

### 16.1 MVP Success Criteria

| Metric | Target | Measurement |
|--------|--------|-------------|
| Install-to-first-use | < 2 minutes | Time from install to first walkthrough |
| Step generation time | < 3 seconds | P95 latency |
| User satisfaction | > 4.0/5.0 | In-app rating |
| Daily active users | 100+ | Telemetry (opt-in) |
| Crash rate | < 1% | Error telemetry |

### 16.2 Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Step relevance | > 80% useful | User feedback |
| Explanation accuracy | > 90% correct | User feedback |
| Q&A relevance | > 85% helpful | User feedback |
| Memory usage | < 100MB | Performance profiling |

### 16.3 Feedback Collection

```typescript
// In-extension feedback prompt
async promptForFeedback(stepId: string): Promise<void> {
  const result = await vscode.window.showQuickPick(
    ['👍 Helpful', '👎 Not helpful', '📝 Give detailed feedback'],
    { placeHolder: 'Was this explanation helpful?' }
  );
  
  if (result === '📝 Give detailed feedback') {
    const feedback = await vscode.window.showInputBox({
      prompt: 'What could be improved?',
    });
    
    if (feedback) {
      await this.telemetry.trackFeedback(stepId, feedback);
    }
  } else if (result) {
    await this.telemetry.trackRating(stepId, result.includes('👍'));
  }
}
```

---

## 17. Future Roadmap

### 17.1 Version 1.1 (Post-MVP)
- Visual Studio 2022 support
- TypeScript/JavaScript full support
- GitHub Copilot Chat integration
- Tour saving/sharing

### 17.2 Version 1.2
- Team collaboration features
- Custom AI model selection
- Walkthrough templates
- Integration with documentation tools

### 17.3 Version 2.0
- Multi-language support (Python, Java, Go)
- Code modification suggestions
- Learning path recommendations
- Integration with LMS platforms

---

## 18. Appendices

### 18.1 Glossary

| Term | Definition |
|------|------------|
| Walkthrough | A step-by-step guided tour through code |
| Step | A single logical unit within a walkthrough |
| Static Mode | Walkthrough based on code analysis only |
| Debug Mode | Walkthrough enhanced with runtime information |
| DAP | Debug Adapter Protocol - standard for debugger communication |
| LSP | Language Server Protocol - standard for language features |

### 18.2 References

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Debug Adapter Protocol](https://microsoft.github.io/debug-adapter-protocol/)
- [Language Server Protocol](https://microsoft.github.io/language-server-protocol/)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [CodeTour Extension](https://github.com/microsoft/codetour)

### 18.3 Open Questions

1. **Pricing model?** Free tier with limits vs. paid only vs. freemium
2. **Copilot integration?** Wait for API stability or build standalone first?
3. **Offline mode?** Support local models (Ollama) for privacy-conscious users?
4. **Multi-file walkthroughs?** Allow stepping across file boundaries?

---

*Document Status: Draft - Ready for Technical Review*

*Next Steps:*
1. Review with development team
2. Validate AI prompt effectiveness with prototyping
3. Create detailed sprint backlog from user stories
4. Setup development environment and CI/CD
