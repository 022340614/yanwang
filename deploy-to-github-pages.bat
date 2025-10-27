@echo off
echo ================================================
echo 数据可视化平台 - GitHub Pages 自动部署脚本
echo ================================================
echo.

echo 1. 检查Git状态...
git status
echo.

echo 2. 添加所有更改到暂存区...
git add .
echo.

echo 3. 提交更改...
git commit -m "自动部署: 更新数据可视化平台 $(date /t)"
echo.

echo 4. 推送到GitHub...
git push origin master
echo.

echo 5. 检查GitHub Pages状态...
echo 请访问: https://github.com/022340614/yanwang/settings/pages
echo.

echo 6. 最终访问地址:
echo GitHub Pages: https://022340614.github.io/yanwang
echo 自定义域名: https://022340614.xyz
echo 本地预览: http://localhost:8000
echo.

echo 7. 创建HTTPS安全配置...
echo 您的网站将通过GitHub Pages自动获得HTTPS证书
echo.

echo ================================================
echo 部署完成！
echo 网站将在几分钟内通过HTTPS安全访问
echo ================================================
pause