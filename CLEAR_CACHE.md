# Limpiar Cache Completamente

## Problema
Ves "Ver Perfil" aunque no has creado un perfil porque localStorage tiene datos obsoletos de Vercel Blob.

## Solución

### Paso 1: Abrir DevTools
Presiona **F12** o **Ctrl+Shift+I**

### Paso 2: Ir a Console
Haz clic en la pestaña **Console**

### Paso 3: Ejecutar este código
Copia y pega este código completo en la consola:

```javascript
// Limpiar TODO localStorage
localStorage.clear();

// Limpiar sessionStorage
sessionStorage.clear();

// Limpiar cookies
document.cookie.split(";").forEach(function(c) { 
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
});

// Confirmar limpieza
console.log('✅ Cache completamente limpiado');
console.log('localStorage items:', localStorage.length);
console.log('sessionStorage items:', sessionStorage.length);

// Recargar página
location.reload();
```

### Paso 4: Verificar
Después de recargar, deberías ver:
- ✅ CTA "CREAR PERFIL" (NO "Ver Perfil")
- ✅ Sin error 500 en la consola
- ✅ Formulario de registro al hacer clic en "CREAR PERFIL"

## Si aún ves "Ver Perfil"

Cierra y abre el navegador completamente (no solo la pestaña).
