@echo off
title Panel overlays el_tio_crack
cd /d "%~dp0"
echo Descargando lo ultimo de GitHub...
git pull --quiet --rebase --autostash
python panel\server.py
pause
