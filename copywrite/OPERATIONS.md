# OPERATIONS — CircleUp Volunteers

Manual operativo completo para ejecutar, medir y escalar el aprendizaje comunitario basado en voluntariado. Incluye flujos detallados, arquitectura de datos, protocolos de seguridad y estrategias de crecimiento.

---

## Principios de operación
- **Claridad**: cada paso tiene un responsable, un SLA y una métrica.
- **Medición continua**: instrumentación desde el primer contacto hasta el reenganche.
- **Seguridad por diseño**: protocolos de salvaguarda, consentimiento y manejo de datos.
- **Alianzas escalables**: MOUs estandarizados por tipo de espacio con términos claros.
- **Eficiencia de costos**: automatización donde sea posible, intervención humana donde agregue valor.

---

# Event Process Flow Diagrams
## Flujo Participantes (Journey Completo)

## 1. Discovery Flow

**Descubrimiento (Acquisition)**
- Instagram: 3-4 posts/semana + Stories diarias con stickers de acción. UTM por campaña.
- WhatsApp Broadcast: listas segmentadas por sede/tema. Máximo 2 mensajes/semana.
- Volanteo físico: QR codes únicos por sede para tracking.
- Referidos: programa de incentivos para aliados (reconocimiento público).
- SEO local: optimización para "cursos gratuitos [ciudad]" y "aprendizaje comunitario".

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    D1("Instagram Stories/Posts")
    D4("Referidos de aliados")
    D5("Voz a Voz")
    D6("Búsqueda orgánica")
    UTM("UTM Tracking")
    NEXT("→ INSCRIPCIÓN")
    
    D1 e1@--> UTM
    D4 e2@--> UTM
    D5 e3@--> UTM
    D6 e4@--> UTM
    UTM e5@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef nextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class D1,D4,D5,D6,UTM flowStyle
    class NEXT nextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
```

*_Multi-channel discovery approach with comprehensive tracking capabilities for lead generation optimization_*

## 2. Registration Flow

**Inscripción (Activation)**
- YouForm: formulario de 4 campos máximo (nombre, email, WhatsApp, consentimiento).
- Eventbrite/Lu.ma: integración automática con Calendly para recordatorios.
- Email bienvenida: plantilla con expectativas, ubicación, qué llevar.
- WhatsApp: adición automática a grupo de la sede (máximo 50 personas por grupo).

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("DESCUBRIMIENTO →")
    R1("YouForm")
    R2("Consentimiento")
    R3("PickUp Curso/Sede")
    R4("Eventbrite")
    R5("Email Bienvenida")
    NEXT("→ PRE-EVENTO")
    
    PREV e1@--> R1
    
    R1 e2@--> R2
    R1 e3@--> R3
    
    R2 e4@--> R4
    R3 e5@--> R4
    
    R4 e6@--> R5
    R5 e7@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class R1,R2,R3,R4,R5 flowStyle
    class PREV,NEXT prevNextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
```

*_Streamlined registration process with automated confirmation and communication setup for enhanced user experience_*

## 3. Pre-Event Flow

**Pre-evento (Retention)**
- T-48h: email con agenda detallada y preparación.
- T-24h: WhatsApp con confirmación obligatoria ("Responde SÍ si asistes").
- T-3h: push notification o SMS de recordatorio final.
- Lista de espera: activación automática si confirmaciones < 70% del aforo.

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("INSCRIPCIÓN →")
    PE2("Reminder T-48h Email / T-24h / T-3h Push/SMS")
    PE4{"Confirmación Asistencia"}
    PE5("Lista confirmados")
    PE6("Lista de espera activada")
    PE7("Reasignación automática")
    NEXT("→ DÍA DEL EVENTO")
    
    PREV e1@--> PE2
    PE2 e2@--> PE4
    PE4 e3@-->|Sí| PE5
    PE4 e4@-->|No| PE6
    PE6 e5@--> PE7
    PE5 e6@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef decisionStyle fill:#f39c12,stroke:#f39c12,stroke-width:3px,color:#ffffff,rx:10,ry:10
    
    class PE2,PE5,PE6,PE7 flowStyle
    class PE4 decisionStyle
    class PREV,NEXT prevNextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
```

*_Intelligent reminder system with automated waitlist management and dynamic capacity optimization_*

## 4. Event Day Flow

**Día del evento (Engagement)**
- Check-in: QR individual o lista física con firma.
- Cafés: validación de ticket mínimo (5,000-8,000 COP según MOU).
- Espacios públicos: registro simple, verificación de capacidad.
- Empresas/colegios: gafete o autorización previa del responsable local.
- Evidencias: 3-5 fotos por sesión, lista de asistencia firmada.

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("PRE-EVENTO →")
    ED1("Check-in QR/Lista")
    ED2{"Tipo de espacio"}
    ED3("Validar ticket consumo mínimo")
    ED4("Ingreso libre")
    ED5("Validar autorización/gafete")
    ED6("Registro Asistencia")
    ED7("Sesión")
    ED8("Record Audio Evidencias")
    NEXT("→ POST-EVENTO")
    
    PREV e1@--> ED1
    ED1 e2@--> ED2
    ED2 e3@-->|Café| ED3
    ED2 e4@-->|Público/Biblioteca| ED4
    ED2 e5@-->|Colegio/Empresa| ED5
    ED3 e6@--> ED6
    ED4 e7@--> ED6
    ED5 e8@--> ED6
    ED6 e9@--> ED7
    ED7 e10@--> ED8
    ED8 e11@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef decisionStyle fill:#f39c12,stroke:#f39c12,stroke-width:3px,color:#ffffff,rx:10,ry:10
    
    class ED1,ED3,ED4,ED5,ED6,ED7,ED8 flowStyle
    class ED2 decisionStyle
    class PREV,NEXT prevNextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
    e8@{ animate: true }
    e9@{ animate: true }
    e10@{ animate: true }
    e11@{ animate: true }
```

*_Flexible venue-based access control with comprehensive attendance tracking and evidence collection protocols_*

## 5. Post-Event Flow

**Post-evento (Advocacy)**
- NPS: encuesta de 3 preguntas máximo enviada inmediatamente al finalizar.
- Certificado: generación automática con Weasyprint si NPS ≥ 4.0.
- Materiales: email con slides, recursos adicionales y próximos cursos.
- Remarketing: segmentación automática (promotores, neutros, detractores).

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("DÍA DEL EVENTO →")
    POST1("NPS obligatorio")
    POST2{"NPS >= 4.0"}
    POST3("Certificado digital disponible")
    POST4("Feedback cualitativo")
    POST5("Email con materiales")
    POST6("Invitación próximos cursos")
    POST7("Segmentación para remarketing")
    NEXT("→ DESCUBRIMIENTO")
    
    PREV e1@--> POST1
    POST1 e2@--> POST2
    POST2 e3@-->|Sí| POST3
    POST2 e4@-->|No| POST4
    POST3 e5@--> POST5
    POST4 e6@--> POST5
    POST5 e7@--> POST6
    POST6 e8@--> POST7
    POST7 e9@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef decisionStyle fill:#f39c12,stroke:#f39c12,stroke-width:3px,color:#ffffff,rx:10,ry:10
    
    class POST1,POST3,POST4,POST5,POST6,POST7 flowStyle
    class POST2 decisionStyle
    class PREV,NEXT prevNextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
    e8@{ animate: true }
    e9@{ animate: true }
```

*_Quality-driven feedback collection with automated certification delivery and intelligent remarketing segmentation_*

## Overall Process Flow

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    A("DESCUBRIMIENTO")
    B("INSCRIPCIÓN")
    C("PRE-EVENTO")
    D("DÍA DEL EVENTO")
    E("POST-EVENTO")
    
    A e1@--> B
    B e2@--> C
    C e3@--> D
    D e4@--> E
    E e5@--> A
    
    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10

    class A,B,C,D,E flowStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
```

*_End-to-end event lifecycle management with continuous improvement feedback loop for sustained engagement_*

### KPIs y SLAs del flujo
- **Conversión**: UTM→Registro ≥ 15%; Registro→Asistencia ≥ 75%.
- **Calidad**: NPS ≥ 4.2; satisfacción ≥ 4.3; quejas ≤ 2%.
- **Operación**: ocupación ≥ 70%; no-show ≤ 10%; tiempo check-in ≤ 5 min/persona.
- **Crecimiento**: reenganche ≥ 35%; referidos ≥ 20%; crecimiento orgánico ≥ 10%/mes.

---

## Flujo Voluntarios (Lifecycle Management)

# Volunteer Lifecycle Management Flow Diagrams

## 1. Recruitment Flow

**Reclutamiento (Talent Acquisition)**
- Instagram: campañas segmentadas por perfil profesional y geográfico.
- Referidos: programa de incentivos (reconocimiento + acceso temprano a nuevas herramientas).
- Universidades: partnerships con carreras afines (educación, comunicación, ingeniería).
- Screening: entrevista de 15 min + verificación de antecedentes básicos.

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    REC1("Convocatoria Instagram")
    REC2("Formulario de interés")
    REC3("Referidos de voluntarios")
    REC4("Partnerships universidades")
    REC5("Screening inicial")
    REC6{"Perfil adecuado"}
    REC7("Invitación a onboarding")
    REC8("Pool de espera")
    NEXT("→ ONBOARDING")
    
    REC1 e1@--> REC2
    REC3 e2@--> REC2
    REC4 e3@--> REC2
    REC2 e4@--> REC5
    REC5 e5@--> REC6
    REC6 e6@-->|Sí| REC7
    REC6 e7@-->|No| REC8
    REC7 e8@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef decisionStyle fill:#f39c12,stroke:#f39c12,stroke-width:3px,color:#ffffff,rx:10,ry:10
    
    class REC1,REC2,REC3,REC4,REC5,REC7,REC8 flowStyle
    class REC6 decisionStyle
    class NEXT prevNextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
    e8@{ animate: true }
```

*_Multi-channel volunteer acquisition strategy with intelligent screening and qualification pipeline management_*

## 2. Onboarding Flow

**Onboarding (Capability Building)**
- Módulo 1: misión, valores, teoría de cambio (45 min).
- Módulo 2: código de conducta, políticas de marca (30 min).
- Módulo 3: protección de menores, salvaguarda, manejo de crisis (60 min).
- Módulo 4: herramientas digitales, accesos, primeros pasos (45 min).
- Evaluación: quiz de 20 preguntas + caso práctico.

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("RECLUTAMIENTO →")
    ON1("**Modulos 1-4** Misión / Valores / Código de Conducta / Protección Menores / Uso de Herramientas")
    ON5("Evaluación")
    ON6{"Aprobado"}
    ON7("Acceso Herramientas")
    ON8("Re-evaluación")
    NEXT("→ DESARROLLO")
    
    PREV e1@--> ON1
    ON1 e2@--> ON5
    ON5 e3@--> ON6
    ON6 e4@-->|Sí| ON7
    ON6 e5@-->|No| ON8
    ON7 e6@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef decisionStyle fill:#f39c12,stroke:#f39c12,stroke-width:3px,color:#ffffff,rx:10,ry:10

    class ON1,ON5,ON7,ON8 flowStyle
    class ON6 decisionStyle
    class PREV,NEXT prevNextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
```

*_Comprehensive educational program with ethics training and competency validation for volunteer readiness_*

## 3. Development & Tools Access Flow

**Desarrollo (Tool Mastery)**
- Auth0: acceso único a todas las herramientas.
- Canva: plantillas personalizadas por tipo de curso.
- Google Slides + Cloud: 100 GB de almacenamiento por voluntario.
- Weasyprint: generación automática de certificados y handouts.
- YouForm API: creación de formularios personalizados.
- Jellypod: publicación directa a Spotify sin hosting.
- Deepgram: transcripción automática de sesiones.
- Calendly: integración con Eventbrite para gestión de horarios.

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("ONBOARDING →")
    DEV3("Google Slides / Weasyprint / YouForm API / Jellypod Podcasts / Deepgram / Calendly")
    NEXT("→ PROPUESTA")
    
    PREV e1@--> DEV3
    DEV3 e2@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class DEV3 flowStyle
    class PREV,NEXT prevNextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
```

*_Technology stack provisioning with integrated digital toolkit for content creation and course management_*

## 4. Course Proposal Flow

**Propuesta de curso (Content Creation)**
- Formato estándar: título, descripción, objetivos, metodología, recursos, evaluación.
- Syllabus: estructura de 2-4 horas con bloques de 30-45 min.
- Objetivos SMART: específicos, medibles, alcanzables.
- Metodología: balance teoría/práctica 30/70.
- Recursos: máximo 3 herramientas/plataformas externas.

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("DESARROLLO →")
    PROP1("Formato estándar")
    PROP2("Syllabus / Objetivos SMART / Metodología")
    PROP5("Evaluación y Evidencias")
    PROP6("Envío para Revisión")
    NEXT("→ REVISIÓN")
    
    PREV e1@--> PROP1
    
    PROP1 e2@--> PROP2
    PROP1 e3@--> PROP5
    
    PROP2 e4@--> PROP6
    PROP5 e5@--> PROP6
    
    PROP6 e6@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class PROP1,PROP2,PROP5,PROP6 flowStyle
    class PREV,NEXT prevNextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
```

*_Structured course design framework with comprehensive pedagogical planning and assessment criteria_*

## 5. Review & Approval Flow

**Revisión y aprobación (Quality Assurance)**
- Asignación automática de revisor según expertise.
- Rúbrica de 10 criterios (claridad, relevancia, factibilidad, etc.).
- Feedback estructurado en máximo 48 horas.
- Máximo 2 rondas de ajustes antes de escalamiento.
- Aprobación final por coordinador académico.

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("PROPUESTA →")
    REV1("Asignación Revisor/ Rúbrica")
    REV2("Feedback Estructurado")
    REV4{"Requiere ajustes"}
    REV5("Solicitud de cambios")
    REV6("Aprobación final")
    REV7("Programación en calendario")
    NEXT("→ EJECUCIÓN")
    BACK("← PROPUESTA")
    
    PREV e1@--> REV1
    REV1 e2@--> REV2
    REV2 e3@--> REV4
    REV4 e4@-->|Sí| REV5
    REV4 e5@-->|No| REV6
    REV5 e6@--> BACK
    REV6 e7@--> REV7
    REV7 e8@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef decisionStyle fill:#f39c12,stroke:#f39c12,stroke-width:3px,color:#ffffff,rx:10,ry:10
    classDef backStyle fill:#e91e63,stroke:#e91e63,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class REV1,REV2,REV5,REV6,REV7 flowStyle
    class REV4 decisionStyle
    class PREV,NEXT prevNextStyle
    class BACK backStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
    e8@{ animate: true }
```

*_Quality assurance process with peer review system and iterative improvement cycle for content excellence_*

## 6. Execution Flow

**Ejecución (Delivery Excellence)**
- Asignación de sede según disponibilidad y perfil del curso.
- Publicación automática en redes con plantillas predefinidas.
- Gestión de inscripciones con límites y listas de espera.
- Kit de materiales físicos (marcadores, papel, stickers).
- Protocolo de inicio: check-in, expectativas, reglas básicas.
- Captura obligatoria: 3-5 fotos, lista firmada, evidencias de aprendizaje.

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("REVISIÓN →")
    EXE1("Asignación de Sede / Publicación Curso")
    EXE3("Difusión en Redes")
    EXE4("Gestión de Inscripciones")
    EXE5("Preparación de materiales")
    EXE6("Ejecución Presencial/Virtual")
    EXE7("Captura Audio Records")
    EXE8("Encuesta NPS")
    NEXT("→ POST-EJECUCIÓN")
    
    PREV e1@--> EXE1
    
    EXE1 e2@--> EXE3
    EXE1 e3@--> EXE4
    EXE1 e4@--> EXE5
    
    EXE3 e5@--> EXE6
    EXE4 e6@--> EXE6
    EXE5 e7@--> EXE6
    
    EXE6 e8@--> EXE7
    EXE7 e9@--> EXE8
    EXE8 e10@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class EXE1,EXE3,EXE4,EXE5,EXE6,EXE7,EXE8 flowStyle
    class PREV,NEXT prevNextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
    e8@{ animate: true }
    e9@{ animate: true }
    e10@{ animate: true }
```

*_End-to-end course delivery management with marketing automation and performance measurement integration_*

## 7. Post-Execution & Recognition Flow

**Post-ejecución (Impact Measurement)**
- Subida inmediata de materiales a repositorio compartido.
- Generación automática de podcast con Jellypod.
- Transcripción y etiquetado con Deepgram.
- Actualización de métricas en Snowflake.
- Feedback 1:1 con coordinador en máximo 7 días.
- Reconocimiento público en redes si NPS ≥ 4.5.
- Planificación de siguiente edición si demanda ≥ lista de espera.

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("EJECUCIÓN →")
    POST1("Subida de materiales")
    POST2("Generación de podcast")
    POST3("Transcripción automática")
    POST4("Actualización en Snowflake")
    POST5("Feedback 1:1 Coordinador")
    POST6("Reconocimiento")
    POST7("Planificación Próxima Edición")
    CYCLE("→ RECLUTAMIENTO")
    
    PREV e1@--> POST1
    
    POST1 e2@--> POST2
    POST1 e3@--> POST3
    POST1 e4@--> POST5
    
    POST2 e5@--> POST4
    POST3 e6@--> POST4
    POST5 e7@--> POST6
    
    POST4 e8@--> POST7
    POST6 e9@--> POST7
    
    POST7 e10@--> CYCLE

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef cycleStyle fill:#e91e63,stroke:#e91e63,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class POST1,POST2,POST3,POST4,POST5,POST6,POST7 flowStyle
    class PREV prevNextStyle
    class CYCLE cycleStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
    e8@{ animate: true }
    e9@{ animate: true }
    e10@{ animate: true }
```

*_Automated content processing with data analytics integration and volunteer recognition system for continuous engagement_*

## 8. Scholarships (Becas Educativas) Flow

**Reconocimiento (Semestral)**
- Selección semestral conforme a `policies/becas-educativas.md`.
- Uso personal e intransferible; cumplimiento de TOS del proveedor (p. ej., `policies/platzi.md`).

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("POST-EJECUCIÓN →")
    SCH1("Cierre semestral")
    SCH2("Recolección métricas UV/NPS/TAE")
    SCH3("Shortlist Voluntario/Participantes")
    SCH4("Revisión Comité + Conducta")
    SCH5{"Elegibles y disponibles"}
    SCH6("Notificación ganadores")
    SCH7("Activación accesos plataforma")
    SCH8("Pool de espera / Ampliar shortlist")
    NEXT("→ RECLUTAMIENTO")

    PREV e1@--> SCH1
    SCH1 e2@--> SCH2
    SCH2 e3@--> SCH3
    SCH3 e4@--> SCH4
    SCH4 e5@--> SCH5
    SCH5 e6@-->|Sí| SCH6
    SCH5 e7@-->|No| SCH8
    SCH6 e8@--> SCH7
    SCH7 e9@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef nextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef decisionStyle fill:#f39c12,stroke:#f39c12,stroke-width:3px,color:#ffffff,rx:10,ry:10
    
    class SCH1,SCH2,SCH3,SCH4,SCH6,SCH7,SCH8 flowStyle
    class SCH5 decisionStyle
    class PREV,NEXT nextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
    e8@{ animate: true }
    e9@{ animate: true }
```

*_Flujo semestral de selección y activación de becas educativas, alineado con `policies/becas-educativas.md` y TOS de plataformas proveedoras_* 

## Overall Volunteer Lifecycle

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    A("RECLUTAMIENTO")
    B("ONBOARDING")
    C("DESARROLLO")
    D("PROPUESTA")
    E("REVISIÓN")
    F("EJECUCIÓN")
    G("POST-EJECUCIÓN")
    
    A e1@--> B
    B e2@--> C
    C e3@--> D
    D e4@--> E
    E e5@--> F
    F e6@--> G
    G e7@--> A
    E e8@--> D
    
    classDef processStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10

    class A,B,C,D,E,F,G processStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
    e8@{ animate: true }
```

*_Complete volunteer journey management with iterative improvement cycles and sustainable engagement framework_*

### KPIs y SLAs del flujo
- **Reclutamiento**: tiempo de screening ≤ 5 días; tasa de aprobación ≥ 60%.
- **Onboarding**: tiempo de completación ≤ 14 días; tasa de aprobación ≥ 85%.
- **Desarrollo**: tiempo de acceso a herramientas ≤ 24 horas; uso efectivo ≥ 80%.
- **Propuestas**: tiempo de revisión ≤ 48 horas; tasa de aprobación primera ronda ≥ 70%.
- **Ejecución**: UV ≥ 5 h/mes; NPS curso ≥ 4.2; puntualidad ≥ 95%.
- **Post-ejecución**: entrega de materiales ≤ 24 horas; feedback ≤ 7 días.

---

## Flujo Espacios y Aliados (Partnership Management)

## 1. Space Identification Flow

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    START("INICIO")
    ID1("Mapeo de espacios potenciales")
    ID2("Evaluación de criterios")
    ID3("Contacto inicial")
    ID4("Presentación de propuesta")
    ID5{"Interés confirmado"}
    ID6("Avance a negociación")
    ID7("Pool de seguimiento")
    NEXT("→ NEGOCIACIÓN")
    
    START e1@--> ID1
    START e2@--> ID2
    
    ID1 e3@--> ID3
    ID2 e4@--> ID3
    
    ID3 e5@--> ID4
    ID4 e6@--> ID5
    ID5 e7@-->|Sí| ID6
    ID5 e8@-->|No| ID7
    ID6 e9@--> NEXT
    
    classDef identificationStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef decisionStyle fill:#f39c12,stroke:#f39c12,stroke-width:3px,color:#ffffff,rx:10,ry:10
    classDef nextStep fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class ID1,ID2,ID3,ID4,ID6,ID7 identificationStyle
    class ID5 decisionStyle
    class NEXT nextStep
    class START nextStep
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
    e8@{ animate: true }
    e9@{ animate: true }
```

*_Strategic partner discovery and qualification process with systematic evaluation and lead nurturing pipeline_*

## 2. Negotiation & MOU Flow

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("IDENTIFICACIÓN →")
    NEG1{"Tipo de espacio"}
    NEG2("MOU básico sin costo")
    NEG3("MOU educativo + salvaguarda")
    NEG4("MOU patrocinio/in-company")
    NEG5("MOU comercial + ticket mínimo")
    NEG6("Revisión legal básica")
    NEG7("Firma de MOU")
    NEXT("→ CONFIGURACIÓN")
    
    PREV e1@--> NEG1
    NEG1 e2@-->|Público/Biblioteca| NEG2
    NEG1 e3@-->|Colegio| NEG3
    NEG1 e4@-->|Empresa| NEG4
    NEG1 e5@-->|Café| NEG5
    NEG2 e6@--> NEG6
    NEG3 e7@--> NEG6
    NEG4 e8@--> NEG6
    NEG5 e9@--> NEG6
    NEG6 e10@--> NEG7
    NEG7 e11@--> NEXT

    classDef negotiationStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef decisionStyle fill:#f39c12,stroke:#f39c12,stroke-width:3px,color:#ffffff,rx:10,ry:10
    classDef nextStep fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class NEG2,NEG3,NEG4,NEG5,NEG6,NEG7 negotiationStyle
    class NEG1 decisionStyle
    class PREV nextStep
    class NEXT nextStep
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
    e8@{ animate: true }
    e9@{ animate: true }
    e10@{ animate: true }
    e11@{ animate: true }
```

*_Flexible partnership structure with customized legal agreements based on venue type and business model requirements_*

## 3. Setup & Configuration Flow

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("NEGOCIACIÓN →")
    SET1("Definición de agenda")
    SET2("Asignación de responsable local")
    SET3("Configuración de espacios")
    SET4("Protocolos de seguridad")
    SET5("Plan de comunicación")
    SET6("Capacitación del personal")
    NEXT("→ OPERACIÓN")
    
    PREV e1@--> SET1
    
    SET1 e2@--> SET2
    SET1 e3@--> SET3
    SET1 e4@--> SET4
    SET1 e5@--> SET5
    
    SET2 e6@--> SET6
    SET3 e7@--> SET6
    SET4 e8@--> SET6
    SET5 e9@--> SET6
    
    SET6 e10@--> NEXT

    classDef setupStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef nextStep fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class SET1,SET2,SET3,SET4,SET5,SET6 setupStyle
    class PREV nextStep
    class NEXT nextStep
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
    e8@{ animate: true }
    e9@{ animate: true }
    e10@{ animate: true }
```

*_Comprehensive onboarding and operational readiness preparation with safety protocols and staff training integration_*

## 4. Operations & Event Management Flow

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("CONFIGURACIÓN →")
    OP1("Programación de cursos")
    OP2("Difusión conjunta")
    OP3("Gestión de inscripciones")
    OP4("Preparación de sede")
    OP5("Ejecución del evento")
    OP6("Limpieza y cierre")
    OP7("Registro de incidencias")
    NEXT("→ EVALUACIÓN")
    
    PREV e1@--> OP1
    
    OP1 e2@--> OP2
    OP1 e3@--> OP3
    OP1 e4@--> OP4
    
    OP2 e5@--> OP5
    OP3 e6@--> OP5
    OP4 e7@--> OP5
    
    OP5 e8@--> OP6
    OP5 e9@--> OP7
    
    OP6 e10@--> NEXT
    OP7 e11@--> NEXT

    classDef operationsStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef nextStep fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class OP1,OP2,OP3,OP4,OP5,OP6,OP7 operationsStyle
    class PREV nextStep
    class NEXT nextStep
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
    e8@{ animate: true }
    e9@{ animate: true }
    e10@{ animate: true }
    e11@{ animate: true }
```

*_End-to-end event lifecycle management with collaborative marketing and comprehensive operational oversight_*

## 5. Evaluation & Partnership Review Flow

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("OPERACIÓN →")
    EVAL1("Métricas de uso")
    EVAL2("Satisfacción del aliado")
    EVAL3("NPS de participantes")
    EVAL4("Análisis de incidencias")
    EVAL5("Reporte mensual")
    EVAL6{"Renovar alianza"}
    EVAL7("Renovación de MOU")
    EVAL8("Cierre ordenado")
    RENEW("← OPERACIÓN")
    RESTART("→ IDENTIFICACIÓN")
    
    PREV e1@--> EVAL1
    PREV e2@--> EVAL2
    PREV e3@--> EVAL3
    PREV e4@--> EVAL4
    
    EVAL1 e5@--> EVAL5
    EVAL2 e6@--> EVAL5
    EVAL3 e7@--> EVAL5
    EVAL4 e8@--> EVAL5
    
    EVAL5 e9@--> EVAL6
    EVAL6 e10@-->|Sí| EVAL7
    EVAL6 e11@-->|No| EVAL8
    EVAL7 e12@--> RENEW
    EVAL8 e13@--> RESTART

    classDef evaluationStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef decisionStyle fill:#f39c12,stroke:#f39c12,stroke-width:3px,color:#ffffff,rx:10,ry:10
    classDef nextStep fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class EVAL1,EVAL2,EVAL3,EVAL4,EVAL5,EVAL7,EVAL8 evaluationStyle
    class EVAL6 decisionStyle
    class PREV nextStep
    class RENEW nextStep
    class RESTART nextStep
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
    e8@{ animate: true }
    e9@{ animate: true }
    e10@{ animate: true }
    e11@{ animate: true }
    e12@{ animate: true }
    e13@{ animate: true }
```

*_Data-driven partnership performance assessment with renewal decision framework and relationship lifecycle management_*

## 6. MOU Types & Requirements Reference

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    CENTER("MOU TIPOS")
    MOU1("Público/Biblioteca:<br/>Horarios, capacidad,<br/>responsable, seguridad,<br/>difusión básica")
    MOU2("Colegio:<br/>+ Salvaguarda menores,<br/>autorizaciones,<br/>contenidos apropiados")
    MOU3("Empresa:<br/>+ Patrocinio, branding,<br/>voluntariado corporativo,<br/>métricas")
    MOU4("Café:<br/>+ Ticket mínimo 3-4k COP,<br/>aforo, wifi, sonido,<br/>uso de imagen")
    
    CENTER e1@--> MOU1
    CENTER e2@--> MOU2
    CENTER e3@--> MOU3
    CENTER e4@--> MOU4

    classDef mouStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef nextStep fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class MOU1,MOU2,MOU3,MOU4 mouStyle
    class CENTER nextStep
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
```

*_Comprehensive legal framework templates with venue-specific requirements and compliance standards_*

## Overall Partnership Management

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    A("IDENTIFICACIÓN")
    B("NEGOCIACIÓN")
    C("CONFIGURACIÓN")
    D("OPERACIÓN")
    E("EVALUACIÓN")
    
    A e1@--> B
    B e2@--> C
    C e3@--> D
    D e4@--> E
    E e5@--> D
    E e6@--> A
    
    classDef processStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10

    class A,B,C,D,E processStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
```

*_Strategic partnership lifecycle with continuous optimization and sustainable relationship management framework_*

Términos clave en MOU (según tipo)
- Público/Biblioteca/Colegio: horarios, capacidad, responsable local, seguridad, salvaguarda de menores, difusión básica (cartelera/boletín), cero cobro a participantes.
- Empresa: patrocinio (en especie o monetario), indicadores de alcance, uso de marca, voluntariado corporativo, ventanas de calendario.
- Café: ticket de consumo mínimo (el más bajo disponible y visible), aforo, señalización de consumo, wifi/sonido/enchufes, uso de imagen del local.

KPI del flujo
- Sedes activas ≥ 2; cumplimiento de agenda ≥ 90%; incidentes de seguridad = 0; satisfacción del aliado ≥ 4.3.

---

## Campañas de marca: Instagram (CircleUp Volunteers)

Objetivos
- Top of funnel: alcance y descubrimiento de cursos/sedes.
- Mid funnel: clics a inscripción y guardados.
- Bottom: asistencia efectiva y reenganche.

Pilares de contenido
- Historias de impacto (voluntarios/participantes).
- Agenda semanal por sede (carruseles + Stories con stickers de recordatorio).
- Behind the scenes: montaje de sede, preparación de cursos.
- Contenido útil (microtips de los cursos) + call to action.
- Audio-clips desde Spotify (Jellypod) con subtítulos (Deepgram) para Reels.

Cadencia sugerida
- 3–4 posts/semana + Stories diarias en semanas con cursos.
- Reels de 30–45s con CTA a inscripción.

Mecánicas
- UTM en enlaces de bio/Stories; Link-in-bio con categorías por sede.
- Colaboraciones con aliados (co-post) para ampliar alcance.
- WhatsApp Business: listas de difusión segmentadas por sede; recordatorios T-24/T-3.

Métricas de marketing
- Alcance, visualizaciones de perfil, CTR a inscripción, guardados/compartidos, crecimiento semanal de seguidores, % conversión registro→asistencia.

---

## Protocolos mínimos
- Protección de menores: regla de dos adultos, autorización y contenidos adecuados por franja etaria.
- Seguridad en sede: responsable local, botiquín, puntos de salida, registro de incidentes (si los hubiera).
- Marca y comunicación: uso consistente de identidad visual; respeto a lineamientos del aliado.

---

## SLA y reglas go/no-go operativas
- Si TAE < 70% por dos ciclos en una sede → revisión de franja horaria/tema y refuerzo de difusión.
- No-show de voluntarios > 15% en un mes → sobre-reclutamiento temporal + coaching de coordinación.
- Caída de NPS < 4.0 en una línea → pausa y rediseño de contenido + reforzar onboarding.

---

## Anexo: Kit digital del voluntario (resumen)
- Canva (plantillas) — 50 USD/año.
- Google Slides + Google Cloud (100 USD presupuesto operativo) — guías de diseño.
- Weasyprint (PDF) — certificados/handouts.
- YouForm API — formularios y consentimiento.
- Calendly Standard (120 USD/año) — agenda y recordatorios.
- WhatsApp Business + SIM dedicada — difusión/recordatorios.
- Auth0 — acceso.
- Deepgram (créditos) — transcripción.
- Jellypod (260 USD/año) — publicación en Spotify.
- Snowflake (créditos 800 USD/120 días; Basis 140 USD) — datos operativos.
- Dominio + GitHub Pages (20 USD) — presencia web ligera.

---

## Glosario de métricas
- TAE: tasa de asistencia efectiva (asistentes/inscritos).
- NPS: promotores – detractores (escala 0–10).
- UV: horas voluntario/mes.
- CPP/CPH: costo por participante / costo por hora.
- ARPU/CVP/MC/BE: ingreso promedio, costo variable, margen de contribución y punto de equilibrio.
