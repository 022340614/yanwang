# GitHub Pages Setup Script
# Author: Data Visualization Platform
# Description: Auto-configure GitHub Pages and domain connection

Write-Host "GitHub Pages Configuration Assistant" -ForegroundColor Green
Write-Host "=================================================="

# Check repository status
Write-Host "`nChecking repository status..." -ForegroundColor Yellow
git status
Write-Host "`nRecent commits:" -ForegroundColor Yellow
git log --oneline -5

Write-Host "`nGitHub Pages Setup Steps:" -ForegroundColor Cyan
Write-Host "1. Visit: https://github.com/022340614/yanwang/settings/pages" -ForegroundColor White
Write-Host "2. Select 'Deploy from a branch'" -ForegroundColor White
Write-Host "3. Choose branch: 'master'" -ForegroundColor White
Write-Host "4. Choose folder: '/ (root)'" -ForegroundColor White
Write-Host "5. Click 'Save'" -ForegroundColor White

Write-Host "`nDomain DNS Configuration:" -ForegroundColor Cyan
Write-Host "Configure DNS records at your domain registrar:" -ForegroundColor White
Write-Host "`nRecommended (A records):" -ForegroundColor Yellow
Write-Host "Type: A" -ForegroundColor White
Write-Host "Name: @" -ForegroundColor White
Write-Host "Value: 185.199.108.153" -ForegroundColor White
Write-Host "Value: 185.199.109.153" -ForegroundColor White
Write-Host "Value: 185.199.110.153" -ForegroundColor White
Write-Host "Value: 185.199.111.153" -ForegroundColor White

Write-Host "`nAlternative (CNAME record):" -ForegroundColor Yellow
Write-Host "Type: CNAME" -ForegroundColor White
Write-Host "Name: @" -ForegroundColor White
Write-Host "Value: 022340614.github.io" -ForegroundColor White

Write-Host "`nCompleted Configurations:" -ForegroundColor Green
Write-Host "- CNAME file created (022340614.xyz)" -ForegroundColor White
Write-Host "- All files pushed to GitHub" -ForegroundColor White
Write-Host "- Data visualization platform ready" -ForegroundColor White

Write-Host "`nExpected Activation Time:" -ForegroundColor Cyan
Write-Host "- GitHub Pages: Immediate" -ForegroundColor White
Write-Host "- DNS Configuration: 5 minutes - 24 hours" -ForegroundColor White

Write-Host "`nFinal Access URLs:" -ForegroundColor Magenta
Write-Host "- GitHub Pages: https://022340614.github.io/yanwang" -ForegroundColor White
Write-Host "- Custom Domain: https://022340614.xyz" -ForegroundColor White

Write-Host "`nAfter configuration, your data visualization platform will be accessible at 022340614.xyz!" -ForegroundColor Green

Write-Host "`nQuick Links:" -ForegroundColor Cyan
Write-Host "GitHub Repository: https://github.com/022340614/yanwang" -ForegroundColor White
Write-Host "Pages Settings: https://github.com/022340614/yanwang/settings/pages" -ForegroundColor White
Write-Host "Preview: http://localhost:8000/chapter2-visualization.html" -ForegroundColor White

Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Complete Pages setup in GitHub web interface" -ForegroundColor White
Write-Host "2. Configure DNS records at domain registrar" -ForegroundColor White
Write-Host "3. Wait for DNS to propagate and visit 022340614.xyz" -ForegroundColor White
Write-Host "4. Test all chart functionalities" -ForegroundColor White