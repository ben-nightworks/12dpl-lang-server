param(
	[Parameter(ValueFromRemainingArguments = $true)]
	[string[]]$Args
)

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..\..\..")

Push-Location $repoRoot
try {
	bun scripts/validate-fixtures.ts @Args
}
finally {
	Pop-Location
}