@echo off
echo 启动数据可视化交互平台服务器...
echo.

REM 检查Python是否可用
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo 使用Python服务器启动...
    python -m http.server 8000
) else (
    echo Python未找到，尝试使用Node.js...
    npx http-server -p 8000
)

pause