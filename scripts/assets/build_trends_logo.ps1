$ErrorActionPreference = "Stop"

$repoRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "..\.."))
$blender = "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe"

if (-not (Test-Path -LiteralPath $blender)) {
  throw "Blender 5.2 was not found at the verified pipeline path."
}

$source = Join-Path $repoRoot "assets\brand\source\trends-logo-3d.ai-export.gltf"
$working = Join-Path $repoRoot "assets\brand\working\trends-logo-web-working.blend"
$candidate = Join-Path $repoRoot "assets\brand\working\trends-logo-web-candidate.glb"
$webpCandidate = Join-Path $repoRoot "assets\brand\working\trends-logo-web-webp.glb"
$production = Join-Path $repoRoot "public\models\trends-logo-web.glb"
$previews = Join-Path $repoRoot "assets\brand\previews"
$blenderReport = Join-Path $repoRoot "assets\brand\reports\trends-logo-blender-report.json"
$validationReport = Join-Path $repoRoot "assets\brand\reports\trends-logo-khronos-validation.md"

Push-Location $repoRoot
try {
  & $blender --background --factory-startup --disable-autoexec --python "scripts\assets\prepare_trends_logo.py" -- $source $working $candidate $previews $blenderReport
  if ($LASTEXITCODE -ne 0) { throw "Blender preparation failed with exit code $LASTEXITCODE." }

  node "scripts\assets\convert-logo-textures.mjs" $candidate $webpCandidate
  if ($LASTEXITCODE -ne 0) { throw "Lossless WebP conversion failed with exit code $LASTEXITCODE." }

  pnpm exec gltf-transform optimize $webpCandidate $production --compress meshopt --meshopt-level high --simplify false --texture-compress false --palette false --flatten true --join true --join-meshes true --join-named true --weld true
  if ($LASTEXITCODE -ne 0) { throw "glTF optimization failed with exit code $LASTEXITCODE." }

  node "scripts\assets\build-brand-posters.mjs" "assets\brand\previews\trends-logo-hero.png" "public\images\brand\trends-logo-poster.avif" "public\images\brand\trends-logo-poster.webp"
  if ($LASTEXITCODE -ne 0) { throw "Poster conversion failed with exit code $LASTEXITCODE." }

  pnpm exec gltf-transform validate $production --format md | Out-File -LiteralPath $validationReport -Encoding utf8
  if ($LASTEXITCODE -ne 0) { throw "Khronos validation failed with exit code $LASTEXITCODE." }
} finally {
  Pop-Location
}
