# Domain Connection Test Script
Write-Host "Testing domain connection status..." -ForegroundColor Yellow

# Test custom domain
Write-Host "`nTesting custom domain: 022340614.xyz" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "https://022340614.xyz" -TimeoutSec 10
    Write-Host "Domain connection successful - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Content length: $($response.RawContentLength) bytes" -ForegroundColor White
} catch {
    Write-Host "Domain connection failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test GitHub Pages
Write-Host "`nTesting GitHub Pages: 022340614.github.io/yanwang" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "https://022340614.github.io/yanwang" -TimeoutSec 10
    Write-Host "GitHub Pages connection successful - Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Content length: $($response.RawContentLength) bytes" -ForegroundColor White
} catch {
    Write-Host "GitHub Pages connection failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Check local files
Write-Host "`nChecking local files:" -ForegroundColor Cyan
if (Test-Path "index.html") {
    $size = (Get-Item "index.html").Length
    Write-Host "index.html exists - Size: $size bytes" -ForegroundColor Green
} else {
    Write-Host "index.html does not exist" -ForegroundColor Red
}

if (Test-Path "CNAME") {
    $cname = Get-Content "CNAME"
    Write-Host "CNAME exists - Content: $cname" -ForegroundColor Green
} else {
    Write-Host "CNAME does not exist" -ForegroundColor Red
}

Write-Host "`nRecommended actions:" -ForegroundColor Yellow
Write-Host "1. Check if GitHub Pages is enabled in repository settings" -ForegroundColor White
Write-Host "2. Verify DNS configuration is correct" -ForegroundColor White
Write-Host "3. Wait for GitHub Pages deployment (may take a few minutes)" -ForegroundColor White
Write-Host "4. Clear browser cache and try again" -ForegroundColor White

Write-Host "`nAccess links:" -ForegroundColor Magenta
Write-Host "Custom domain: https://022340614.xyz" -ForegroundColor White
Write-Host "GitHub Pages: https://022340614.github.io/yanwang" -ForegroundColor White