# 自动重启服务器脚本
while ($true) {
    try {
        Write-Host "启动数据可视化服务器..." -ForegroundColor Yellow
        python -m http.server 8000
    } catch {
        Write-Host "服务器异常: $_" -ForegroundColor Red
        Write-Host "5秒后重新启动..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
    }
}