# 🚀 Vercel Deployment Guide - CircleUp

## Overview

CircleUp ahora usa **Vercel** para deployment con funciones serverless para manejar OAuth de forma segura.

## Estructura del Proyecto

```
wearecircleup/
├── api/
│   └── github-auth.js          # Vercel Serverless Function para OAuth
├── src/                         # Frontend React + Vite
├── vercel.json                  # Configuración de Vercel
└── package.json
```

## Configuración de Variables de Entorno en Vercel

### 1. Ir al Dashboard de Vercel

1. Visita [vercel.com](https://vercel.com)
2. Selecciona tu proyecto CircleUp
3. Ve a **Settings** → **Environment Variables**

### 2. Agregar Variables Requeridas

```bash
# GitHub OAuth App
GITHUB_APP_CLIENT_ID=tu_github_client_id
GITHUB_APP_CLIENT_SECRET=tu_github_client_secret
GITHUB_APP_REDIRECT_URI=https://tu-dominio.vercel.app/auth/callback

# GitHub Repository
GITHUB_REPO_OWNER=wearecircleup
GITHUB_REPO_NAME=wearecircleup

# GitHub Token para Actions
GITHUB_TOKEN=tu_github_personal_access_token
VITE_GITHUB_PUBLIC_TOKEN=tu_public_token_para_dispatch
```

### 3. Variables para Frontend (Vite)

```bash
VITE_APP_ENV=production
VITE_BASE_URL=https://tu-dominio.vercel.app
VITE_GITHUB_APP_CLIENT_ID=tu_github_client_id
VITE_GITHUB_APP_REDIRECT_URI=https://tu-dominio.vercel.app/auth/callback
VITE_GITHUB_REPO_OWNER=wearecircleup
VITE_GITHUB_REPO_NAME=wearecircleup
```

## Configuración de GitHub OAuth App

### Actualizar Redirect URIs

En tu GitHub OAuth App settings, agrega:

**Development:**
```
http://localhost:5173/auth/callback
```

**Production (Vercel):**
```
https://tu-dominio.vercel.app/auth/callback
```

O si usas dominio personalizado:
```
https://circleup.com.co/auth/callback
```

## Deployment

### Opción 1: Deploy Automático desde GitHub

1. Conecta tu repositorio GitHub a Vercel
2. Vercel detectará automáticamente el framework (Vite)
3. Cada push a `main` desplegará automáticamente

### Opción 2: Deploy Manual con Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy a preview
vercel

# Deploy a production
vercel --prod
```

## Verificación Post-Deployment

### 1. Verificar Serverless Function

```bash
curl -X POST https://tu-dominio.vercel.app/api/github-auth \
  -H "Content-Type: application/json" \
  -d '{"code":"test"}'
```

Deberías recibir un error 400 (esperado sin código válido).

### 2. Probar OAuth Flow

1. Visita `https://tu-dominio.vercel.app/login`
2. Click en "Continuar con GitHub"
3. Autoriza la aplicación
4. Deberías ser redirigido al Dashboard con tu usuario correcto

### 3. Verificar Aislamiento de Datos

1. Prueba con múltiples cuentas de GitHub
2. Verifica que cada usuario vea solo sus presentaciones
3. Confirma que `user.username` muestra el nombre correcto

## Dominio Personalizado (Opcional)

### Configurar circleup.com.co

1. En Vercel Dashboard → **Settings** → **Domains**
2. Agrega `circleup.com.co`
3. Configura DNS records según instrucciones de Vercel
4. Actualiza `GITHUB_APP_REDIRECT_URI` a usar el nuevo dominio

## Troubleshooting

### Error: "Authentication failed"

**Causa:** Variables de entorno no configuradas correctamente

**Solución:**
1. Verifica que todas las variables estén en Vercel
2. Redeploy después de agregar variables
3. Verifica que `GITHUB_APP_CLIENT_SECRET` esté correcta

### Error: "Invalid redirect_uri"

**Causa:** GitHub OAuth App no tiene la URI configurada

**Solución:**
1. Ve a GitHub → Settings → Developer settings → OAuth Apps
2. Agrega la URL de Vercel a "Authorization callback URL"
3. Asegúrate de incluir `/auth/callback`

### Usuario siempre muestra "CircleUP"

**Causa:** La función serverless no está siendo llamada

**Solución:**
1. Verifica que `/api/github-auth` responda
2. Revisa logs en Vercel Dashboard → Functions
3. Confirma que `AuthCallback.jsx` llama a `/api/github-auth`

## Logs y Monitoring

### Ver Logs de Functions

1. Vercel Dashboard → tu proyecto
2. **Functions** tab
3. Click en `github-auth` para ver logs en tiempo real

### Ver Deployment Logs

1. Vercel Dashboard → **Deployments**
2. Click en el deployment específico
3. Revisa build logs y runtime logs

## Diferencias con Netlify

| Feature | Netlify | Vercel |
|---------|---------|--------|
| Functions Path | `/.netlify/functions/` | `/api/` |
| Config File | `netlify.toml` | `vercel.json` |
| Function Format | CommonJS/ESM | Node.js Request/Response |
| Deploy Command | `netlify deploy` | `vercel` |

## Seguridad

✅ **CLIENT_SECRET** nunca se expone al frontend
✅ Token exchange ocurre en el servidor
✅ Cada usuario tiene su propio access token
✅ Datos aislados por `user.login`
✅ CORS configurado correctamente
✅ State parameter para protección CSRF

## Próximos Pasos

- [ ] Configurar dominio personalizado
- [ ] Implementar refresh token mechanism
- [ ] Agregar rate limiting a la función OAuth
- [ ] Configurar monitoring y alertas
- [ ] Implementar analytics de autenticación

## Referencias

- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [GitHub OAuth Documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
