# Arquitectura de Autenticación - CircleUp

## Dos Sistemas Separados

CircleUp usa **DOS sistemas independientes** para autenticación y perfiles:

### 1. GitHub OAuth (Autenticación) 🔐
**Propósito:** Verificar identidad del usuario

**Almacenamiento:** `localStorage` del navegador
```javascript
// Clave: 'github_user'
{
  id: "170566543",
  login: "wearecircleup",
  username: "Circle UP",
  email: "wearecircleup@gmail.com",
  avatarUrl: "https://avatars.githubusercontent.com/u/170566543?v=4",
  accessToken: "gho_xxx..." // Token de GitHub para API calls
}
```

**Flujo:**
1. Usuario hace clic en "Continue with GitHub"
2. Redirige a GitHub OAuth
3. GitHub devuelve código de autorización
4. `/api/github-auth` intercambia código por `accessToken`
5. Se guarda usuario + token en `localStorage`

**Persistencia:** Solo en el navegador (localStorage)
**No hay base de datos** para usuarios autenticados

---

### 2. DynamoDB (Perfiles de Usuario) 📊
**Propósito:** Almacenar datos del perfil de CircleUp

**Almacenamiento:** AWS DynamoDB
```javascript
// Tabla: circleup-dynamodb
// Partition Key: PK (userId de GitHub)
{
  PK: "170566543",
  userId: "170566543",
  login: "wearecircleup",
  email: "wearecircleup@gmail.com",
  firstName: "Nicolas",
  lastName: "Diaz",
  ageRange: "35+",
  educationLevel: "tecnologo",
  educationStatus: "in-progress",
  role: "Volunteer",
  githubData: {...},
  version: 1,
  createdAt: "2026-01-25T...",
  updatedAt: "2026-01-25T..."
}
```

**Flujo:**
1. Usuario autenticado con GitHub
2. Crea perfil en Dashboard
3. Se guarda en DynamoDB con `PK = userId`

**Persistencia:** Base de datos permanente (DynamoDB)

---

## ¿Qué pasa al eliminar el perfil?

### ❌ Lo que SÍ se elimina:
1. **Perfil de DynamoDB:** Se borra completamente el registro con `PK = userId`
2. **Cache localStorage:** Se limpia `profile_170566543` y flags
3. **Presentaciones:** Se eliminan de GitHub (si están implementadas)

### ✅ Lo que NO se elimina:
1. **Autenticación GitHub:** El usuario sigue autenticado en el navegador
2. **Token de GitHub:** `accessToken` permanece en `localStorage`
3. **Sesión activa:** El usuario puede seguir usando el Dashboard

---

## Comportamiento después de eliminar perfil

```
Usuario autenticado → Elimina perfil → ¿Qué pasa?
```

**Estado actual:**
- ✅ Autenticación GitHub: **ACTIVA** (localStorage)
- ❌ Perfil DynamoDB: **ELIMINADO**
- 🔄 Dashboard: Muestra CTA "CREAR PERFIL"

**El usuario puede:**
1. Ver el Dashboard (está autenticado)
2. Crear un nuevo perfil (DynamoDB vacío)
3. Generar presentaciones (tiene `accessToken`)

**El usuario NO puede:**
1. Ver su perfil anterior (fue eliminado)
2. Recuperar datos del perfil (eliminación permanente)

---

## Logout vs Eliminar Cuenta

| Acción | GitHub Auth | Perfil DynamoDB | Puede volver? |
|--------|-------------|-----------------|---------------|
| **Logout** | ❌ Borrado (localStorage) | ✅ Permanece | ✅ Sí, re-login |
| **Eliminar Cuenta** | ✅ Permanece | ❌ Borrado | ✅ Sí, crear nuevo perfil |

---

## Recomendación: Logout después de eliminar

**Problema actual:**
Cuando eliminas el perfil, la autenticación GitHub permanece activa. El usuario ve el CTA "CREAR PERFIL" pero sigue "logueado".

**Solución sugerida:**
Hacer logout automático después de eliminar cuenta:

```javascript
// En AccountDeletion.jsx
if (result.success) {
  // Limpiar perfil
  ProfileService.clearUserData(userId);
  
  // Hacer logout de GitHub
  GitHubAuthService.logout();
  
  // Redirigir a login
  window.location.href = '/';
}
```

**Ventajas:**
- ✅ Experiencia más clara: "Cuenta eliminada → Sesión cerrada"
- ✅ Seguridad: No quedan datos en localStorage
- ✅ UX consistente: Usuario debe re-autenticarse para crear nuevo perfil

---

## Resumen

**NO hay base de datos de usuarios autenticados.**

La autenticación es **stateless** (solo localStorage del navegador).

DynamoDB **solo guarda perfiles**, no autenticación.

Eliminar perfil ≠ Eliminar autenticación GitHub.

**Sugerencia:** Agregar logout automático al eliminar cuenta para mejor UX.
