param (
    [string]$functionName
)

$sourcePath = "C:\Users\ssmol\Desktop\Stef\Personal\WebDev\research\new\backend\safegpt\src\functions"
$destinationPath = "C:\Users\ssmol\Desktop\Stef\Personal\WebDev\research\new\backend\safegpt\zips"

# Create the destination folder if it doesn't exist
if (-Not (Test-Path -Path $destinationPath)) {
    New-Item -ItemType Directory -Path $destinationPath
}

# Build the full path to the function folder
$functionPath = Join-Path -Path $sourcePath -ChildPath $functionName

# Check if the function folder exists
if (-Not (Test-Path -Path $functionPath)) {
    Write-Error "The specified function directory does not exist: $functionPath"
    exit
}

# Create the zip file path
$zipPath = Join-Path -Path $destinationPath -ChildPath "$functionName.zip"

# Compress the contents of the function folder
Compress-Archive -Path (Join-Path $functionPath "*") -DestinationPath $zipPath

#Example to run script: .\zipSpecificFunction.ps1 -functionName "anonymizeMessage"