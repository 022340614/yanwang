@echo off
echo 启动移动端友好的HTTP服务器
echo 电脑本地访问: http://localhost:8000/chapter3_visualization.html
echo 手机访问: http://10.212.21.122:8000/chapter3_visualization.html
echo.
echo 请确保手机和电脑在同一个WiFi网络下
echo.
python -m http.server 8000
pause