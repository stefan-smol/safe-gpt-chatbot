$sourcePath = "C:\Users\ssmol\Desktop\Stef\Personal\WebDev\research\new\backend\chatbot\src\functions"
$destinationPath = "C:\Users\ssmol\Desktop\Stef\Personal\WebDev\research\new\backend\chatbot\zips"

# Create the destination folder if it doesn't exist
if (-Not (Test-Path -Path $destinationPath)) {
    New-Item -ItemType Directory -Path $destinationPath
}

# Get all subdirectories in the functions folder
$subfolders = Get-ChildItem -Path $sourcePath -Directory

foreach ($subfolder in $subfolders) {
    $zipPath = Join-Path -Path $destinationPath -ChildPath "$($subfolder.Name).zip"
    Compress-Archive -Path (Join-Path $subfolder.FullName "*") -DestinationPath $zipPath
}

# Example how to run: .\zipFunctions.ps1