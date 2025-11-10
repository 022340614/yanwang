# 安全部署脚本 - 第四章数据可视化网站
# 域名: 022340614.xyz
# 版本: 2.0.0 (安全加固版)

param(
    [string]$CommitMessage = "部署第四章安全加固版数据可视化网站"
)

Write-Host "=== 第四章数据可视化网站安全部署 ===" -ForegroundColor Green
Write-Host "目标域名: 022340614.xyz" -ForegroundColor Cyan
Write-Host "版本: 2.0.0 (安全加固版)" -ForegroundColor Yellow
Write-Host ""

# 检查Git状态
try {
    $gitStatus = git status --porcelain
    if ($LASTEXITCODE -ne 0) {
        throw "Git命令执行失败"
    }
    
    Write-Host "✓ Git仓库状态检查完成" -ForegroundColor Green
} catch {
    Write-Host "✗ Git初始化失败: $_" -ForegroundColor Red
    exit 1
}

# 添加文件到Git
try {
    Write-Host "正在添加文件到Git..." -ForegroundColor Yellow
    
    # 添加主要文件
    git add chapter4-secure.html
    git add chapter4-complete.html
    git add CNAME
    git add README.md
    
    Write-Host "✓ 文件添加完成" -ForegroundColor Green
} catch {
    Write-Host "✗ 文件添加失败: $_" -ForegroundColor Red
    exit 1
}

# 提交更改
try {
    Write-Host "正在提交更改..." -ForegroundColor Yellow
    git commit -m $CommitMessage
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ 提交成功: $CommitMessage" -ForegroundColor Green
    } else {
        Write-Host "ℹ 没有需要提交的更改" -ForegroundColor Blue
    }
} catch {
    Write-Host "✗ 提交失败: $_" -ForegroundColor Red
    exit 1
}

# 推送到远程仓库
try {
    Write-Host "正在推送到远程仓库..." -ForegroundColor Yellow
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ 推送成功" -ForegroundColor Green
    } else {
        Write-Host "✗ 推送失败，尝试强制推送..." -ForegroundColor Yellow
        git push -f origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ 强制推送成功" -ForegroundColor Green
        } else {
            throw "推送失败"
        }
    }
} catch {
    Write-Host "✗ 推送失败: $_" -ForegroundColor Red
    exit 1
}

# 部署完成信息
Write-Host ""
Write-Host "=== 部署完成 ===" -ForegroundColor Green
Write-Host "网站地址: https://022340614.xyz/chapter4-secure.html" -ForegroundColor Cyan
Write-Host "备用地址: https://022340614.xyz/chapter4-complete.html" -ForegroundColor Cyan
Write-Host ""
Write-Host "安全特性:" -ForegroundColor Yellow
Write-Host "• 全局错误处理机制" -ForegroundColor White
Write-Host "• CDN资源加载优化" -ForegroundColor White
Write-Host "• 响应式设计适配" -ForegroundColor White
Write-Host "• 离线检测功能" -ForegroundColor White
Write-Host "• 性能监控" -ForegroundColor White
Write-Host "• 无障碍访问支持" -ForegroundColor White
Write-Host ""
Write-Host "部署时间: $(Get-Date)" -ForegroundColor Gray