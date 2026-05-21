@echo off
setlocal

set "NODE_HOME=%USERPROFILE%\.local\nodejs\node-v24.15.0-win-x64"

if not exist "%NODE_HOME%\node.exe" (
  echo Node.js portatil nao encontrado em:
  echo %NODE_HOME%
  echo.
  echo Execute a instalacao portatil do Node antes de iniciar o app.
  exit /b 1
)

set "PATH=%NODE_HOME%;%PATH%"

echo Iniciando Nuvia Travel Pro...
echo Abra: http://127.0.0.1:5173
echo.
npm.cmd run dev -- --host 127.0.0.1 --port 5173
