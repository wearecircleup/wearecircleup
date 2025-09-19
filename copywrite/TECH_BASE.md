# Circle Up — Mapa de Pipelines (lista por categoría)

Nota: Solo listado. Cada pipeline se documentará luego (propósito, entradas/salidas, criterios). "Stack" = principales servicios/SDKs implicados.

Criterio rápido de prioridad: Impacto en OKRs y Cumplimiento (legal/datos) > Urgencia > Esfuerzo (bajo mejor) > Dependencias. Niveles: Very High, High, Medium, Low.

## Content Generation & Document Pipelines
| Name | Actor | Usage (1 line) | Pipeline Flow | Stack | Priority | Tags | KPIs |
|---|---|---|---|---|---|---|---|
| Course Certification | Participant | Generate certificates after course completion and NPS survey | Calendly/Eventbrite API → Snowflake Stage → Container Volumes → Weasyprint → PDF Download | GitHub API + Snowflake Stage + Snowpark Container + Weasyprint | High | Data, Quality, Governance | Certificate Downloads, NPS ≥4.2, Survey Completion% |
| Volunteer Legal Documents | Volunteer | Generate legal agreements and compliance docs for download | Template Repository → Container Volumes → Weasyprint → PDF Download | GitHub API + Snowpark Container + Weasyprint | Medium | Legal, Governance, Compliance | Document Downloads, Volunteer Onboarding% |
| Course Slides Generation | Volunteer | Generate personalized slides for course delivery | Course Data → Template Repository → Container Volumes → Weasyprint → Content Output | GitHub API + Snowflake Stage + Snowpark Container + Weasyprint | Medium | Content Creation, Marketing | Slide Usage%, Volunteer Satisfaction |
| Social Media Assets | Volunteer | Generate marketing materials for course promotion | Course Metadata → Template Repository → Weasyprint → PDF → PDF2Image → Asset Download | GitHub API + Snowpark Container + Weasyprint + PDF2Image | Low | Marketing, Branding | Asset Downloads, Course Enrollment |

## User Management & Data Capture Pipelines
| Name | Actor | Usage (1 line) | Pipeline Flow | Stack | Priority | Tags | KPIs |
|---|---|---|---|---|---|---|---|
| User Authentication | Both | Snowflake-managed user authentication with RBAC and password policies | User Login → Snowflake Auth → RBAC Validation → Container Access | Snowflake Auth + RBAC + Password Policy + Container | High | Security, Governance | User Login Success%, Session Duration |
| User Registration | Both | Create Snowflake accounts via YouForm registration and GitHub Actions automation | YouForm Submission → API Extract → GitHub Actions → Snowflake Stage → Task → User Creation + RBAC | YouForm API + GitHub Actions + Snowflake Stage + Tasks + RBAC | Very High | Data, Governance, Legal | User Registration%, Account Creation Success% |
| Account Deletion | Both | User-initiated account deletion from container interface | User Request → Container UI → Snowflake User Deletion → Account Cleanup | Snowpark Container + Snowflake User Management | High | Data, Governance, Legal | Account Deletion Success%, Data Cleanup Compliance |
| Parental Consent Upload | Participant | Upload signed consent PDFs within container for minors (14+) | PDF Upload → Container Storage → Validation → Compliance Record | Snowpark Container + File Storage + Compliance Validation | Very High | Legal, DPA, Governance | Consent Upload%, Compliance Rate |
| Course Proposal Evaluation | Volunteer | Submit and iterate course proposals based on feedback and recommendations | Proposal Submission → Evaluation → Feedback → Resubmission Loop → Approval + Duration/Modality Record | Snowpark Container + Proposal Workflow + Approval System | Medium | Governance, Quality | Proposal Approval%, Iteration Cycles, Course Duration Tracking |

## Event & Survey Management Pipelines
| Name | Actor | Usage (1 line) | Pipeline Flow | Stack | Priority | Tags | KPIs |
|---|---|---|---|---|---|---|---|
| QR Event Check-in | Participant | Eventbrite QR-based attendance tracking | Event QR Scan → Eventbrite Registration → Attendance Record | Eventbrite API + QR System | High | Operations, Data | Attendance Rate, Check-in Success% |
| Post-Session NPS Survey | Participant | Complete mandatory NPS survey to unlock certificate download | Course Completion → NPS Form (YouForm/Streamlit) → Response Validation → Certificate Unlock | YouForm/Streamlit + NPS Processing + Certificate Pipeline | Very High | Data, Quality, Governance | NPS Score, Survey Completion%, Certificate Conversion Rate |

## Communication & Outreach Pipelines
| Name | Actor | Usage (1 line) | Pipeline Flow | Stack | Priority | Tags | KPIs |
|---|---|---|---|---|---|---|---|
| Meeting Reminders | Participant | Automated meeting reminders via Calendly/Eventbrite native features | Event Registration → Platform Native Reminder → Participant Notification | Calendly Standard Plan / Eventbrite Native | Low | Operations, Marketing | Attendance Rate, No-show% |

---

## Guía de diagramación (cómo y qué debe incluir cada diagrama)

### Estrategia general

| Nivel | Objetivo | Alcance | Tipo de diagrama más apropiado | Alternativos útiles | Entregable sugerido |
|---|---|---|---|---|---|
| Alto nivel (org) | Vista integral de dominios y flujos principales | Todos los grupos como "islas" y sus interacciones | Mindmap | C4 (L1) | `diagrams/00_mapa_general.mmd` |
| Por grupo de pipelines | Profundizar en cada grupo, entradas/salidas y dependencias | 1 categoría (p. ej., Content Generation/User Management/Event Management) | Mindmap | Flowchart, C4 (L2) | `diagrams/{grupo}/overview.mmd` |
| Requisitos y cumplimiento | Expresar requisitos legales/DPAs/controles y su relación con elementos | Requisitos, elementos, relaciones, riesgos | Requirement Diagram | C4 notas, Tablas de control | `diagrams/{grupo}/requirements.mmd` |
| Flujo de ejecución (clave) | Pasos, decisiones, idempotencia, reintentos | 1 pipeline crítico | Flowchart | Sequence Diagram | `diagrams/{grupo}/{pipeline}_flow.mmd` |
| Ciclo de vida | Estados y transiciones (usuarios, consentimientos) | Recursos con estados | State Diagram | Flowchart | `diagrams/{grupo}/{recurso}_states.mmd` |
| Arquitectura | Componentes, contenedores, límites de contexto | Snowpark Container, Snowflake, APIs, YouForm | C4 (L1-L3) | Block Diagram | `diagrams/{grupo}/architecture.mmd` |

Nota: Para este proyecto, priorizar Mindmap y Requirement Diagram. Usar Flowchart/State/C4 sólo donde sume claridad técnica.

### Grupos de diagramas y alcance

| Grupo | Objetivo del diagrama | Tipo primario | Tipos complementarios | Nodos mínimos | Relaciones clave |
|---|---|---|---|---|---|
| Content Generation | Origen de datos, plantillas, render, almacenamiento | Mindmap | Requirement, Flowchart | GitHub, Snowflake Stage, Container, Weasyprint | Datos → Template → Container → Output |
| User Management | Autenticación, registro, permisos, lifecycle | Mindmap | State, Requirement | Snowflake Auth, RBAC, YouForm, GitHub Actions | Registration → Auth → Access → Lifecycle |
| Event & Survey | Asistencia, encuestas, validación | Mindmap | Flowchart | Eventbrite, YouForm, Container | Event → Track → Survey → Validation |
| Communication | Recordatorios y notificaciones | Mindmap | Requirement | Calendly/Eventbrite Native | Registration → Reminder → Attendance |

### Etiquetas y metadatos comunes (aplicar a todos los diagramas)

| Campo | Descripción | Valores/Tipo | Obligatorio | Aplica a |
|---|---|---|---|---|
| Owner | Responsable funcional/técnico | Texto (persona/rol) | Sí | Nodo/Diagrama |
| Datos personales | ¿Procesa datos personales? | Sí/No | Sí | Nodo/Arista |
| Menores (14+) | ¿Afecta a menores? | Sí/No | Sí | Nodo/Arista |
| Base legal | Consentimiento/Contrato/Interés legítimo/Obligación legal | Enum | Sí (si trata datos) | Nodo |
| DPA/Encargo | ¿Existe acuerdo de tratamiento con terceros? | Sí/No/NA | Sí (si tercero) | Nodo |
| Retención | Tiempo y ubicación de conservación | Días/Meses/Años | Sí | Nodo |
| Clasificación de datos | Sensibilidad | Alto/Medio/Bajo | Sí | Nodo |
| Riesgo | Riesgo inherente | Alto/Medio/Bajo | Sí | Nodo/Diagrama |
| Controles | Controles aplicados (MFA, RBAC, cifrado, hashing) | Lista | Sí | Nodo |
| Registro/auditoría | Logs y trazabilidad | Sí/No + detalle | Sí | Arista/Nodo |
| SLA objetivo | Latencia/éxito p95 | ms/% | Recomendado | Pipeline |
| RTO/RPO | Recuperación (operación/datos) | min/h | Recomendado | Diagrama |
| Dependencias | Servicios externos críticos | Lista | Sí | Diagrama |
| Versionado | Versión de plantilla/código | SemVer | Recomendado | Nodo |
| Coste/mes | Estimación de coste | Moneda | Opcional | Diagrama |

### Parámetros técnicos mínimos por nodo/pipeline

| Parámetro | Descripción | Unidad | Fuente/ejemplo | Aplica a |
|---|---|---|---|---|
| Runtime/Compute | Entorno de ejecución | Nombre/clase | Snowpark Container/YouForm | Nodo |
| CPU/Memoria | Recursos asignados | vCPU/GB | Plan hosting / límites | Nodo |
| IOPS/Throughput | Capacidad de E/S | ops/s | Relevante en Snowflake/Container | Nodo |
| Concurrencia | Trabajos simultáneos esperados | # | p95 sesiones/eventos | Pipeline |
| QPS/Límites API | Lecturas/escrituras o llamadas | req/s / día | Cuotas YouForm/Eventbrite/GitHub | Arista |
| Tamaño payload | Tamaño típico/máx | KB/MB | PDFs/JSON | Arista |
| TTL/Expiración | Tiempo de validez (p. ej., sesión) | min/h | p. ej., 24h | Nodo |
| Retries/Backoff | Política de reintentos | count/estrategia | exponencial fijo | Pipeline |
| Idempotencia | Safe-retry y claves | Sí/No + clave | user_id, event_id | Pipeline |
| Timeouts | Corte por operación | s | 10s/30s | Arista |
| Latencia p95 | Medida o objetivo | ms | objetivo 800ms | Pipeline |
| Almacenamiento | Tipo/ubicación | Servicio/Ruta | Snowflake/Container Storage | Nodo |

### Requisitos (Requirement Diagram) — qué modelar

| Tipo de requisito | Uso en este proyecto | Ejemplos (texto) | Riesgo | Método de verificación |
|---|---|---|---|---|
| requirement | Obligaciones generales | "Las sesiones de usuario expiran a las 24h" | Medio | Test |
| functionalRequirement | Funcional esperado | "User Registration crea cuenta en Snowflake con RBAC" | Bajo | Demonstration |
| performanceRequirement | Rendimiento | "p95 < 800ms; < 5% reintentos" | Medio | Analysis |
| interfaceRequirement | Integración con APIs | "Usar YouForm/Eventbrite quotas y backoff" | Medio | Inspection |
| physicalRequirement | Artefactos físicos/almacenamiento | "PDFs se guardan en Container Storage" | Bajo | Inspection |
| designConstraint | Restricciones de diseño | "RBAC con principio de menor privilegio" | Alto | Inspection |

Relaciones recomendadas: satisfies (elemento cumple requisito), verifies (pruebas/monitoreo), traces (trazabilidad a políticas), contains/derives/refines (desglose de requisitos).

### Contenido por grupo — qué nodos/etiquetas no pueden faltar

| Grupo | Nodos obligatorios | Etiquetas específicas |
|---|---|---|
| Content Generation | GitHub (templates), Snowflake Stage, Snowpark Container, Weasyprint | PII: Variable, Versionado de template, Idempotencia (content_id) |
| User Management | Snowflake Auth, RBAC, YouForm, GitHub Actions, Container UI | PII: Sí, Menores: Posible, Base legal, Retención por tipo de cuenta, RBAC policies |
| Event & Survey | Eventbrite API, YouForm, Container validation, Certificate pipeline | PII: Sí, Menores: Posible, Idempotencia (event_id, survey_id) |
| Communication | Calendly/Eventbrite Native, Reminder systems | PII: Mínimo, Rate-limits nativos |

### Convenciones de nomenclatura y archivo

| Elemento | Convención | Ejemplo |
|---|---|---|
| Carpeta de diagramas | `diagrams/{grupo}/` | `diagrams/content_generation/` |
| Archivo overview | `{orden}_{nombre}.mmd` | `01_overview.mmd` |
| Archivo requisitos | `requirements.mmd` | `requirements.mmd` |
| Archivo flujo | `{pipeline}_flow.mmd` | `user_registration_flow.mmd` |
| Archivo estados | `{recurso}_states.mmd` | `user_lifecycle_states.mmd` |
| IDs de nodos | `{dominio}_{recurso}` snake | `auth_snowflake`, `container_storage` |

### Fuentes para completar metadatos técnicos

| Dato | Fuente sugerida | Nota |
|---|---|---|
| Cuotas YouForm/Eventbrite | Docs de APIs respectivas | Ver límites diarios y por minuto |
| Límites Snowflake | Docs Snowflake | Warehouse, Container, Auth limits |
| Plan de hosting | Snowpark Container specs | CPU/Mem/Storage |
| Logs de ejecución | Container logs / API logs | Calcular p95/errores |
| Costos | Consolas (Snowflake/APIs) | Estimar coste/mes |

Con esto, podemos crear un diagrama por grupo (Mindmap + Requirements) y uno global de alto nivel (Mindmap), dejando flujos/estados sólo para pipelines críticos.
