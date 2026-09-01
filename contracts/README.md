# API contract input

Place the backend-approved OpenAPI document at `contracts/openapi.json`, then run:

```powershell
pnpm api:generate
```

The generated TypeScript contract is written to `src/contracts/backend.generated.ts`. A placeholder schema is intentionally not included because endpoint names and payloads remain backend inputs.
