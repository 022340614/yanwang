Set WshShell = CreateObject("WScript.Shell")
currentDir = WshShell.CurrentDirectory
Set shortcut = WshShell.CreateShortcut("数据可视化平台.lnk")
shortcut.TargetPath = "powershell.exe"
shortcut.Arguments = "-ExecutionPolicy Bypass -File """ & currentDir & "\auto-restart-server.ps1"""
shortcut.WorkingDirectory = currentDir
shortcut.IconLocation = "powershell.exe,0"
shortcut.Save
WScript.Echo "快捷方式创建成功！"