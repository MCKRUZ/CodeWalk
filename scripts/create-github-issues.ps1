# CodeWalk GitHub Issue Creation Script (PowerShell)
# Run from repository root: .\scripts\create-github-issues.ps1

$ErrorActionPreference = "Continue"
$REPO = "MCKRUZ/CodeWalk"

Write-Host "Creating labels..." -ForegroundColor Cyan

# Create labels
$labels = @(
    @{name="epic"; color="3E4B9E"; description="Epic-level tracking issue"},
    @{name="story"; color="0E8A16"; description="User story"},
    @{name="task"; color="1D76DB"; description="Technical task"},
    @{name="phase-1"; color="FBCA04"; description="Phase 1: Static Walkthrough"},
    @{name="phase-2"; color="F9A825"; description="Phase 2: Debug Integration"},
    @{name="phase-3"; color="E65100"; description="Phase 3: Polish & Beta"},
    @{name="priority-p0"; color="B60205"; description="Critical - Must have for MVP"},
    @{name="priority-p1"; color="D93F0B"; description="High - Should have for MVP"},
    @{name="priority-p2"; color="FBCA04"; description="Medium - Nice to have"},
    @{name="frontend"; color="C2E0C6"; description="UI/UX work"},
    @{name="backend"; color="BFD4F2"; description="Extension core logic"},
    @{name="ai"; color="D4C5F9"; description="AI integration"},
    @{name="debug"; color="FEF2C0"; description="Debug integration"},
    @{name="infrastructure"; color="E6E6E6"; description="Build, CI/CD, tooling"},
    @{name="documentation"; color="0075CA"; description="Documentation"}
)

foreach ($label in $labels) {
    gh label create $label.name --color $label.color --description $label.description --repo $REPO 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Created label '$($label.name)'" -ForegroundColor Green
    } else {
        Write-Host "Label '$($label.name)' already exists" -ForegroundColor Yellow
    }
}

Write-Host "Labels done!" -ForegroundColor Green
Write-Host ""
Write-Host "Creating issues..." -ForegroundColor Cyan

# Helper function
function New-Issue {
    param([string]$Title, [string]$Labels, [string]$Body)
    
    $tempFile = [System.IO.Path]::GetTempFileName()
    $Body | Out-File -FilePath $tempFile -Encoding utf8
    
    gh issue create --repo $REPO --title $Title --label $Labels --body-file $tempFile 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Created: $Title" -ForegroundColor Green
    } else {
        Write-Host "Failed: $Title" -ForegroundColor Red
    }
    
    Remove-Item $tempFile -Force
}

# EPIC E-001
New-Issue -Title "[EPIC] E-001: Project Setup & Infrastructure" -Labels "epic,phase-1,infrastructure" -Body "## Description
Set up the foundational project structure, build pipeline, and development environment for the CodeWalk VS Code extension.

## Acceptance Criteria
- [ ] VS Code extension scaffold created
- [ ] TypeScript configuration complete
- [ ] Build pipeline working (esbuild)
- [ ] Development workflow documented
- [ ] CI/CD pipeline configured

## Priority
**P0 - Critical for MVP**"

New-Issue -Title "Create Extension Scaffold" -Labels "story,phase-1,infrastructure,priority-p0" -Body "## User Story
As a developer, I need a properly structured VS Code extension project so that I can start building features.

## Acceptance Criteria
- [ ] package.json with correct VS Code extension configuration
- [ ] TypeScript configuration (tsconfig.json)
- [ ] Source directory structure created
- [ ] Basic extension activates without errors
- [ ] Hello World command works to verify setup

## Estimated Effort: 2-4 hours"

New-Issue -Title "Configure Build Pipeline" -Labels "story,phase-1,infrastructure,priority-p0" -Body "## User Story
As a developer, I need a fast and reliable build pipeline so that I can iterate quickly during development.

## Acceptance Criteria
- [ ] esbuild configured for bundling
- [ ] npm run build produces working extension
- [ ] npm run watch enables hot reload
- [ ] Source maps generated for debugging
- [ ] Build time under 5 seconds

## Estimated Effort: 2-3 hours"

New-Issue -Title "Set Up Development Environment" -Labels "story,phase-1,infrastructure,priority-p0" -Body "## User Story
As a developer, I need VS Code launch configurations and tasks so that I can debug the extension during development.

## Acceptance Criteria
- [ ] .vscode/launch.json configured for extension debugging
- [ ] .vscode/tasks.json configured for build tasks
- [ ] F5 launches Extension Development Host
- [ ] Breakpoints work in extension code

## Estimated Effort: 1-2 hours"

New-Issue -Title "Configure CI/CD Pipeline" -Labels "story,phase-1,infrastructure,priority-p1" -Body "## User Story
As a developer, I need automated CI/CD so that code quality is maintained.

## Acceptance Criteria
- [ ] GitHub Actions workflow for CI
- [ ] Runs on every PR and push to main
- [ ] Linting, TypeScript compilation, and tests run
- [ ] Build verification

## Estimated Effort: 2-3 hours"

# EPIC E-002
New-Issue -Title "[EPIC] E-002: Static Code Walkthrough" -Labels "epic,phase-1,backend" -Body "## Description
Implement the core static code walkthrough functionality - allowing users to select code and receive an AI-generated step-by-step walkthrough.

## Acceptance Criteria
- [ ] User can select code and start walkthrough
- [ ] AI generates logical steps from code
- [ ] Each step has an explanation
- [ ] Navigation between steps works
- [ ] Q&A functionality works

## Priority: P0 - Core MVP Feature"

New-Issue -Title "Implement Code Selection Handler" -Labels "story,phase-1,backend,priority-p0" -Body "## User Story
As a developer, I want to select code in the editor and trigger a walkthrough.

## Acceptance Criteria
- [ ] Context menu item appears when code is selected
- [ ] Command palette includes CodeWalk: Start Walkthrough
- [ ] Keyboard shortcut Ctrl+Shift+W triggers walkthrough
- [ ] Selection captured with file path, range, and content

## Estimated Effort: 2-3 hours"

New-Issue -Title "Create Step Generator" -Labels "story,phase-1,backend,ai,priority-p0" -Body "## User Story
As the system, I need to analyze code and generate logical steps.

## Acceptance Criteria
- [ ] Analyzes code structure using VS Code Language API
- [ ] Identifies logical code blocks
- [ ] Generates 3-15 steps depending on complexity
- [ ] Works for C# and TypeScript

## Estimated Effort: 4-6 hours"

New-Issue -Title "Implement State Manager" -Labels "story,phase-1,backend,priority-p0" -Body "## User Story
As the system, I need centralized state management for walkthrough state.

## Acceptance Criteria
- [ ] Single source of truth for walkthrough state
- [ ] Tracks steps, current index, conversation history
- [ ] Supports state transitions
- [ ] Emits events on state changes

## Estimated Effort: 3-4 hours"

New-Issue -Title "Create Walkthrough Controller" -Labels "story,phase-1,backend,priority-p0" -Body "## User Story
As the system, I need a central controller to orchestrate the walkthrough flow.

## Acceptance Criteria
- [ ] Coordinates between StateManager, StepGenerator, AIClient, PanelController
- [ ] Handles startWalkthrough, nextStep, previousStep commands
- [ ] Handles askQuestion command
- [ ] Handles errors gracefully

## Estimated Effort: 4-6 hours"

New-Issue -Title "Implement Step Navigation" -Labels "story,phase-1,backend,frontend,priority-p0" -Body "## User Story
As a developer, I want to navigate between walkthrough steps.

## Acceptance Criteria
- [ ] Next/Previous navigation works
- [ ] Step counter shows Step X of Y
- [ ] Can jump to any step by clicking
- [ ] Editor scrolls to show current step

## Estimated Effort: 2-3 hours"

New-Issue -Title "Implement Q&A Conversation" -Labels "story,phase-1,backend,ai,priority-p0" -Body "## User Story
As a developer, I want to ask follow-up questions about the current step.

## Acceptance Criteria
- [ ] Text input accepts questions
- [ ] Questions sent to AI with full context
- [ ] Responses appear in conversation area
- [ ] Conversation history maintained

## Estimated Effort: 3-4 hours"

# EPIC E-003
New-Issue -Title "[EPIC] E-003: AI Integration" -Labels "epic,phase-1,ai" -Body "## Description
Implement the AI service layer for generating code explanations and answering questions.

## Acceptance Criteria
- [ ] AI client abstraction implemented
- [ ] Anthropic provider implemented
- [ ] Prompt templates optimized
- [ ] Context management handles token limits

## Priority: P0 - Core MVP Feature"

New-Issue -Title "Create AI Client Interface" -Labels "story,phase-1,ai,priority-p0" -Body "## User Story
As the system, I need an abstract AI client interface to support multiple providers.

## Acceptance Criteria
- [ ] IAIClient interface defined
- [ ] Methods: generateSteps, generateExplanation, answerQuestion
- [ ] Response and error types defined

## Estimated Effort: 2-3 hours"

New-Issue -Title "Implement Anthropic Provider" -Labels "story,phase-1,ai,priority-p0" -Body "## User Story
As the system, I need an Anthropic Claude implementation for high-quality explanations.

## Acceptance Criteria
- [ ] Uses @anthropic-ai/sdk
- [ ] Implements IAIClient interface
- [ ] Uses Claude Sonnet for explanations
- [ ] Handles API errors gracefully

## Estimated Effort: 4-6 hours"

New-Issue -Title "Create Prompt Templates" -Labels "story,phase-1,ai,priority-p0" -Body "## User Story
As the system, I need optimized prompt templates for consistent AI responses.

## Acceptance Criteria
- [ ] Step generation prompt template
- [ ] Explanation prompt template
- [ ] Q&A prompt template
- [ ] Prompts tested with sample code

## Estimated Effort: 3-4 hours"

New-Issue -Title "Implement Context Builder" -Labels "story,phase-1,ai,priority-p0" -Body "## User Story
As the system, I need to build rich context for AI prompts while respecting token limits.

## Acceptance Criteria
- [ ] Combines code, symbols, and runtime state
- [ ] Respects token budget (default 8000)
- [ ] Prioritizes context appropriately

## Estimated Effort: 3-4 hours"

New-Issue -Title "Add API Key Management" -Labels "story,phase-1,ai,infrastructure,priority-p0" -Body "## User Story
As a user, I need to securely store my API key.

## Acceptance Criteria
- [ ] API key stored in VS Code SecretStorage
- [ ] Prompt for API key on first use
- [ ] Settings option to update API key
- [ ] Key never logged or exposed

## Estimated Effort: 2-3 hours"

# EPIC E-004
New-Issue -Title "[EPIC] E-004: Debug Integration" -Labels "epic,phase-2,debug" -Body "## Description
Implement debug integration to enhance walkthroughs with live variable values during debugging.

## Acceptance Criteria
- [ ] Detect active debug sessions
- [ ] Fetch variable values at each step
- [ ] Sync walkthrough with debugger stepping
- [ ] Include runtime context in AI explanations

## Priority: P1 - Phase 2 Feature"

New-Issue -Title "Implement Debug Bridge" -Labels "story,phase-2,debug,priority-p1" -Body "## User Story
As the system, I need to interface with VS Code Debug Adapter Protocol.

## Acceptance Criteria
- [ ] Detect when debug session is active
- [ ] Get current stack frame and local variables
- [ ] Evaluate expressions
- [ ] Works with C# and TypeScript debuggers

## Estimated Effort: 6-8 hours"

New-Issue -Title "Create Variable Inspector" -Labels "story,phase-2,debug,priority-p1" -Body "## User Story
As a developer, I want to see current variable values at each step.

## Acceptance Criteria
- [ ] Display relevant variables for current step
- [ ] Show variable name, type, and value
- [ ] Update when debugger steps

## Estimated Effort: 4-6 hours"

New-Issue -Title "Implement Debug Event Handler" -Labels "story,phase-2,debug,priority-p1" -Body "## User Story
As the system, I need to handle debug events so walkthrough stays synchronized.

## Acceptance Criteria
- [ ] Subscribe to debug step events
- [ ] Auto-advance walkthrough when debugger steps
- [ ] Handle debug session start/end

## Estimated Effort: 4-6 hours"

New-Issue -Title "Add Runtime Context to AI" -Labels "story,phase-2,ai,debug,priority-p1" -Body "## User Story
As a developer, I want AI explanations to reference actual variable values.

## Acceptance Criteria
- [ ] Include variable values in AI context during debug mode
- [ ] AI references specific values in explanations

## Estimated Effort: 3-4 hours"

New-Issue -Title "Implement Debug Mode Toggle" -Labels "story,phase-2,debug,frontend,priority-p1" -Body "## User Story
As a developer, I want to toggle debug mode.

## Acceptance Criteria
- [ ] UI indicator shows current mode (Static/Debug)
- [ ] Auto-switch to debug mode when debugging starts
- [ ] Manual toggle available

## Estimated Effort: 2-3 hours"

# EPIC E-005
New-Issue -Title "[EPIC] E-005: UI/UX Implementation" -Labels "epic,phase-1,frontend" -Body "## Description
Implement the user interface for the walkthrough panel and editor decorations.

## Acceptance Criteria
- [ ] Webview panel implemented
- [ ] All UI sections render correctly
- [ ] Editor decorations show step markers
- [ ] Light and dark themes supported

## Priority: P0 - Core MVP Feature"

New-Issue -Title "Create Webview Panel" -Labels "story,phase-1,frontend,priority-p0" -Body "## User Story
As the system, I need a webview panel to display the walkthrough UI.

## Acceptance Criteria
- [ ] Panel opens beside editor
- [ ] Panel receives state updates from extension
- [ ] Panel sends commands back to extension
- [ ] Loading state while generating

## Estimated Effort: 4-6 hours"

New-Issue -Title "Implement Step List Component" -Labels "story,phase-1,frontend,priority-p0" -Body "## User Story
As a developer, I want to see a list of all steps to navigate and track progress.

## Acceptance Criteria
- [ ] Shows numbered list of steps
- [ ] Current step highlighted
- [ ] Clicking step navigates to it

## Estimated Effort: 3-4 hours"

New-Issue -Title "Implement Explanation Component" -Labels "story,phase-1,frontend,priority-p0" -Body "## User Story
As a developer, I want to see the AI explanation clearly formatted.

## Acceptance Criteria
- [ ] Shows code snippet with syntax highlighting
- [ ] Shows AI explanation with markdown rendering
- [ ] Copy code and Go to code buttons

## Estimated Effort: 4-5 hours"

New-Issue -Title "Implement Conversation Component" -Labels "story,phase-1,frontend,priority-p0" -Body "## User Story
As a developer, I want to see the Q&A conversation and ask new questions.

## Acceptance Criteria
- [ ] Shows conversation history
- [ ] Input field for new questions
- [ ] Loading indicator while waiting

## Estimated Effort: 3-4 hours"

New-Issue -Title "Add Editor Decorations" -Labels "story,phase-1,frontend,priority-p0" -Body "## User Story
As a developer, I want visual markers in the editor showing walkthrough steps.

## Acceptance Criteria
- [ ] Current step highlighted with background color
- [ ] Step markers in gutter for all steps
- [ ] Decorations update on step change
- [ ] Decorations clear when walkthrough ends

## Estimated Effort: 3-4 hours"

# EPIC E-006
New-Issue -Title "[EPIC] E-006: Testing & Quality" -Labels "epic,phase-1,phase-2" -Body "## Description
Implement comprehensive testing and quality assurance for the extension.

## Child Stories
- [ ] Set up unit testing framework
- [ ] Create unit tests for core modules
- [ ] Create integration tests
- [ ] Add error handling and logging

## Priority: P1 - Quality Assurance"

New-Issue -Title "Set Up Unit Testing Framework" -Labels "story,phase-1,infrastructure,priority-p1" -Body "## User Story
As a developer, I need a testing framework to write and run tests.

## Acceptance Criteria
- [ ] Vitest configured for unit tests
- [ ] Test script in package.json
- [ ] Coverage reporting configured
- [ ] Tests run in CI

## Estimated Effort: 2-3 hours"

New-Issue -Title "Create Unit Tests for Core Modules" -Labels "story,phase-1,priority-p1" -Body "## User Story
As a developer, I need unit tests for core modules.

## Acceptance Criteria
- [ ] StateManager tests (80%+ coverage)
- [ ] ContextBuilder tests
- [ ] StepGenerator tests
- [ ] Mock implementations for dependencies

## Estimated Effort: 6-8 hours"

New-Issue -Title "Create Integration Tests" -Labels "story,phase-2,priority-p1" -Body "## User Story
As a developer, I need integration tests to verify the full walkthrough flow.

## Acceptance Criteria
- [ ] VS Code extension test runner configured
- [ ] Test: Start walkthrough from selection
- [ ] Test: Navigate between steps
- [ ] Test: Ask question and receive response

## Estimated Effort: 6-8 hours"

New-Issue -Title "Add Error Handling and Logging" -Labels "story,phase-1,priority-p1" -Body "## User Story
As a developer, I need proper error handling and logging to diagnose issues.

## Acceptance Criteria
- [ ] Logger utility with levels (debug, info, warn, error)
- [ ] Errors caught and logged appropriately
- [ ] User-friendly error messages shown
- [ ] Output channel for extension logs

## Estimated Effort: 3-4 hours"

# Documentation
New-Issue -Title "Create CONTRIBUTING.md" -Labels "documentation,priority-p1" -Body "## Description
Create contribution guidelines for external contributors.

## Content to Include
- [ ] How to set up development environment
- [ ] Code style guidelines
- [ ] PR process
- [ ] Testing requirements

## Estimated Effort: 2-3 hours"

New-Issue -Title "Add Technical Specification to Repo" -Labels "documentation,priority-p0" -Body "## Description
Add the technical specification document to the repository.

## Acceptance Criteria
- [ ] Create docs/ directory
- [ ] Add TECHNICAL_SPEC.md
- [ ] Link from README

## Estimated Effort: 30 minutes"

Write-Host ""
Write-Host "All issues created!" -ForegroundColor Green
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "   - 6 Epics"
Write-Host "   - 27 Stories"  
Write-Host "   - 2 Documentation issues"
Write-Host "   - Total: 35 issues"
Write-Host ""
Write-Host "View issues at: https://github.com/MCKRUZ/CodeWalk/issues" -ForegroundColor Blue
