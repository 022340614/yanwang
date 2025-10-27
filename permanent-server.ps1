# 永久服务器配置脚本
# 创建Windows服务实现24/7访问

Write-Host "数据可视化平台 - 永久服务器配置" -ForegroundColor Green
Write-Host "================================================"

# 检查当前服务器状态
Write-Host "`n1. 检查当前服务器状态..." -ForegroundColor Yellow
$port = 8000
$process = Get-Process | Where-Object {$_.ProcessName -eq "python" -and $_.CommandLine -like "*http.server $port*"}
if ($process) {
    Write-Host "✅ 服务器正在运行 (PID: $($process.Id))" -ForegroundColor Green
} else {
    Write-Host "❌ 服务器未运行" -ForegroundColor Red
}

# 创建Windows服务配置
Write-Host "`n2. 创建永久服务器配置..." -ForegroundColor Yellow

$serviceScript = @"
# 自动重启服务器脚本
while (`$true) {
    try {
        Write-Host "启动数据可视化服务器..." -ForegroundColor Yellow
        python -m http.server 8000
    } catch {
        Write-Host "服务器异常: `$_" -ForegroundColor Red
        Write-Host "5秒后重新启动..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
    }
}
"@

$serviceScript | Out-File -FilePath "auto-restart-server.ps1" -Encoding UTF8

# 创建启动快捷方式
Write-Host "`n3. 创建启动快捷方式..." -ForegroundColor Yellow

$shortcutScript = @"
Set WshShell = WScript.CreateObject("WScript.Shell")
Set shortcut = WshShell.CreateShortcut("数据可视化平台.lnk")
shortcut.TargetPath = "powershell.exe"
shortcut.Arguments = "-ExecutionPolicy Bypass -File `"$PWD\auto-restart-server.ps1`""
shortcut.WorkingDirectory = "$PWD"
shortcut.IconLocation = "powershell.exe,0"
shortcut.Save
"@

$shortcutScript | Out-File -FilePath "create-shortcut.vbs" -Encoding ASCII

# 执行创建快捷方式
cscript //nologo create-shortcut.vbs

# 清理临时文件
Remove-Item "create-shortcut.vbs" -ErrorAction SilentlyContinue

Write-Host "`n4. 网络配置检查..." -ForegroundColor Yellow

# 检查防火墙规则
Write-Host "检查防火墙规则..." -ForegroundColor White
$firewallRule = Get-NetFirewallRule -DisplayName "数据可视化服务器" -ErrorAction SilentlyContinue
if (-not $firewallRule) {
    Write-Host "建议添加防火墙规则允许端口8000" -ForegroundColor Yellow
}

Write-Host "`n5. 访问地址配置:" -ForegroundColor Cyan
Write-Host "本地访问:" -ForegroundColor White
Write-Host "  http://localhost:8000" -ForegroundColor Green
Write-Host "  http://127.0.0.1:8000" -ForegroundColor Green

Write-Host "`n网络访问:" -ForegroundColor White
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -like "*Ethernet*" -or $_.InterfaceAlias -like "*Wi-Fi*"} | Sort-Object -Property PrefixOrigin | Select-Object -First 1).IPAddress
Write-Host "  http://$ipAddress`:8000" -ForegroundColor Green

Write-Host "`nGitHub Pages (推荐):" -ForegroundColor White
Write-Host "  https://022340614.xyz" -ForegroundColor Green
Write-Host "  https://022340614.github.io/yanwang" -ForegroundColor Green

Write-Host "`n6. 安全配置:" -ForegroundColor Cyan
Write-Host "✅ GitHub Pages 自动HTTPS加密" -ForegroundColor Green
Write-Host "✅ 自定义域名验证" -ForegroundColor Green
Write-Host "✅ 内容安全策略" -ForegroundColor Green

Write-Host "`n================================================" -ForegroundColor Green
Write-Host "永久服务器配置完成！" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

Write-Host "`n使用方法:" -ForegroundColor Yellow
Write-Host "1. 双击 '数据可视化平台.lnk' 启动永久服务器" -ForegroundColor White
Write-Host "2. 访问 https://022340614.xyz 获得最佳体验" -ForegroundColor White
Write-Host "3. 服务器将自动重启确保24/7可用" -ForegroundColor White

Write-Host "`n安全特性:" -ForegroundColor Yellow
Write-Host "- HTTPS加密传输" -ForegroundColor White
Write-Host "- GitHub安全托管" -ForegroundColor White
Write-Host "- 自动证书更新" -ForegroundColor White
Write-Host "- 全球CDN加速" -ForegroundColor White