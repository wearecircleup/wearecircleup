# Política de Desarrollo y Acceso a Herramientas — Circle Up Volunteers

Versión: 1.0  
Vigencia: 2025-10-01

Esta política define cómo habilitamos a las personas voluntarias para crear y entregar experiencias de calidad con cero fricción operativa. La prioridad es proteger su tiempo y maximizar su experiencia: las UV totales por ciclo (onboarding→ejecución) son ≤ 5 horas, donde la ejecución participa con 1.5–2 horas; el resto se orienta a preparación ligera (no a producir materiales desde cero).

---

## 1) Propósito
- Quitar carga operativa y técnica al voluntariado mediante acceso ágil y automatizaciones.  
- Proveer una “biblioteca viva” de materiales base remezclables y assets listos.  
- Convertir tareas de producción en procesos automatizados (render, PDFs, publicación), preservando calidad.

---

## 2) Principios no negociables
- Zero-burden provisioning: coordinación hace el trabajo pesado (accesos, plantillas, assets y ejecución de pipelines).  
- Automatiza > plantilla: preferimos trabajos automatizados (WeasyPrint, GitHub Pipelines) sobre formatos manuales.  
- Customización mínima: el voluntariado ajusta parámetros simples o bloques de personalización, no construye todo.  
- Seguridad y privacidad por diseño: mínimo privilegio, separación de roles y manejo responsable de datos.  
- Simplicidad: una página por guía, un único “single drop” para insumos (sin resubidas múltiples).

---

## 3) Arquitectura operativa de herramientas
- Contenedor de producción (Snowflake):  
  - Generación de PDFs con WeasyPrint (insumos: slides/Markdown; salidas: handouts, certificados, materiales).  
  - Orquestación de jobs/tareas para ejecutar pipelines (o disparar GitHub Actions) desde un punto central.  
  - Stage de assets (logos, plantillas, fuentes) y repositorio de materiales curados.  
- Pipelines de GitHub (coordinación):  
  - Render de materiales, actualización de biblioteca y publicación de assets.  
  - Runners gestionados por coordinación; disparo automático por cambios/fechas T-48h/T-24h.  
- Herramientas de entrega y soporte: Google Slides/Cloud, Calendly, Eventbrite/Lu.ma, YouForm, Jellypod, Deepgram.  
- Resultado: quien facilita solo elige material base, ajusta 1–2 parámetros y dedica su tiempo a pedagogía y práctica.

---

## 4) Roles y responsabilidades
- Coordinación:  
  - Provisionar accesos en ≤ 24 h.  
  - Pre-cargar assets y plantillas; mantener la biblioteca viva.  
  - Ejecutar pipelines y resolver bloqueos técnicos en ≤ 48 h.  
- Voluntariado:  
  - Seleccionar material base; definir objetivo y práctica central (diseño 1–1–1).  
  - Solicitar apoyo cuando lo requiera; enfocar tiempo en facilitar práctica y crítica que construye.

---

## 5) Flujos de uso típicos
- Materiales: seleccionar curso base → aportar insumos en un único “single drop” → pipeline genera slides/PDF → revisión rápida → listo.  
- Certificados/handouts: pipeline ejecuta WeasyPrint con datos mínimos → entrega automática post-evento.  
- Audio/transcripción: Jellypod/Deepgram gestionados por coordinación; voluntariado no opera herramientas.

---

## 6) SLAs y límites operativos
- Accesos listos: ≤ 24 h desde confirmación.  
- Ejecución de pipeline: ≤ 60 min por corrida (objetivo).  
- Materiales T-48h: assets y slides finales listos 48 h antes del evento.  
- Carga del voluntariado: preparación ≤ 60 min; total ciclo ≤ 5 h (ejecución 1.5–2 h).

---

## 7) Métricas guía (informan, no sancionan)
- Satisfacción con herramientas ≥ 4.3.  
- Tiempo de preparación (mediana) ≤ 60 min.  
- Tasa de automatización (materiales generados vía pipeline) ≥ 80%.  
- Incidentes técnicos resueltos en ≤ 48 h ≥ 90%.

---

## 8) Salvaguardas y cumplimiento
- Licencias y propiedad intelectual: uso de plantillas y assets conforme a licencias; citar fuentes.  
- Datos personales: mínimos necesarios para certificados/evidencias; ver `policies/politica-privacidad.md`.  
- Conducta y seguridad: coherencia con `policies/codigo-conducta.md` y salvaguarda (menores).  
- Credenciales: personales e intransferibles; prohibido compartir o eludir controles.

---

## 9) Integración con operaciones
- Mapeo con `OPERATIONS.md`: “Development & Tools Access Flow” y “Post-Execution & Recognition Flow”.  
- Conecta con `core/01-politica-modelo-educativo.md` (calidad sin burocracia) y `core/02-politica-reenganche-voluntariado.md` (rampa y pertenencia).

---

## 10) Gobernanza y actualización
- Custodia: coordinación de herramientas y contenidos.  
- Revisión: semestral o ante cambios en herramientas.  
- Cambios: priorizar mejoras que reduzcan fricción y aumenten el tiempo dedicado a pedagogía y práctica.
