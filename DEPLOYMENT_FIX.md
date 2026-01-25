# Fix Error 500 - DynamoDB Migration

## Problema

Error 500 en `/api/profile` porque las variables de entorno AWS no están configuradas en Vercel.

## Solución Inmediata (Usuario)

### 1. Limpiar localStorage (Consola del navegador)

```javascript
// Abrir DevTools (F12) → Console
localStorage.clear()
location.reload()
```

Esto eliminará el perfil fantasma de Vercel Blob.

## Solución Permanente (Deployment)

### 2. Verificar variables AWS en Vercel Dashboard

1. Ve a: https://vercel.com/wearecircleup/wearecircleup/settings/environment-variables

2. Verifica que existan estas variables en **Production**:
   - `AWS_REGION`
   - `AWS_ROLE_ARN`
   - `DYNAMODB_TABLE_NAME`

3. Si NO existen, agrégalas:

```
AWS_REGION=us-east-1
AWS_ROLE_ARN=arn:aws:iam::ACCOUNT_ID:role/vercel-dynamodb-role
DYNAMODB_TABLE_NAME=CircleUpProfiles
```

### 3. Redeploy después de agregar variables

```bash
vercel --prod
```

## Verificación

Después del deployment:

1. Abre: https://www.circleup.com.co/
2. Login con GitHub
3. Deberías ver el CTA "Crear Perfil"
4. No debería haber error 500

## Rollback (Si falla)

Si DynamoDB no funciona, revertir a Vercel Blob:

```bash
git revert HEAD~3
npm install @vercel/blob
vercel --prod
```

## Estado Actual

- ✅ Código migrado a DynamoDB
- ✅ Tests pasando (63/63)
- ❌ Variables AWS faltantes en Vercel
- ❌ localStorage con datos obsoletos
