# ROUTES.md - Circle Up Volunteer Navigation Structure

## Executive Summary

This document defines the UX-optimized navigation structure for Circle Up Volunteer, designed to serve three distinct audiences: **Allies** (spaces/institutions), **Volunteers** (facilitators), and **Participants** (learners). The architecture maximizes user experience by providing clear pathways from the home page to relevant content, making the volunteer education platform simple and accessible for Colombian youth.

## Target Audiences & User Personas

### 1. Aliados Potenciales (Potential Allies)
- **Profile**: Libraries, cafes, community centers, schools, companies, government entities
- **Goal**: Understand how to open their space to learning activities
- **Pain Points**: Complex bureaucracy, unclear commitments, safety concerns
- **Key Motivations**: Community impact, simple agreements, visible results

### 2. Voluntarios (Volunteers)
- **Profile**: Experts, self-taught individuals, young people with conviction
- **Goal**: Facilitate practical learning sessions in their community
- **Pain Points**: Lack of structure, fear of public speaking, time constraints
- **Key Motivations**: Share knowledge, grow personally, sustainable commitment (~5h/month)

### 3. Participantes (Participants)
- **Profile**: Colombian youth (14+) from central regions seeking practical skills
- **Goal**: Learn actionable skills in 60-120 minute sessions
- **Pain Points**: Theoretical learning, lack of practice, no clear next steps
- **Key Motivations**: Practical results, visible evidence, immediate application

## Site Architecture & Navigation Flow

### Home Page Structure
```
HERO SECTION
├── Primary CTA: "Comenzar ahora" (Smart routing based on user intent)
├── Secondary CTAs:
│   ├── "Quiero ser voluntario/a" → Volunteer Journey
│   ├── "Tengo un espacio" → Ally Journey  
│   └── "Quiero participar" → Participant Journey

NAVIGATION BAR
├── Participa (Participants focus)
├── Facilita (Volunteers focus)
├── Aliados (Allies focus)
├── Cómo funciona (How it works - universal)
├── Historias (Stories - social proof)
├── Seguridad (Safety - trust building)
└── Contacto (Contact)
```

## Section-by-Section Breakdown

### 1. HERO - "Aprende y enseña donde estés. Construyamos tejido social"
**Purpose**: Immediate value proposition with clear audience segmentation
**Content**: 
- Main headline from TAGLINES.md
- Subtitle: "Sesiones prácticas de 60–120 minutos con recursos mínimos"
- Smart CTA routing
- Trust indicators: "Sin burocracia innecesaria. Enfoque humano, alta confianza"

**Buttons**:
- Primary: "Comenzar ahora" (leads to audience selection)
- Secondary: Three audience-specific CTAs

### 2. BENEFITS - "¿Por qué Circle Up funciona?"
**Purpose**: Address pain points and showcase unique value proposition
**Content**: Transform current benefits to focus on:
- **Alta confianza, baja fricción**: Simple processes, no complex bureaucracy
- **Práctica ≥ 60%**: Learn by doing, not just listening
- **Evidencias visibles**: Tangible results you can see and use
- **Espacios cotidianos**: Any space can become a learning environment
- **Ritmo sostenible**: ~5 hours/month commitment for volunteers
- **Apoyo continuo**: Ongoing support and ready-to-use materials

### 3. HOW IT WORKS - "Cómo funciona en 3 pasos"
**Purpose**: Simplify the process for all three audiences
**Content**: Three parallel journeys:

#### For Participants:
1. **Descubre** → Find sessions in your area
2. **Participa** → 60-120 min practical sessions  
3. **Aplica** → Use what you learned in 7 days

#### For Volunteers:
1. **Elige tu flujo** → Select from TEACH.md methodologies
2. **Recibe materiales** → Get ready-to-use guides and resources
3. **Facilita** → Lead sessions with ongoing support

#### For Allies:
1. **Explora el kit** → Understand requirements and benefits
2. **Firma MOU ligero** → Simple agreement, clear roles
3. **Abre tu puerta** → Host sessions with visible community impact

### 4. COLLABORATION - "Espacios aliados y comunidad"
**Purpose**: Showcase partner ecosystem and community building
**Content**: 
- Partner logos (libraries, cafes, community centers)
- Success stories from different types of spaces
- Community impact metrics
- "Abrir mi puerta" CTA for new allies

### 5. SERVICES - "Metodologías y herramientas"
**Purpose**: Demonstrate the pedagogical approach and available resources
**Content**: Highlight TEACH.md methodologies:
- **HAA (Hook → Analogía → Acción)**: For complex concepts
- **PPDP (Problema → Pregunta → Demo → Práctica)**: For step-by-step learning
- **Think Again Loop**: For creativity and improvement
- Visual examples of session structures
- "Sin TV/Internet" capabilities with cards and whiteboards

### 6. ROADMAP - "Nuestra hoja de ruta"
**Purpose**: Show growth trajectory and future vision
**Content**: Adapt to Circle Up's development phases:
- **Fase piloto** (Current): 6-month pilot with 43-50 volunteers
- **Expansión local** (Next): Scale to more neighborhoods
- **Metodología abierta** (Future): Share frameworks with other communities
- **Red nacional** (Vision): Connect volunteer networks across Colombia

### 7. FOOTER - "Únete al movimiento"
**Purpose**: Final conversion opportunities and essential links
**Content**:
- Quick access to all three user journeys
- Social media links
- Legal and safety information
- Contact information
- "© 2025 Circle Up Volunteer - Construyendo tejido social"

## User Journey Flows

### Journey 1: Participant Path
```
HOME → "Quiero participar" → 
BENEFITS (focus on learning outcomes) → 
HOW IT WORKS (participant flow) → 
STORIES (participant testimonials) → 
SAFETY (trust building) → 
CTA: "Buscar sesiones cerca de mí"
```

### Journey 2: Volunteer Path  
```
HOME → "Quiero ser voluntario/a" → 
BENEFITS (focus on personal growth & impact) → 
SERVICES (methodologies preview) → 
HOW IT WORKS (volunteer flow) → 
STORIES (volunteer testimonials) → 
CTA: "Comenzar mi primera sesión"
```

### Journey 3: Ally Path
```
HOME → "Tengo un espacio" → 
COLLABORATION (partner showcase) → 
BENEFITS (focus on community impact) → 
HOW IT WORKS (ally flow) → 
SAFETY (compliance & security) → 
CTA: "Abrir mi puerta al aprendizaje"
```

## Navigation Optimization Strategy

### Smart CTA Routing
The primary "Comenzar ahora" button leads to an audience selection page:
```
¿Cómo quieres participar en Circle Up?

[Icon: Participant] 
Quiero aprender
"Sesiones prácticas de 60-120 minutos"

[Icon: Volunteer]
Quiero enseñar  
"Facilita con materiales listos y apoyo"

[Icon: Ally]
Tengo un espacio
"Abre tu puerta al aprendizaje comunitario"
```

### Mobile-First Navigation
- Hamburger menu with clear audience sections
- Sticky CTA button on mobile
- Touch-friendly button sizes (minimum 44px)
- Swipe gestures for section navigation

### Accessibility Features
- Clear heading hierarchy (H1 → H6)
- ARIA labels for screen readers
- High contrast color ratios
- Keyboard navigation support
- Focus indicators for all interactive elements

## Content Localization for Colombian Youth

### Language Adaptations
- Use Colombian Spanish expressions and cultural references
- Avoid technical jargon, use everyday language
- Include regional examples (Bogotá, Medellín, Cali references)
- Warm, inclusive tone that resonates with young people

### Cultural Considerations
- Emphasize community building ("tejido social")
- Highlight practical skills over theoretical knowledge
- Show diverse representation in images and testimonials
- Address common concerns about informal education

## Technical Implementation Notes

### Current Component Mapping
```
Header → Update navigation items
Hero → Transform with Circle Up messaging
Benefits → Restructure for three audiences  
Collaboration → Adapt for ally showcase
Services → Transform to methodology showcase
Roadmap → Update with Circle Up timeline
Footer → Add audience-specific CTAs
```

### New Components Needed
- Audience selection page
- User journey flows
- Methodology preview cards
- Partner showcase grid
- Testimonial carousel
- Safety/trust indicators

### Button Hierarchy
```
Primary CTAs (high contrast, prominent):
- "Comenzar ahora"
- "Quiero ser voluntario/a"
- "Tengo un espacio"
- "Quiero participar"

Secondary CTAs (medium prominence):
- "Ver cómo funciona"
- "Leer historias"
- "Conocer metodologías"

Tertiary CTAs (subtle):
- "Más información"
- "Contactar"
- Navigation links
```

## Success Metrics & KPIs

### User Experience Metrics
- **Bounce rate by audience** < 40%
- **Time on page** > 2 minutes average
- **CTA click-through rate** > 8%
- **Mobile usability score** > 90

### Conversion Metrics
- **Volunteer sign-ups** from website visits
- **Ally inquiries** generated
- **Participant registrations** for sessions
- **Cross-audience navigation** (users exploring multiple paths)

### Engagement Metrics
- **Section completion rate** (users who scroll through full journey)
- **Return visitor rate** > 25%
- **Social sharing** of success stories
- **Contact form submissions** by audience type

## Future Enhancements

### Phase 2 Features
- Interactive session finder map
- Volunteer application form integration
- Real-time availability calendar
- Success story submission portal

### Phase 3 Features
- User dashboard for each audience
- Community forum integration
- Resource library access
- Impact tracking visualization

## Conclusion

This navigation structure transforms the existing Brainwave architecture into a purpose-built platform for Circle Up Volunteer, optimizing for the unique needs of Colombian youth while maintaining the technical excellence of the original codebase. The three-audience approach ensures each user type finds relevant content quickly while encouraging cross-pollination between roles (participants becoming volunteers, allies becoming advocates).

The emphasis on simplicity, trust, and practical results aligns with Circle Up's core values of "alta confianza, baja fricción" while providing clear pathways for community engagement and social impact.
