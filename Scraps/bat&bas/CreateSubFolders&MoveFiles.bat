@echo off
setlocal enabledelayedexpansion
rem Prompt the user for confirmation
set /p "confirm=Do you want to continue? (Y/N): "
if /i not "!confirm!"=="Y" exit

rem Iterate over all files in the current directory
for %%F in (*) do (
rem Get the filename without extension
set "filename=%%~nF"
rem Create a directory with the same name as the file (if it doesn't exist)
if not exist "!filename!" (
mkdir "!filename!"
)
rem Move the file into the respective directory
move "%%F" "!filename!"
)
echo Files organized successfully!
이제 이 코드를 사용하면 실행할 때 "계속