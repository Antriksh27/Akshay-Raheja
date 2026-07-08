@echo off
powershell.exe -NoProfile -Command "Expand-Archive -Force -Path '%~2' -DestinationPath '%~4'"
