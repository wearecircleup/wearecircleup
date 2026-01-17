# GitHub OAuth Setup Guide

## Problema Identificado

El callback de autenticación no funcionaba porque:

1. **GitHub Pages no maneja rutas SPA**: Cuando GitHub redirige a `/auth/callback`, GitHub Pages devuelve 404
2. **Solución implementada**: Sistema de redirección SPA con `404.html` y script en `index.html`

## Configuración de GitHub OAuth App

### 1. Crear/Actualizar GitHub OAuth App

Ve a: https://github.com/settings/developers

**Application name**: CircleUp

**Homepage URL**: `https://circleup.com.co`

**Authorization callback URL** (SOLO UNA):
```
https://circleup.com.co/auth/callback
```

**IMPORTANTE**: GitHub OAuth Apps solo permiten **UNA** callback URL. Para desarrollo local, usa la URL de producción ya que el `redirect_uri` se construye dinámicamente desde `VITE_BASE_URL`.

### 2. Obtener Credenciales

Después de crear la app, obtendrás:
- **Client ID**: Identificador público (se puede exponer en el frontend)
- **Client Secret**: Secreto privado (NUNCA exponerlo, solo en GitHub Secrets)

### 3. Crear Personal Access Token (PAT)

Para que el Dashboard pueda disparar workflows, necesitas un PAT con permisos:

1. Ve a: https://github.com/settings/tokens
2. Click en "Generate new token (classic)"
3. Selecciona los scopes:
   - `repo` (acceso completo a repositorios)
   - `workflow` (ejecutar workflows)
4. Copia el token generado

### 4. Configurar GitHub Secrets

En tu repositorio: `Settings > Secrets and variables > Actions`

Agregar estos secrets:

```
VITE_GITHUB_APP_CLIENT_ID=tu_client_id_aqui
GH_TOKEN=tu_personal_access_token_con_repo_y_workflow
```

**CRÍTICO**: El `GH_TOKEN` debe tener permisos `repo` y `workflow` para:
1. Ejecutar el workflow `generate-presentation.yml` 
2. Acceder a GitHub Models API
3. Hacer commits de las presentaciones generadas

### 5. Configurar Variables de Entorno Locales

Crea un archivo `.env` en la raíz del proyecto:

```bash
# Vite Frontend Environment Variables
VITE_APP_ENV=development
VITE_BASE_URL=http://localhost:5173
VITE_GITHUB_APP_CLIENT_ID=tu_client_id_aqui
VITE_GITHUB_REPO_OWNER=wearecircleup
VITE_GITHUB_REPO_NAME=wearecircleup
```

**Nota**: El `redirect_uri` se construye automáticamente como `${VITE_BASE_URL}/auth/callback`

## Cómo Funciona el Sistema de Redirección

### Flujo de Autenticación

1. **Usuario hace clic en "Continuar con GitHub"**
   - Se redirige a: `https://github.com/login/oauth/authorize?client_id=...&redirect_uri=...`

2. **Usuario autoriza en GitHub**
   - GitHub redirige a: `https://circleup.com.co/auth/callback?code=xxx&state=yyy`

3. **GitHub Pages recibe la petición**
   - Como `/auth/callback` no existe físicamente, GitHub Pages sirve `404.html`
   - El script en `404.html` convierte la URL a: `https://circleup.com.co/?/auth/callback&code=xxx&state=yyy`

4. **index.html procesa la redirección**
   - El script en `index.html` detecta el parámetro `?/` y restaura la URL original
   - Convierte: `/?/auth/callback&code=xxx` → `/auth/callback?code=xxx`

5. **App.jsx detecta el callback**
   - Detecta la ruta `/auth/callback` y muestra el componente `AuthCallback`

6. **AuthCallback procesa la autenticación**
   - Valida el `state` (protección CSRF)
   - Extrae el `code` de autorización
   - Guarda la sesión del usuario en `localStorage`
   - Redirige al Dashboard

## Scopes de OAuth

Los scopes configurados son:
- `read:user`: Leer información básica del usuario
- `user:email`: Leer el email del usuario

**Nota**: Los scopes `repo` y `workflow` se eliminaron porque no son necesarios para la autenticación básica. Solo se necesitan si vas a acceder a repositorios privados o ejecutar workflows.

## Verificación

### Desarrollo Local

```bash
npm run dev
```

1. Ve a `http://localhost:5173`
2. Haz clic en "Login"
3. Haz clic en "Continuar con GitHub"
4. Deberías ser redirigido a GitHub
5. Después de autorizar, deberías volver a `http://localhost:5173/auth/callback`
6. Deberías ser redirigido al Dashboard

### Producción

1. Haz push a `main`:
   ```bash
   git add .
   git commit -m "fix: GitHub OAuth callback con SPA routing"
   git push origin main
   ```

2. Espera a que se complete el deploy (GitHub Actions)

3. Ve a `https://circleup.com.co`

4. Prueba el flujo de autenticación

## Troubleshooting

### Error: "Invalid callback parameters"

**Causa**: El `redirect_uri` configurado en GitHub OAuth App no coincide con el usado en la app.

**Solución**: Verifica que ambas URLs estén agregadas en la configuración de GitHub OAuth App.

### Error: "Invalid state parameter"

**Causa**: Protección CSRF activada. El `state` no coincide.

**Solución**: Esto es normal si refrescas la página del callback. Vuelve a iniciar el flujo desde Login.

### Error: 404 en producción

**Causa**: El archivo `404.html` no se copió al build.

**Solución**: Verifica que `public/404.html` existe y se está copiando a `dist/` durante el build.

### El callback no se detecta

**Causa**: El script de redirección en `index.html` o `404.html` no está funcionando.

**Solución**: 
1. Abre las DevTools del navegador
2. Ve a la pestaña Network
3. Observa las redirecciones
4. Verifica que la URL se está transformando correctamente

## Arquitectura de Archivos

```
wearecircleup/
├── public/
│   └── 404.html                    # Redirección SPA para GitHub Pages
├── src/
│   ├── pages/
│   │   ├── Login.jsx               # Página de login con botón GitHub
│   │   └── AuthCallback.jsx        # Procesa el callback de OAuth
│   ├── shared/
│   │   └── utils/
│   │       ├── github.ts           # GitHubAuthService
│   │       └── config.ts           # ConfigService
│   └── App.jsx                     # Detecta rutas y callback
├── index.html                      # Script de redirección SPA
└── .env.example                    # Template de variables de entorno
```

## Recursos

- [GitHub OAuth Documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
- [SPA GitHub Pages](https://github.com/rafgraph/spa-github-pages)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
