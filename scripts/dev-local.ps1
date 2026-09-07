$ErrorActionPreference = "SilentlyContinue"

$ports = 3000, 3001
foreach ($port in $ports) {
  Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty OwningProcess -Unique |
    Where-Object { $_ -gt 0 } |
    ForEach-Object { Stop-Process -Id $_ -Force }
}

Get-CimInstance Win32_Process | Where-Object {
  $_.CommandLine -match 'dev-api-server\.mjs' -or
  $_.CommandLine -match 'vite --host localhost --port 3000 --strictPort'
} | ForEach-Object {
  Stop-Process -Id $_.ProcessId -Force
}

Start-Sleep -Seconds 1

Start-Process powershell -ArgumentList '-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', 'node scripts/dev-api-server.mjs' -WindowStyle Hidden

Start-Sleep -Milliseconds 500

& npx vite --host localhost --port 3000 --strictPort
