# PARTICIPA - Landing Page Sketch & Design

## Objetivo de la Página
Crear una página de aterrizaje específica para jóvenes colombianos (14+) que quieren **participar** en sesiones de aprendizaje práctico. La página debe convertir visitantes en participantes activos, mostrando el valor inmediato y tangible de las sesiones.

## Estructura de la Página

### 1. HERO SECTION - "Aprende haciendo, no solo escuchando"
**Componente a reusar**: `Hero.jsx` (adaptado)

**Contenido**:
- **Headline**: "Aprende haciendo, no solo escuchando"
- **Subtitle**: "Sesiones prácticas de 60-120 minutos donde sales con algo concreto que puedes usar hoy mismo"
- **Primary CTA**: "Buscar sesiones cerca de mí"
- **Secondary CTA**: "Ver cómo funciona"
- **Trust indicators**: "✓ Gratis siempre ✓ Sin compromisos ✓ Resultados visibles"

**Imagen principal**: 
```
PROMPT LOVART.AI:
"Web optimized illustration, Pixar animation style, young Latin American teenager (16-18 years old) with dark hair, sitting at a wooden table in a cozy library, actively building something with their hands (electronics, crafts, or coding), bright natural lighting, warm colors, focused and happy expression, books and learning materials around, Colombian flag colors subtly in background, 16:9 aspect ratio, high quality"
```

### 2. BENEFITS SECTION - "¿Por qué participar en Circle Up?"
**Componente a reusar**: `Benefits.jsx` (contenido específico para participantes)

**Beneficios específicos para participantes**:
1. **"Práctica desde el minuto 1"** - No teoría aburrida, empiezas haciendo
2. **"Sales con algo concreto"** - Cada sesión termina con un resultado tangible
3. **"Aprende de verdaderos expertos"** - Facilitadores con experiencia real
4. **"Ambiente relajado"** - En espacios cotidianos, sin presión académica
5. **"Gratis para siempre"** - Sin costos ocultos ni compromisos largos
6. **"Horarios flexibles"** - Sesiones de fin de semana y tardes

**Imágenes para cada beneficio**:
```
BENEFIT 1 PROMPT:
"Web optimized, Pixar style, young Colombian student with hands-on activity, working with tools or technology, bright expression, warm lighting, 1:1 aspect ratio"

BENEFIT 2 PROMPT:
"Web optimized, Pixar style, Latin American teenager proudly showing completed project (app, craft, or creation), satisfied smile, colorful background, 1:1 aspect ratio"

BENEFIT 3 PROMPT:
"Web optimized, Pixar style, friendly Colombian mentor/teacher explaining to young student, both engaged and smiling, collaborative atmosphere, 1:1 aspect ratio"

BENEFIT 4 PROMPT:
"Web optimized, Pixar style, cozy learning space (library/cafe), young Latin Americans in casual clothes, relaxed learning environment, warm colors, 1:1 aspect ratio"

BENEFIT 5 PROMPT:
"Web optimized, Pixar style, diverse group of Colombian youth celebrating, no money symbols, free education concept, joyful atmosphere, 1:1 aspect ratio"

BENEFIT 6 PROMPT:
"Web optimized, Pixar style, clock showing flexible hours, young Latin American student with backpack, multiple time options, freedom concept, 1:1 aspect ratio"
```

### 3. HOW IT WORKS - "3 pasos para empezar"
**Componente a reusar**: `Services.jsx` (adaptado como proceso)

**Proceso para participantes**:
1. **"Descubre"** → Encuentra sesiones en tu área usando nuestro buscador
2. **"Inscríbete"** → Reserva tu lugar en 2 clics, sin formularios largos
3. **"Participa y lleva"** → Asiste 60-120 min y sal con algo que puedes usar

**Imágenes del proceso**:
```
STEP 1 PROMPT:
"Web optimized, Pixar style, young Colombian person using smartphone/laptop to search for local events, map interface visible, excited expression, modern UI elements, 16:9 aspect ratio"

STEP 2 PROMPT:
"Web optimized, Pixar style, Latin American teenager clicking registration button on phone, simple interface, quick signup process, satisfied expression, 16:9 aspect ratio"

STEP 3 PROMPT:
"Web optimized, Pixar style, diverse group of young Colombians in learning session, hands-on activity, mentor guiding, everyone engaged and happy, collaborative workspace, 16:9 aspect ratio"
```

### 4. TESTIMONIALS - "Lo que dicen otros participantes"
**Componente a reusar**: `Collaboration.jsx` (adaptado como testimonios)

**Testimonios de participantes**:
- **María, 17 años**: "En 2 horas aprendí a hacer una app básica. ¡Ya la tengo en mi teléfono!"
- **Carlos, 19 años**: "Pensé que programar era súper difícil, pero aquí lo hice jugando"
- **Ana, 16 años**: "El ambiente es súper relajado, nada que ver con el colegio"

**Imágenes de testimonios**:
```
TESTIMONIAL IMAGES PROMPT:
"Web optimized, Pixar style portrait, young Colombian person (specify age 16-19), genuine smile, casual clothes, modern background, diverse features representing different regions of Colombia, circular crop, high quality"
```

### 5. AVAILABLE SESSIONS - "Sesiones disponibles esta semana"
**Componente nuevo**: Basado en `Roadmap.jsx`

**Contenido**:
- Lista de sesiones próximas con:
  - Tema (ej: "Crea tu primera app", "Electrónica básica", "Diseño gráfico")
  - Fecha y hora
  - Ubicación (biblioteca, café, centro comunitario)
  - Cupos disponibles
  - Botón "Reservar lugar"

**Imagen de sesiones**:
```
SESSIONS PROMPT:
"Web optimized, Pixar style, calendar interface showing multiple learning sessions, colorful event cards, Colombian locations (libraries, cafes), young people icons, organized layout, 16:9 aspect ratio"
```

### 6. FAQ SECTION - "Preguntas frecuentes"
**Componente nuevo**: Basado en estructura de `Benefits.jsx`

**Preguntas clave**:
- ¿Realmente es gratis?
- ¿Necesito experiencia previa?
- ¿Qué pasa si no puedo asistir?
- ¿Qué debo llevar?
- ¿Hay límite de edad?

### 7. CTA FINAL - "¡Empieza tu próxima aventura de aprendizaje!"
**Componente a reusar**: Sección del `Hero.jsx`

**Contenido**:
- **Headline**: "¡Tu próxima aventura de aprendizaje te espera!"
- **Subtitle**: "Únete a cientos de jóvenes que ya están aprendiendo haciendo"
- **Primary CTA**: "Ver sesiones disponibles"
- **Secondary CTA**: "Hacer una pregunta"

**Imagen final**:
```
FINAL CTA PROMPT:
"Web optimized, Pixar style, group of diverse young Colombian people celebrating learning achievements, holding up their creations (apps, crafts, projects), joyful atmosphere, Colombian landscape in background, inspiring and motivational, 16:9 aspect ratio"
```

## Paleta de Colores Específica
- **Primario**: Azul vibrante (#2563EB) - Confianza y tecnología
- **Secundario**: Verde esmeralda (#10B981) - Crecimiento y éxito
- **Acento**: Amarillo cálido (#F59E0B) - Energía y optimismo
- **Neutros**: Grises suaves para texto y fondos

## Elementos de Confianza
- Contador de participantes: "Más de 500 jóvenes ya han participado"
- Testimonios con fotos reales (generadas)
- Logos de espacios aliados (bibliotecas, cafés)
- Certificaciones de seguridad

## Responsive Design
- **Mobile First**: Botones grandes, navegación simple
- **Touch Friendly**: Elementos de al menos 44px
- **Fast Loading**: Imágenes optimizadas, lazy loading

## Micro-interacciones
- Hover effects en botones
- Smooth scrolling entre secciones
- Loading states para búsqueda de sesiones
- Success animations al registrarse

## Métricas de Conversión
- **Primary Goal**: Registros a sesiones
- **Secondary Goal**: Suscripciones a newsletter
- **Engagement**: Tiempo en página, scroll depth
- **Trust**: Clicks en testimonios y FAQ

## Consideraciones Técnicas
- **SEO**: Meta tags específicos para "aprender haciendo Colombia"
- **Performance**: Lazy loading de imágenes
- **Accessibility**: Alt texts, keyboard navigation
- **Analytics**: Event tracking para cada CTA

## Flujo de Usuario Ideal
```
Landing → Hero CTA → Benefits → Process → Testimonials → Available Sessions → Registration → Confirmation
```

## Adaptaciones Culturales
- **Lenguaje**: Colombianismos sutiles, tono cercano
- **Referencias**: Lugares conocidos de Colombia
- **Valores**: Énfasis en comunidad y crecimiento personal
- **Imágenes**: Diversidad étnica y regional de Colombia

## Componentes Reutilizados
1. **Hero.jsx** → Hero específico para participantes
2. **Benefits.jsx** → Beneficios para participantes
3. **Services.jsx** → Proceso de 3 pasos
4. **Collaboration.jsx** → Testimonios
5. **Roadmap.jsx** → Sesiones disponibles
6. **Footer.jsx** → Footer con CTAs específicos

## Nuevos Componentes Necesarios
1. **SessionFinder.jsx** → Buscador de sesiones
2. **FAQ.jsx** → Preguntas frecuentes
3. **TestimonialCard.jsx** → Tarjetas de testimonios
4. **TrustIndicators.jsx** → Elementos de confianza

Esta estructura garantiza una experiencia optimizada para convertir visitantes jóvenes en participantes activos, usando componentes existentes de manera eficiente y creando una narrativa convincente específica para este público objetivo.
