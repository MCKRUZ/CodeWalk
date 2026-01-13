# Get next issue to work on and launch Claude Code
# Usage: .\scripts\next-issue.ps1

$REPO = "MCKRUZ/CodeWalk"

# Get highest priority unassigned issue
$issue = gh issue list --repo $REPO --state open --label "priority-p0" --json number,title,labels,url --limit 1 | ConvertFrom-Json

if (-not $issue) {
    $issue = gh issue list --repo $REPO --state open --label "priority-p1" --json number,title,labels,url --limit 1 | ConvertFrom-Json
}

if (-not $issue) {
    Write-Host "No open P0 or P1 issues found!" -ForegroundColor Yellow
    exit
}

$issueNum = $issue[0].number
$issueTitle = $issue[0].title
$issueUrl = $issue[0].url

Write-Host ""
Write-Host "Next Issue to Work On:" -ForegroundColor Cyan
Write-Host "  #$issueNum - $issueTitle" -ForegroundColor Green
Write-Host "  $issueUrl" -ForegroundColor Blue
Write-Host ""

# Show issue details
Write-Host "Issue Details:" -ForegroundColor Cyan
gh issue view $issueNum --repo $REPO

Write-Host ""
Write-Host "Commands to run:" -ForegroundColor Yellow
Write-Host "  git checkout -b feature/issue-$issueNum" -ForegroundColor White
Write-Host "  claude `"Work on GitHub issue #$issueNum. Read the issue, implement it, add tests, and prepare a PR.`"" -ForegroundColor White
