$ErrorActionPreference = "SilentlyContinue"

$portOwners = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess -Unique |
  Where-Object { $_ -gt 0 }

foreach ($owner in $portOwners) {
  Stop-Process -Id $owner -Force
}

$targets = Get-CimInstance Win32_Process | Where-Object {
  $_.CommandLine -match 'vercel/dist/vc\.js dev' -or $_.CommandLine -match 'vite --port'
}

foreach ($target in $targets) {
  Stop-Process -Id $target.ProcessId -Force
}

Start-Sleep -Seconds 1

& vercel dev --local-config vercel.local.json --local --listen 3000
