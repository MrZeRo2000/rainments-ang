$folderName = Split-Path -Path $PSScriptRoot -Leaf
Invoke-Expression "../common/builder/deployWebProject.ps1 $folderName"
