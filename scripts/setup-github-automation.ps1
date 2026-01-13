# Setup GitHub Repository Automation
# Run this once to configure repository settings

$REPO = "MCKRUZ/CodeWalk"

Write-Host "Setting up GitHub automation for CodeWalk..." -ForegroundColor Cyan
Write-Host ""

# Create additional labels
Write-Host "Creating additional labels..." -ForegroundColor Yellow

$labels = @(
    @{name="in-progress"; color="0052CC"; description="Work in progress"},
    @{name="ready-for-review"; color="0E8A16"; description="Ready for code review"},
    @{name="needs-triage"; color="D93F0B"; description="Needs initial triage"},
    @{name="bug"; color="D73A4A"; description="Something isn't working"},
    @{name="enhancement"; color="A2EEEF"; description="New feature or request"},
    @{name="dependencies"; color="0366D6"; description="Dependency updates"},
    @{name="tests"; color="BFD4F2"; description="Test-related changes"}
)

foreach ($label in $labels) {
    gh label create $label.name --color $label.color --description $label.description --repo $REPO 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Created: $($label.name)" -ForegroundColor Green
    } else {
        Write-Host "  Exists: $($label.name)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "MANUAL SETUP REQUIRED" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. ADD REPOSITORY SECRETS" -ForegroundColor White
Write-Host "   Go to: https://github.com/$REPO/settings/secrets/actions" -ForegroundColor Blue
Write-Host ""
Write-Host "   Required for Claude PR Review:" -ForegroundColor Yellow
Write-Host "   - ANTHROPIC_API_KEY = your Anthropic API key" -ForegroundColor Gray
Write-Host ""
Write-Host "   Optional for VS Code Marketplace publishing:" -ForegroundColor Yellow
Write-Host "   - VSCE_PAT = your VS Marketplace Personal Access Token" -ForegroundColor Gray
Write-Host ""
Write-Host "   Optional for Project Board automation:" -ForegroundColor Yellow
Write-Host "   - PROJECT_TOKEN = GitHub PAT with project permissions" -ForegroundColor Gray
Write-Host ""

Write-Host "2. ADD REPOSITORY VARIABLES" -ForegroundColor White
Write-Host "   Go to: https://github.com/$REPO/settings/variables/actions" -ForegroundColor Blue
Write-Host ""
Write-Host "   - ENABLE_CLAUDE_REVIEW = true (to enable AI code review)" -ForegroundColor Gray
Write-Host "   - PUBLISH_TO_MARKETPLACE = true (when ready to publish)" -ForegroundColor Gray
Write-Host ""

Write-Host "3. CREATE PROJECT BOARD" -ForegroundColor White
Write-Host "   Go to: https://github.com/users/MCKRUZ/projects" -ForegroundColor Blue
Write-Host "   - Click 'New project'" -ForegroundColor Gray
Write-Host "   - Select 'Board' template" -ForegroundColor Gray
Write-Host "   - Name it 'CodeWalk Development'" -ForegroundColor Gray
Write-Host "   - Create columns: Backlog, In Progress, Review, Done" -ForegroundColor Gray
Write-Host "   - Update project-automation.yml with your project URL" -ForegroundColor Gray
Write-Host ""

Write-Host "4. ENABLE BRANCH PROTECTION" -ForegroundColor White
Write-Host "   Go to: https://github.com/$REPO/settings/branches" -ForegroundColor Blue
Write-Host "   - Add rule for 'main'" -ForegroundColor Gray
Write-Host "   - Require pull request reviews" -ForegroundColor Gray
Write-Host "   - Require status checks (CI / build)" -ForegroundColor Gray
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup script complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next: Push these files to GitHub:" -ForegroundColor Yellow
Write-Host "  git add ." -ForegroundColor White
Write-Host "  git commit -m 'ci: Add GitHub automation workflows'" -ForegroundColor White
Write-Host "  git push" -ForegroundColor White
