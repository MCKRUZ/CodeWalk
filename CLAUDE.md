# CodeWalk - Claude Code Project Context

## Project Overview
CodeWalk is a VS Code extension that provides AI-powered interactive code walkthroughs with debug integration.

## Repository Structure
```
CodeWalk/
├── src/
│   ├── extension.ts      # Extension entry point
│   ├── core/             # State management, controllers
│   ├── ai/               # AI client, providers, prompts
│   ├── debug/            # Debug adapter integration
│   ├── ui/               # Webview panel, decorations
│   └── utils/            # Logging, secrets, helpers
├── test/
│   ├── unit/             # Vitest unit tests
│   └── integration/      # VS Code extension tests
├── media/                # Webview assets (CSS, icons)
├── docs/                 # Technical specification
└── .vscode/              # Launch configs, tasks
```

## Tech Stack
- **Language**: TypeScript 5.x
- **Runtime**: VS Code Extension API 1.85+
- **Build**: esbuild
- **Test**: Vitest + @vscode/test-electron
- **AI**: Anthropic SDK (@anthropic-ai/sdk) or Azure OpenAI

## Development Commands
```bash
npm install          # Install dependencies
npm run build        # Build extension
npm run watch        # Watch mode for development
npm test             # Run unit tests
npm run lint         # Run ESLint
```

## Working on Issues

### Finding Work
1. Check GitHub Issues: https://github.com/MCKRUZ/CodeWalk/issues
2. Priority order: P0 (priority-p0) → P1 (priority-p1) → P2
3. Phase order: phase-1 → phase-2 → phase-3
4. Start with issues labeled `ready` or unassigned P0 issues

### Issue Workflow
1. **Read the issue** - Understand acceptance criteria
2. **Create a branch** - `git checkout -b feature/issue-{number}-{short-name}`
3. **Implement** - Write code following patterns below
4. **Test** - Add unit tests, run existing tests
5. **Commit** - Use conventional commits: `feat:`, `fix:`, `test:`, `docs:`
6. **Push & PR** - Reference issue in PR description

### Code Patterns

**State Management** (src/core/state-manager.ts):
```typescript
// Use EventEmitter pattern for state changes
class StateManager extends EventEmitter {
  private state: WalkthroughState | null = null;
  
  updateState(partial: Partial<WalkthroughState>): void {
    this.state = { ...this.state!, ...partial };
    this.emit('stateChanged', this.state);
  }
}
```

**AI Client** (src/ai/):
```typescript
// Always use interface abstraction
interface IAIClient {
  generateExplanation(context: ExplanationContext): Promise<ExplanationResponse>;
}

// Implement for specific providers
class AnthropicProvider implements IAIClient { }
```

**Error Handling**:
```typescript
// Always use Logger, show user-friendly messages
try {
  await this.aiClient.generateExplanation(context);
} catch (error) {
  Logger.error('Failed to generate explanation', error);
  vscode.window.showErrorMessage('Could not generate explanation. Check output for details.');
}
```

**VS Code Commands**:
```typescript
// Register in extension.ts activate()
context.subscriptions.push(
  vscode.commands.registerCommand('codewalk.commandName', async () => {
    // Implementation
  })
);
```

## Current Sprint Focus
**Phase 1: Static Walkthrough** (Weeks 1-4)
- Epic E-001: Project Setup & Infrastructure
- Epic E-002: Static Code Walkthrough  
- Epic E-003: AI Integration
- Epic E-005: UI/UX Implementation

## Definition of Done
- [ ] Code compiles without errors
- [ ] Unit tests added and passing
- [ ] No ESLint errors
- [ ] Works in Extension Development Host
- [ ] PR description references issue number
