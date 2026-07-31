# Terraform Setup

Este setup deja un flujo basico y profesional para Terraform con GitHub Actions usando OIDC y `assume role`, sin meter complejidad innecesaria.

## Valores hardcodeados por ahora

- AWS account: `311923415472`
- Region: `us-east-1`
- Repo: `wearecircleup/wearecircleup`
- Role ARN: `arn:aws:iam::311923415472:role/GitHubActionsDeployRole`
- Bucket de state: `wearecircleup-terraform-state-311923415472-us-east-1`
- Key del state remoto: `prod/terraform.tfstate`
- Bucket de validacion: `wearecircleup-terraform-check-311923415472-us-east-1`
- Secret de Eventbrite: `wearecircleup/prod/eventbrite`

## Estructura

- `infra/prod`: root module del ambiente `prod`
- `infra/modules/s3-validation`: modulo del servicio S3 para el bucket de validacion
- `infra/modules/secretsmanager-eventbrite`: modulo del servicio Secrets Manager para Eventbrite
- `infra/scripts/bootstrap-state-bucket.sh`: asegura que el bucket de state exista antes de ejecutar Terraform

## Flujos

### 1. Plan / Apply

Workflow: `.github/workflows/terraform-plan-apply.yml`

- En `push` a `main`:
  - asume el role por OIDC
  - crea/configura el bucket remoto de state si no existe
  - corre `terraform init`, `validate`, `plan` y `apply`
- En `workflow_dispatch`:
  - puedes correr `plan` o `apply` manualmente

`terraform fmt` queda como paso local, no en GitHub Actions.

### 2. Destroy

Workflow: `.github/workflows/terraform-destroy.yml`

- Solo manual
- Requiere escribir `destroy-prod` como confirmacion
- Destruye el bucket de validacion y el secret de Eventbrite, pero deja intacto el bucket remoto de state

## Importante sobre el trust policy actual

Tu trust policy solo permite el subject:

`repo:wearecircleup/wearecircleup:ref:refs/heads/main`

Eso significa que estos workflows deben ejecutarse desde la rama `main`. Si despues quieres `terraform plan` en pull requests, hay que ampliar el `sub` permitido en el role.

## Carga del secreto

Terraform crea el contenedor del secreto en AWS Secrets Manager, pero no guarda valores sensibles en el repo.

Despues del `apply`, puedes cargar algo como esto en el secret:

```json
{
  "EVENTBRITE_PRIVATE_TOKEN": "REEMPLAZAR",
  "EVENTBRITE_ORGANIZATION_ID": "2998243227926"
}
```
