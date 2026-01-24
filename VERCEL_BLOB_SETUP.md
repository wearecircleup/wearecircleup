# Vercel Blob Storage Setup Guide

Este documento explica cómo configurar Vercel Blob Storage para el sistema de perfiles de usuario.

## ¿Qué es Vercel Blob?

Vercel Blob es un servicio de almacenamiento de archivos serverless optimizado para aplicaciones Vercel. Lo usamos para almacenar perfiles de usuario en formato NDJSON (Newline Delimited JSON), creando un data lake estructurado.

## Beneficios de Vercel Blob + NDJSON

- **Append-only**: No hay problemas de concurrencia
- **Versionado automático**: Cada cambio se guarda como nueva línea
- **Audit trail completo**: Historial completo de cambios
- **Escalable**: Soporta millones de registros
- **Free tier generoso**: 500MB gratis, suficiente para 650K+ perfiles

## Paso 1: Instalar el paquete

```bash
npm install @vercel/blob
```

## Paso 2: Obtener el Token

### Opción A: Desde Vercel Dashboard (Recomendado)

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en **Storage** en el menú lateral
3. Click en **Create Database** → **Blob**
4. Nombra tu store: `circleup-profiles`
5. Click en **Create**
6. Copia el token `BLOB_READ_WRITE_TOKEN`

### Opción B: Desde Vercel CLI

```bash
# Instalar Vercel CLI si no lo tienes
npm i -g vercel

# Login
vercel login

# Crear Blob store
vercel blob create circleup-profiles

# El token se agregará automáticamente a tu proyecto
```

## Paso 3: Configurar Variables de Entorno

### Desarrollo Local

Agrega a tu archivo `.env`:

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXXXXXXXXX
```

### Producción (Vercel)

El token se configura automáticamente cuando creas el Blob store desde el dashboard. Si necesitas agregarlo manualmente:

1. Ve a **Settings** → **Environment Variables**
2. Agrega `BLOB_READ_WRITE_TOKEN` con el valor del token
3. Selecciona los entornos: Production, Preview, Development
4. Click **Save**

## Paso 4: Verificar la Configuración

Crea un archivo de prueba `test-blob.js`:

```javascript
import { put, list } from '@vercel/blob';

async function testBlob() {
  try {
    // Test write
    const blob = await put('test.txt', 'Hello Vercel Blob!', {
      access: 'public',
    });
    console.log('✅ Write successful:', blob.url);

    // Test list
    const { blobs } = await list();
    console.log('✅ List successful:', blobs.length, 'files');

    return true;
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

testBlob();
```

Ejecuta:
```bash
node test-blob.js
```

## Estructura del Data Lake

```
profiles/
  ├── {userId1}.ndjson    # Perfil del usuario 1 (todas las versiones)
  ├── {userId2}.ndjson    # Perfil del usuario 2 (todas las versiones)
  └── {userId3}.ndjson    # Perfil del usuario 3 (todas las versiones)
```

### Formato NDJSON

Cada archivo `.ndjson` contiene múltiples líneas JSON, una por versión:

```ndjson
{"userId":"123","firstName":"Juan","version":1,"createdAt":"2026-01-24T20:00:00Z"}
{"userId":"123","firstName":"Juan Carlos","version":2,"updatedAt":"2026-01-24T21:00:00Z"}
{"deleted":true,"deletedAt":"2026-01-24T22:00:00Z","deletedBy":"123"}
```

## API Endpoints

### GET /api/profile?userId={userId}
Obtiene el perfil más reciente del usuario.

**Response:**
```json
{
  "success": true,
  "profile": {
    "userId": "123",
    "firstName": "Juan",
    "lastName": "Pérez",
    "version": 2,
    "createdAt": "2026-01-24T20:00:00Z",
    "updatedAt": "2026-01-24T21:00:00Z"
  }
}
```

### POST /api/profile
Crea un nuevo perfil de usuario.

**Request:**
```json
{
  "userId": "123",
  "login": "juanperez",
  "email": "juan@example.com",
  "firstName": "Juan",
  "lastName": "Pérez",
  "ageRange": "25-34",
  "educationLevel": "universitario",
  "educationStatus": "completed",
  "legalDisclaimerAccepted": true,
  "githubData": {
    "avatarUrl": "https://...",
    "username": "juanperez",
    "email": "juan@example.com"
  }
}
```

### PUT /api/profile
Actualiza un perfil existente.

**Request:**
```json
{
  "userId": "123",
  "firstName": "Juan Carlos",
  "educationLevel": "posgrado"
}
```

### DELETE /api/profile
Elimina un perfil (soft delete).

**Request:**
```json
{
  "userId": "123",
  "confirmation": "Delete"
}
```

## Costos y Límites

### Free Tier
- **Storage**: 500MB gratis
- **Bandwidth**: 100GB/mes gratis
- **Requests**: Ilimitados

### Capacidad Estimada
Con 500MB puedes almacenar aproximadamente:
- **650,000+ perfiles** (asumiendo ~750 bytes por perfil)
- **3-5 versiones por perfil** en promedio

### Upgrade (si es necesario)
- **Pro Plan**: $20/mes
  - 1TB storage
  - 1TB bandwidth/mes

## Seguridad

### Tokens
- **BLOB_READ_WRITE_TOKEN**: Nunca expongas este token en el frontend
- Solo úsalo en Vercel Functions (server-side)
- Rota el token si se compromete

### Access Control
- Los archivos se crean con `access: 'public'`
- Esto permite lectura pública pero escritura solo con token
- Para mayor seguridad, considera `access: 'private'` y signed URLs

### Validación
- Todos los datos se validan con Zod schemas antes de guardar
- Campos inmutables (userId, email) no se pueden cambiar
- Soft deletes para preservar audit trail

## Monitoreo

### Vercel Dashboard
1. Ve a **Storage** → **Blob**
2. Verás:
   - Total storage usado
   - Número de archivos
   - Bandwidth consumido
   - Últimas operaciones

### Analytics Queries

Para analizar los datos del data lake, puedes leer los archivos NDJSON y procesarlos:

```javascript
import { list } from '@vercel/blob';

async function getAnalytics() {
  const { blobs } = await list({ prefix: 'profiles/' });
  
  const stats = {
    totalProfiles: blobs.length,
    totalSize: blobs.reduce((sum, b) => sum + b.size, 0),
    // Más análisis...
  };
  
  return stats;
}
```

## Troubleshooting

### Error: "BLOB_READ_WRITE_TOKEN is not defined"
- Verifica que el token esté en `.env` (local) o en Vercel Environment Variables
- Reinicia el servidor de desarrollo después de agregar el token

### Error: "Failed to fetch blob"
- Verifica que el pathname sea correcto: `profiles/{userId}.ndjson`
- Asegúrate de que el archivo exista antes de leerlo

### Error: "Blob already exists"
- Usa `addRandomSuffix: false` en `put()` para sobrescribir
- O usa un pathname único por versión

## Migración Futura

Si necesitas migrar a otra solución:

1. **Exportar datos**: Descarga todos los archivos `.ndjson`
2. **Transformar**: Los archivos NDJSON son estándar y fáciles de procesar
3. **Importar**: Carga a la nueva plataforma (S3, Supabase, etc.)

El formato NDJSON garantiza portabilidad total.

## Recursos

- [Vercel Blob Docs](https://vercel.com/docs/storage/vercel-blob)
- [NDJSON Specification](http://ndjson.org/)
- [Zod Validation](https://zod.dev/)

## Soporte

Para problemas con Vercel Blob:
- [Vercel Support](https://vercel.com/support)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
