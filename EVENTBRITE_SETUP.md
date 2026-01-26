# Configuración de Eventbrite para Circle Up

Este documento explica cómo configurar la integración con Eventbrite para mostrar eventos en el Dashboard.

## Variables de Entorno Requeridas en Vercel

Debes agregar las siguientes variables de entorno en tu proyecto de Vercel:

### 1. `EVENTBRITE_PRIVATE_TOKEN`
- **Valor:** `BPLNPLBJBNXNER4TGUZE`
- **Descripción:** Token privado para autenticación server-side con la API de Eventbrite
- **Tipo:** Secret (mantener privado)
- **Uso:** Backend API calls en `/api/eventbrite-events.js`

### 2. `EVENTBRITE_ORGANIZATION_ID`
- **Valor:** Tu Organization ID de Eventbrite (obtenerlo del dashboard de Eventbrite)
- **Descripción:** ID de la organización Circle Up Volunteer en Eventbrite
- **Tipo:** Plain text
- **Uso:** Para obtener todos los eventos de la organización

## Cómo Obtener el Organization ID

1. Inicia sesión en Eventbrite: https://www.eventbrite.com
2. Ve a tu perfil de organización
3. El Organization ID aparece en la URL o en la configuración de la organización
4. Alternativamente, puedes obtenerlo usando la API:
   ```bash
   curl -X GET \
     https://www.eventbriteapi.com/v3/users/me/organizations/ \
     -H "Authorization: Bearer BPLNPLBJBNXNER4TGUZE"
   ```

## Credenciales Proporcionadas

```
API key: X6PICGWDJN33BUBMSB
Client secret: OUG7E3RFTGPAON7DB4G5GDD7NTLIUYXTKXV7SPVB6GSS76UW3G
Private token: BPLNPLBJBNXNER4TGUZE (USAR ESTE)
Public token: OVFF4AT7JGPKYF53YYWS
```

**IMPORTANTE:** Para esta integración, usamos el **Private Token** porque:
- Es más seguro para llamadas server-side
- No requiere OAuth flow
- Tiene acceso completo a los recursos de la organización

## Configuración en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega las siguientes variables:

```
Name: EVENTBRITE_PRIVATE_TOKEN
Value: BPLNPLBJBNXNER4TGUZE
Environment: Production, Preview, Development
```

```
Name: EVENTBRITE_ORGANIZATION_ID
Value: [TU_ORGANIZATION_ID]
Environment: Production, Preview, Development
```

## Estructura de la Integración

### Backend (Serverless Function)
- **Archivo:** `/api/eventbrite-events.js`
- **Endpoint:** `GET /api/eventbrite-events`
- **Autenticación:** Bearer token (Private Token)
- **API de Eventbrite:** `https://www.eventbriteapi.com/v3/organizations/{org_id}/events/`

### Frontend
- **Componente principal:** `src/components/dashboard/EventsTab.jsx`
- **Card de evento:** `src/components/EventCard.jsx`
- **Tab en Dashboard:** "Eventos" (entre Presentaciones y Perfil)

## Funcionalidades

- ✅ Muestra todos los eventos activos (status: live)
- ✅ Ordenados por fecha de inicio (próximos primero)
- ✅ Información completa: fecha, hora, ubicación, descripción
- ✅ Botón "Ver en Eventbrite" que abre el evento en nueva pestaña
- ✅ Badges de estado: Próximo, En curso, Finalizado
- ✅ Badge "Gratis" para eventos sin costo
- ✅ Soporte para eventos presenciales y en línea
- ✅ Responsive design (mobile-first)

## API de Eventbrite - Endpoints Usados

### Obtener eventos de organización
```
GET https://www.eventbriteapi.com/v3/organizations/{organization_id}/events/
```

**Parámetros:**
- `status=live` - Solo eventos activos
- `order_by=start_asc` - Ordenar por fecha de inicio
- `expand=venue,ticket_availability` - Incluir detalles de ubicación y disponibilidad

**Headers:**
```
Authorization: Bearer {EVENTBRITE_PRIVATE_TOKEN}
Content-Type: application/json
```

## Documentación de Referencia

- **Autenticación:** https://www.eventbrite.com/platform/docs/authentication
- **API Basics:** https://www.eventbrite.com/platform/docs/api-basics
- **Events API:** https://www.eventbrite.com/platform/api#/reference/event

## Testing Local

Para probar localmente:

1. Crea un archivo `.env` en la raíz del proyecto
2. Agrega las variables:
   ```
   EVENTBRITE_PRIVATE_TOKEN=BPLNPLBJBNXNER4TGUZE
   EVENTBRITE_ORGANIZATION_ID=[TU_ORG_ID]
   ```
3. Reinicia el servidor de desarrollo
4. Ve a Dashboard → Tab "Eventos"

## Troubleshooting

### Error: "Eventbrite integration not configured"
- Verifica que las variables de entorno estén configuradas en Vercel
- Asegúrate de que el deployment se haya realizado después de agregar las variables

### Error: "Failed to fetch events from Eventbrite"
- Verifica que el Private Token sea correcto
- Verifica que el Organization ID sea correcto
- Revisa los logs de Vercel para más detalles

### No aparecen eventos
- Verifica que la organización tenga eventos con `status=live`
- Los eventos pasados no se mostrarán
- Revisa la consola del navegador para errores

## Seguridad

⚠️ **IMPORTANTE:**
- El Private Token NUNCA debe exponerse en el frontend
- Todas las llamadas a Eventbrite se hacen desde el backend (serverless function)
- El token se almacena como variable de entorno en Vercel (encriptado)
- No commitear el `.env` al repositorio (está en `.gitignore`)
