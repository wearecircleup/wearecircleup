import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";
import NeedHelp from "../components/NeedHelp";

const PoliciesDocs = ({ setCurrentPage }) => {
  const [activeSection, setActiveSection] = useState("privacy-policy");
  const [expandedGroup, setExpandedGroup] = useState("legal-policies");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sectionRefs = useRef({});

  const navigationGroups = [
    {
      id: "legal-policies",
      title: "Políticas Legales",
      items: [
        { id: "privacy-policy", title: "Política de privacidad" },
        { id: "terms-conditions", title: "Términos y condiciones" },
        { id: "code-conduct", title: "Código de conducta" },
      ],
    },
    {
      id: "educational-policies",
      title: "Políticas Educativas",
      items: [
        { id: "educational-model", title: "Modelo educativo" },
        { id: "volunteer-reengagement", title: "Reactivación de voluntarios" },
        { id: "educational-scholarships", title: "Becas educativas" },
      ],
    },
    {
      id: "safeguarding-policies",
      title: "Políticas de Salvaguarda",
      items: [
        { id: "minor-protection", title: "Protección de menores" },
        { id: "data-protection", title: "Protección de datos" },
      ],
    },
    {
      id: "operational-policies",
      title: "Políticas Operativas",
      items: [
        { id: "onboarding-policy", title: "Política de onboarding" },
        { id: "quality-standards", title: "Estándares de calidad" },
      ],
    },
  ];

  const sections = [
    {
      id: "privacy-policy",
      title: "Política de Privacidad",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Esta Política describe cómo Circle Up Volunteers ("Circle Up") recolecta, usa, conserva y protege los datos personales de participantes, voluntariado, aliados y otras personas relacionadas con sus actividades de aprendizaje comunitario. Buscamos un tratamiento responsable, proporcional y transparente, adecuado a la naturaleza joven y de bajo riesgo del proyecto.
          </p>
          
          <h3 className="text-base font-medium text-n-1 mb-4">1. Responsable y canales</h3>
          <p className="text-sm text-n-4 mb-5">
            • Responsable del tratamiento: Circle Up Volunteers (iniciativa comunitaria sin ánimo de lucro)<br/>
            • Canales de contacto: formularios oficiales (YouForm) y canales del repositorio del proyecto<br/>
            • Esta Política se interpreta conforme a la Ley 1581 de 2012 (Colombia) y normas concordantes
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">2. Categorías de datos que tratamos</h3>
          <p className="text-sm text-n-4 mb-5">
            • <strong>Identificación y contacto:</strong> nombre, correo electrónico, número de WhatsApp<br/>
            • <strong>Operación de actividades:</strong> sede, curso, fecha/hora, inscripción, confirmaciones, asistencia efectiva<br/>
            • <strong>Calidad y mejora:</strong> NPS, encuestas breves, comentarios voluntarios<br/>
            • <strong>Contenidos y evidencia:</strong> fotografías, clips de audio, transcripciones (si se generan)<br/>
            • <strong>Voluntariado:</strong> intereses, experiencia, propuesta de curso, rúbricas y retroalimentación<br/>
            • <strong>Marketing básico:</strong> etiquetas UTM de campañas, ciudad/sede; no perfilamos conductas sensibles<br/>
            • <strong>Tecnología:</strong> registros mínimos de uso de formularios/plataformas para debug y seguridad
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Datos sensibles:</strong> evitamos recabar datos sensibles. Si excepcionalmente se requieren (p. ej., autorizaciones para menores), se solicitarán con mayor protección y finalidad específica.
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">3. Finalidades del tratamiento</h3>
          <p className="text-sm text-n-4 mb-5">
            • Gestionar inscripciones, cupos y comunicaciones de recordatorio<br/>
            • Coordinar sedes, horarios y logística de actividades<br/>
            • Medir calidad (NPS, asistencia) y mejorar contenidos/operación<br/>
            • Emitir certificados digitales (cuando aplique)<br/>
            • Gestionar el ciclo de voluntariado (onboarding, propuestas, revisión, reconocimiento)<br/>
            • Mantener evidencias de aprendizaje comunitario (materiales, fotos/audio con consentimiento)<br/>
            • Reportería operativa interna y transparencia mínima de resultados (sin exponer datos personales)<br/>
            • Gestionar becas educativas semestrales (nominación, comunicación, activación de accesos) y la relación con plataformas educativas de terceros
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">4. Base jurídica</h3>
          <p className="text-sm text-n-4 mb-5">
            • Consentimiento informado (inscripción, encuestas, uso de imagen/audio, menores)<br/>
            • Ejecución de actividades propias de Circle Up (comunicaciones y gestión operativa)<br/>
            • Interés legítimo en seguridad y prevención de abuso, con salvaguardas y minimización
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">5. Terceros encargados y transferencias</h3>
          <p className="text-sm text-n-4 mb-5">
            Tratamos datos con proveedores que actúan como encargados de tratamiento. Algunos pueden procesar/almacenar fuera de Colombia, bajo cláusulas de protección adecuadas:
          </p>
          <p className="text-sm text-n-4 mb-5">
            • YouForm (formularios y consentimientos)<br/>
            • Eventbrite / Lu.ma (inscripciones y recordatorios)<br/>
            • Calendly (agendamiento)<br/>
            • Auth0 (autenticación de voluntariado)<br/>
            • Google Slides / Google Cloud (materiales y almacenamiento)<br/>
            • Weasyprint (generación de PDFs/certificados)<br/>
            • Jellypod / Spotify (publicación de audio)<br/>
            • Deepgram (transcripción de audio)<br/>
            • Snowflake (almacenamiento/analítica de datos operativos)<br/>
            • WhatsApp Business (comunicaciones)<br/>
            • GitHub Pages / Streamlit (sitio y apps)<br/>
            • Plataformas educativas (p. ej., Platzi u otras) para la provisión de accesos/becas bajo sus propios Términos y Políticas
          </p>
          <p className="text-sm text-n-4 mb-5">
            Cada proveedor tiene su propia política de privacidad; recomendamos revisarlas al usar sus servicios.
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">6. Retención y minimización</h3>
          <p className="text-sm text-n-4 mb-5">
            • Inscripciones y asistencia: hasta 24 meses desde la última actividad<br/>
            • Encuestas/NPS: hasta 24 meses<br/>
            • Materiales, fotos y audio (con consentimiento): hasta 36 meses<br/>
            • Registros técnicos y logs: hasta 6 meses<br/>
            Conservamos lo mínimo necesario y aplicamos supresión/anonimización cuando ya no se necesitan.
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">7. Seguridad</h3>
          <p className="text-sm text-n-4 mb-5">
            • Acceso por roles y principio de mínimo privilegio<br/>
            • Cifrado en tránsito (HTTPS/TLS) y, cuando aplique, en reposo por parte de proveedores<br/>
            • Separación de entornos y control de cambios básicos<br/>
            • Pseudonimización para reportería (no publicamos datos personales)
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">8. Menores de edad</h3>
          <p className="text-sm text-n-4 mb-5">
            • Requerimos autorizaciones y aplicamos la regla de dos adultos<br/>
            • Tratamos datos mínimos y adecuados a la finalidad<br/>
            • No publicamos imágenes que identifiquen a menores sin consentimiento legal del representante
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">9. Derechos de las personas (Habeas Data)</h3>
          <p className="text-sm text-n-4 mb-5">
            Las personas titulares pueden ejercer sus derechos de:<br/>
            • Acceso y conocimiento del tratamiento<br/>
            • Rectificación y actualización de datos<br/>
            • Supresión cuando proceda<br/>
            • Revocar el consentimiento en cualquier momento<br/>
            Para ejercerlos, utilice los formularios oficiales (YouForm) o los canales del repositorio. Responderemos en plazos razonables acorde a la ley.
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">10. Cookies y analítica ligera</h3>
          <p className="text-sm text-n-4 mb-5">
            Circle Up no implementa cookies propias de seguimiento. Las plataformas de terceros utilizadas (p. ej., YouForm, Eventbrite, Spotify, Platzi u otras plataformas educativas) pueden usar cookies según sus propias políticas.
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">11. Cambios a esta Política</h3>
          <p className="text-sm text-n-4 mb-5">
            Podemos actualizar esta Política para reflejar mejoras o cambios operativos. Publicaremos la versión vigente en el repositorio del proyecto.
          </p>
        </>
      ),
    },
    {
      id: "terms-conditions",
      title: "Términos y Condiciones",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Estos Términos y Condiciones regulan la participación en las actividades de aprendizaje comunitario organizadas por Circle Up Volunteers ("Circle Up"), tanto para personas participantes como para personas voluntarias y aliadas. Al inscribirse, asistir o facilitar actividades, usted declara haber leído, comprendido y aceptado estos Términos y Condiciones.
          </p>
          
          <h3 className="text-base font-medium text-n-1 mb-4">1. Definiciones y alcance</h3>
          <p className="text-sm text-n-4 mb-5">
            • <strong>Participante:</strong> persona que asiste a cursos, talleres o actividades abiertas de Circle Up<br/>
            • <strong>Voluntario/a:</strong> persona que facilita contenidos o apoya la operación de actividades sin relación laboral con Circle Up<br/>
            • <strong>Aliado/a:</strong> entidad o persona titular de una sede o que apoya la difusión/operación mediante un acuerdo (LOI/MOU)<br/>
            • <strong>Sede:</strong> espacio físico donde se realizan actividades (espacio público, biblioteca, colegio, empresa, café, u otros)<br/>
            • <strong>Actividades:</strong> cursos, talleres, charlas u otros encuentros de aprendizaje comunitario<br/>
            • <strong>Menor de edad:</strong> persona menor de 18 años
          </p>
          <p className="text-sm text-n-4 mb-5">
            <strong>Alcance:</strong> estos Términos aplican a todas las actividades, sedes y personas involucradas en el marco de Circle Up.
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">2. Naturaleza de las actividades y certificados</h3>
          <p className="text-sm text-n-4 mb-5">
            • Las actividades son gratuitas y abiertas a la comunidad. En sedes comerciales (cafés), puede existir un ticket de consumo mínimo visible, acordado en el MOU; se procurará que sea el más bajo disponible y no debe constituir barrera de acceso (se habilitarán apoyos/becas cuando corresponda)<br/>
            • Las actividades son de carácter informal y no otorgan títulos con validez académica oficial<br/>
            • Circle Up puede emitir certificados digitales de participación, de carácter simbólico, sujetos a criterios de asistencia y evaluación breve (por ejemplo, encuesta NPS)
          </p>
          <p className="text-sm text-n-4 mb-5">
            <strong>Becas educativas:</strong> Circle Up podrá otorgar accesos semestrales en especie conforme a la "Política de Becas Educativas". El uso de estos beneficios es personal e intransferible y está sujeto a los términos del proveedor de la plataforma educativa correspondiente.
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">3. Inscripción, cupos y asistencia</h3>
          <p className="text-sm text-n-4 mb-5">
            • La inscripción se realiza mediante formularios oficiales y plataformas autorizadas<br/>
            • Los cupos son limitados; se aplican listas de espera y reasignaciones para optimizar la ocupación<br/>
            • Las confirmaciones se solicitan con antelación (por ejemplo T-24 h); la no confirmación puede liberar el cupo<br/>
            • Se registrará asistencia efectiva el día del evento por lista o QR
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">4. Derechos y deberes de las personas participantes</h3>
          <p className="text-sm text-n-4 mb-5">
            • Recibir un ambiente respetuoso, seguro e inclusivo<br/>
            • Acceder a información clara sobre lugar, horario, contenidos y requisitos básicos<br/>
            • Cumplir normas de convivencia, puntualidad y uso responsable de recursos e instalaciones<br/>
            • Seguir lineamientos de la sede (incluyendo, si aplica, consumo mínimo en cafés) y de Circle Up
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">5. Derechos y deberes de las personas voluntarias</h3>
          <p className="text-sm text-n-4 mb-5">
            • Contar con lineamientos, plantillas y acompañamiento para diseño y ejecución de actividades<br/>
            • Cumplir el Código de Conducta, respetar salvaguardas para menores y protocolos de seguridad<br/>
            • Preparar contenidos conforme a rúbricas de calidad y a la propuesta aprobada<br/>
            • Reportar incidencias y resultados (asistencia, NPS, evidencias) en los canales definidos
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">6. Sedes, aliados y condiciones de uso</h3>
          <p className="text-sm text-n-4 mb-5">
            • El uso de sedes se rige por acuerdos (LOI/MOU) que establecen horarios, capacidad, responsabilidades, difusión, y condiciones particulares (p. ej., ticket mínimo en cafés, protocolos de ingreso en colegios/empresas)<br/>
            • Las personas deben acatar las normas de la sede y las instrucciones del personal responsable
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">7. Protección de menores</h3>
          <p className="text-sm text-n-4 mb-5">
            • Participación de menores sujeta a autorizaciones y acompañamiento según protocolos vigentes<br/>
            • Regla de "dos adultos" para interacción con menores; se prohíbe la interacción a solas<br/>
            • Prohibido recabar datos innecesarios; contenidos y materiales deben ser adecuados a la edad
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">8. Propiedad intelectual y uso de materiales</h3>
          <p className="text-sm text-n-4 mb-5">
            • Salvo indicación en contrario, la propiedad intelectual de los materiales corresponde a quien los crea (por lo general, la persona voluntaria)<br/>
            • El uso de materiales por parte de participantes se limita a fines personales y no comerciales<br/>
            • Circle Up puede solicitar licencias no exclusivas para difundir materiales y evidencias educativas, respetando créditos y derechos
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">9. Imagen, grabaciones y contenidos</h3>
          <p className="text-sm text-n-4 mb-5">
            • Podrán tomarse fotografías o clips breves con fines de memoria y difusión educativa. Se respetarán las objeciones de imagen cuando se manifiesten<br/>
            • En el caso de menores, se requiere consentimiento del responsable legal<br/>
            • No se permiten grabaciones o fotografías invasivas ni uso con fines comerciales no autorizados
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">10. Datos personales</h3>
          <p className="text-sm text-n-4 mb-5">
            • Circle Up tratará datos personales conforme a la normatividad colombiana (Ley 1581 de 2012 y normas concordantes) y a su Política de Privacidad<br/>
            • Los datos se usan para gestionar actividades, medir calidad y mejorar servicios; se aplican principios de minimización y acceso por roles<br/>
            • Las personas titulares pueden ejercer sus derechos de acceso, rectificación y supresión a través de los canales oficiales de Circle Up
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">11. Salud, seguridad y conductas prohibidas</h3>
          <p className="text-sm text-n-4 mb-5">
            • Está prohibido cualquier acto de violencia, acoso, discriminación, consumo de sustancias psicoactivas durante las actividades, porte de armas y conductas que pongan en riesgo a otras personas<br/>
            • Se seguirán protocolos de seguridad de la sede, incluyendo rutas de evacuación, control de aforo y registro de incidentes
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">12. Cancelación y reprogramación</h3>
          <p className="text-sm text-n-4 mb-5">
            • Circle Up o la sede podrán cancelar o reprogramar actividades por caso fortuito, fuerza mayor o causas similares. Se procurará avisar con la mayor antelación posible<br/>
            • En sedes con ticket mínimo, si la actividad es cancelada, se buscará evitar perjuicios a las personas participantes
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">13. Limitación de responsabilidad</h3>
          <p className="text-sm text-n-4 mb-5">
            • Circle Up no asume responsabilidad por pérdidas o daños indirectos, incidentales o consecuenciales derivados de la participación en actividades<br/>
            • Circle Up no es responsable por actuaciones de terceros no autorizados ni por incumplimientos de sedes aliadas fuera de los acuerdos vigentes
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">14. Medidas ante incumplimientos</h3>
          <p className="text-sm text-n-4 mb-5">
            • El incumplimiento de estos Términos puede dar lugar a medidas que incluyen advertencias, retiro de la actividad y restricciones futuras de participación<br/>
            • En conductas graves o ilícitas, se notificará a las autoridades competentes
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">15. Modificaciones</h3>
          <p className="text-sm text-n-4 mb-5">
            Circle Up puede modificar estos Términos. Los cambios serán comunicados por los canales oficiales. La continuidad en la participación implica aceptación de los cambios.
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">16. Ley aplicable y jurisdicción</h3>
          <p className="text-sm text-n-4 mb-5">
            Estos Términos se rigen por las leyes de la República de Colombia. Las controversias se resolverán ante los jueces competentes del domicilio de Circle Up.
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">17. Aceptación</h3>
          <p className="text-sm text-n-4 mb-5">
            Al inscribirse o participar en una actividad, usted declara aceptar estos Términos y Condiciones.
          </p>
        </>
      ),
    },
    {
      id: "code-conduct",
      title: "Código de Conducta",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Este Código establece los estándares de comportamiento esperados para todas las personas que interactúan con Circle Up Volunteers ("Circle Up"): participantes, voluntariado, equipo y aliados. Su propósito es garantizar un entorno seguro, inclusivo y profesional, dentro y fuera de las actividades.
          </p>
          
          <h3 className="text-base font-medium text-n-1 mb-4">1. Alcance</h3>
          <p className="text-sm text-n-4 mb-5">
            Aplica a todas las actividades de Circle Up: cursos, talleres, charlas y eventos relacionados, en cualquier sede (espacio público, biblioteca, colegio, empresa, café u otros) y en canales digitales (redes sociales, grupos de mensajería, formularios y correo).
          </p>
          
          <h3 className="text-base font-medium text-n-1 mb-4">2. Principios</h3>
          <p className="text-sm text-n-4 mb-5">
            • <strong>Respeto e inclusión:</strong> dignidad para todas las personas, sin discriminación<br/>
            • <strong>Integridad y honestidad:</strong> coherencia entre lo que se comunica y lo que se hace<br/>
            • <strong>Seguridad y salvaguarda:</strong> prevención activa de riesgos, especialmente con menores<br/>
            • <strong>Responsabilidad y cuidado:</strong> trato responsable de personas, recursos y espacios<br/>
            • <strong>Transparencia y datos mínimos:</strong> comunicación clara; manejo responsable de información personal
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">3. Estándares de comportamiento</h3>
          
          <h4 className="text-sm font-medium text-n-2 mb-3">3.1. Respeto e inclusión</h4>
          <p className="text-sm text-n-4 mb-5">
            • Prohibido el acoso, la intimidación, la discriminación y cualquier forma de violencia<br/>
            • Lenguaje y conducta respetuosos; escucha activa y tolerancia a la diferencia<br/>
            • Promoción de la participación segura de grupos históricamente marginados
          </p>

          <h4 className="text-sm font-medium text-n-2 mb-3">3.2. Interacciones con menores de edad</h4>
          <p className="text-sm text-n-4 mb-5">
            • Contenidos y materiales adecuados a la edad; actividades supervisadas<br/>
            • Cualquier sospecha de riesgo debe reportarse de inmediato por los canales oficiales<br/>
            • Se requerirán autorizaciones y protocolos definidos para su participación
          </p>

          <h4 className="text-sm font-medium text-n-2 mb-3">3.3. Seguridad en sede y cumplimiento de normas</h4>
          <p className="text-sm text-n-4 mb-5">
            • Cumplir normas de cada sede (aforo, horarios, ticket mínimo en cafés si aplica, señalización)<br/>
            • Respetar indicaciones del personal responsable y rutas de evacuación<br/>
            • Prohibidos porte de armas, consumo de sustancias psicoactivas durante actividades, y conductas peligrosas
          </p>

          <h4 className="text-sm font-medium text-n-2 mb-3">3.4. Uso responsable de recursos y propiedad intelectual</h4>
          <p className="text-sm text-n-4 mb-5">
            • Cuidado de materiales, equipos y espacios<br/>
            • Respeto de derechos de autor: uso de materiales solo con permiso o licencias adecuadas<br/>
            • Los materiales de los cursos se usan con fines personales/no comerciales, salvo autorización
          </p>

          <h4 className="text-sm font-medium text-n-2 mb-3">3.5. Conducta digital y comunicaciones</h4>
          <p className="text-sm text-n-4 mb-5">
            • Uso de canales oficiales, sin spam, sin compartir datos personales de terceros sin autorización<br/>
            • Imágenes y audio solo con consentimiento; no publicar contenidos que identifiquen a menores sin permiso legal<br/>
            • Redes sociales: no hablar "en nombre de Circle Up" sin autorización; evitar afirmaciones engañosas<br/>
            • Respeto a la privacidad en grupos de mensajería; no difundir información sensible
          </p>

          <h4 className="text-sm font-medium text-n-2 mb-3">3.6. Conflictos de interés y regalos</h4>
          <p className="text-sm text-n-4 mb-5">
            • Declarar posibles conflictos de interés que afecten decisiones operativas o académicas<br/>
            • Regalos y patrocinios: deben ser transparentes, de valor razonable y sin condicionamientos indebidos
          </p>

          <h4 className="text-sm font-medium text-n-2 mb-3">3.7. Medioambiente y comunidad</h4>
          <p className="text-sm text-n-4 mb-5">
            • Minimizar residuos y consumo de recursos; mantener sedes limpias<br/>
            • Promover convivencia armónica con el entorno y vecinos de las sedes
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">4. Reportes, investigación y medidas</h3>
          
          <h4 className="text-sm font-medium text-n-2 mb-3">4.1. Reportes</h4>
          <p className="text-sm text-n-4 mb-5">
            • Se puede reportar cualquier incidente, sospecha o incumplimiento por los canales oficiales de Circle Up<br/>
            • Se permite el reporte anónimo; se prohíben las represalias contra quienes reportan de buena fe
          </p>

          <h4 className="text-sm font-medium text-n-2 mb-3">4.2. Gestión de reportes (plazos orientativos)</h4>
          <p className="text-sm text-n-4 mb-5">
            • Acuse de recibo: dentro de 48 horas<br/>
            • Triage y plan de acción: dentro de 5 días hábiles<br/>
            • Investigación y decisión: dentro de 15 días hábiles (o antes, según gravedad)<br/>
            • Se respetará la confidencialidad y el debido proceso, dentro de los límites legales
          </p>

          <h4 className="text-sm font-medium text-n-2 mb-3">4.3. Medidas posibles</h4>
          <p className="text-sm text-n-4 mb-5">
            • Advertencia verbal/escrita; retiro temporal o definitivo de actividades; restricciones de acceso a sedes o canales; comunicación a autoridades cuando corresponda<br/>
            • Para faltas graves (violencia, acoso grave, riesgos a menores): expulsión inmediata y reporte a autoridades competentes
          </p>

          <h4 className="text-sm font-medium text-n-2 mb-3">4.4. Apelaciones</h4>
          <p className="text-sm text-n-4 mb-5">
            La persona afectada puede solicitar revisión de la decisión dentro de 5 días hábiles, aportando nueva información relevante.
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">5. Alcohol, drogas y conducta indebida</h3>
          <p className="text-sm text-n-4 mb-5">
            • Prohibido asistir o facilitar actividades bajo efectos de alcohol o drogas<br/>
            • Se prohíbe el consumo durante las actividades, salvo excepciones explícitas de la sede (p. ej., café) y nunca para menores<br/>
            • Conductas sexuales inapropiadas, proposiciones o contacto físico no consentido son inaceptables y sancionables
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">6. Datos personales e imagen</h3>
          <p className="text-sm text-n-4 mb-5">
            • Circle Up tratará datos según la Política de Privacidad y la ley vigente<br/>
            • Se solicitará consentimiento para el uso de imagen, especialmente de menores<br/>
            • Se puede solicitar no aparecer en fotos o contenidos difundidos por Circle Up
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">7. Uso de beneficios de terceros (becas educativas)</h3>
          <p className="text-sm text-n-4 mb-5">
            • Los accesos otorgados por Circle Up a plataformas educativas de terceros son personales e intransferibles<br/>
            • Queda prohibido compartir credenciales, ceder o revender el acceso<br/>
            • El uso del beneficio implica cumplir los Términos y Políticas del proveedor<br/>
            • El incumplimiento podrá derivar en la revocatoria del beneficio y medidas conforme a este Código
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">8. Cumplimiento y actualización</h3>
          <p className="text-sm text-n-4 mb-5">
            • El incumplimiento de este Código puede derivar en medidas disciplinarias y en la remisión a autoridades<br/>
            • Circle Up podrá actualizar este documento; los cambios se comunicarán por canales oficiales
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">9. Aceptación</h3>
          <p className="text-sm text-n-4 mb-5">
            Al inscribirse, participar o facilitar actividades, usted declara haber leído y aceptado este Código de Conducta.
          </p>
        </>
      ),
    },
    {
      id: "educational-model",
      title: "Modelo Educativo",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Esta política establece el modelo educativo de Circle Up Volunteers, basado en principios de aprendizaje comunitario, intercambio de conocimientos y desarrollo de capacidades locales.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Enfoque pedagógico:</strong> Aprendizaje práctico y colaborativo donde los participantes construyen conocimiento a través de la experiencia directa. Se privilegia el "aprender haciendo" sobre la transmisión pasiva de información.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Estructura de actividades:</strong> Talleres de 1-2 horas con 70% de práctica activa, 20% de teoría aplicada y 10% de reflexión grupal. Cada sesión debe producir un resultado tangible que los participantes puedan usar inmediatamente.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Criterios de calidad:</strong> Contenidos relevantes para la vida diaria, metodologías participativas, ambiente inclusivo y respetuoso, y seguimiento del aprendizaje mediante retroalimentación constructiva.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Evaluación y mejora:</strong> Sistema de NPS (Net Promoter Score) para medir satisfacción, encuestas de seguimiento para evaluar aplicación del conocimiento, y retroalimentación continua para mejorar contenidos y metodologías.
          </p>
        </>
      ),
    },
    {
      id: "volunteer-reengagement",
      title: "Reactivación de Voluntarios",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Esta política establece estrategias para mantener la participación activa del voluntariado y facilitar su reincorporación después de períodos de inactividad.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Identificación de inactividad:</strong> Se considera inactivo a un voluntario que no ha participado en actividades durante 3 meses consecutivos. Se implementa un sistema de seguimiento para identificar patrones de desvinculación temprana.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Estrategias de reactivación:</strong> Contacto personalizado para entender razones de inactividad, ofrecimiento de roles alternativos o flexibles, invitación a actividades especiales o de reconocimiento, y actualización sobre nuevas oportunidades de participación.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Flexibilidad de participación:</strong> Reconocimiento de que la disponibilidad puede variar por circunstancias personales, ofrecimiento de modalidades de participación adaptadas (virtual, presencial, híbrida), y respeto por decisiones de pausa temporal.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Proceso de reincorporación:</strong> Actualización sobre cambios en políticas y procedimientos, sesión de reconexión con la comunidad, asignación gradual de responsabilidades, y seguimiento personalizado durante los primeros meses de regreso.
          </p>
        </>
      ),
    },
    {
      id: "educational-scholarships",
      title: "Becas Educativas",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Esta política regula la entrega de becas educativas semestrales por parte de Circle Up Volunteers ("Circle Up") para promover el aprendizaje continuo y reconocer desempeños destacados en la comunidad.
          </p>
          
          <h3 className="text-base font-medium text-n-1 mb-4">1. Objetivo</h3>
          <p className="text-sm text-n-4 mb-5">
            • Reconocer el buen trabajo del voluntariado y la participación ejemplar de asistentes.<br/>
            • Reducir barreras de acceso a formación digital de calidad mediante el uso de asientos disponibles en plataformas educativas de terceros.
          </p>
          
          <h3 className="text-base font-medium text-n-1 mb-4">2. Alcance del beneficio</h3>
          <p className="text-sm text-n-4 mb-5">
            • Periodicidad: semestral (enero–junio y julio–diciembre)<br/>
            • Cupos: 3 becas por semestre (1 beca para la persona voluntaria con mejor desempeño, 2 becas para personas participantes destacadas)<br/>
            • Duración del acceso: 6 meses por beneficiario/a<br/>
            • Naturaleza: beneficio en especie (no monetario) consistente en el acceso a una plataforma educativa de terceros (por ejemplo, incorporación a un plan familiar/"Family" o asiento equivalente), sin costo para la persona beneficiaria
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Modalidad de provisión:</strong> se privilegiarán asientos individuales o códigos/regalos provistos por la plataforma. El uso de planes "Family/Team" se realizará únicamente cuando los Términos del proveedor lo permitan para beneficiarios no domésticos; en caso contrario, se implementará una alternativa permitida por el proveedor.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Notas:</strong> Circle Up puede sustituir la plataforma por una alternativa equivalente, según disponibilidad y viabilidad operativa.
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">3. Elegibilidad y criterios de selección</h3>
          <p className="text-sm text-n-4 mb-5">
            <strong>Voluntariado:</strong><br/>
            • Horas voluntarias (UV) y confiabilidad operativa<br/>
            • NPS de los cursos facilitados (umbral de referencia ≥ 4.2)<br/>
            • Cumplimiento de entregables (materiales, evidencia) y Código de Conducta
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Participantes:</strong><br/>
            • Asistencia efectiva (TAE) y puntualidad<br/>
            • Participación en actividades y respuesta a NPS<br/>
            • Conducta ejemplar conforme al Código de Conducta<br/>
            • Empates: se prioriza impacto, consistencia y criterios de equidad
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Requisitos generales:</strong><br/>
            • Ser mayor de 18 años o contar con consentimiento del representante legal para aceptar términos de la plataforma de terceros<br/>
            • Aceptar el uso del beneficio bajo reglas de la presente política y del proveedor
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">4. Proceso</h3>
          <p className="text-sm text-n-4 mb-5">
            1) Nominación y shortlist (última semana del semestre)<br/>
            2) Revisión de métricas y verificación de conducta<br/>
            3) Decisión por comité operativo y comunicación a las personas ganadoras<br/>
            4) Invitación al plan/plataforma y activación del acceso por 6 meses<br/>
            5) Seguimiento opcional (aprovechamiento) y cierre
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Transparencia:</strong> se podrán publicar los resultados de forma agregada (sin datos personales sensibles) y con consentimiento.
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">5. Condiciones de uso y cumplimiento</h3>
          <p className="text-sm text-n-4 mb-5">
            • <strong>Cuentas personales e intransferibles:</strong> queda prohibido compartir credenciales o permitir el uso por terceros<br/>
            • <strong>Alineamiento con Términos del proveedor:</strong> el uso del beneficio implica aceptar y cumplir sus Términos, Política de Privacidad y reglas de conducta<br/>
            • <strong>Edad:</strong> si la plataforma exige mayoría de edad, las personas menores solo podrán acceder con consentimiento expreso del representante legal y cumpliendo las condiciones del proveedor<br/>
            • <strong>Revocatoria:</strong> el beneficio puede suspenderse o revocarse en caso de incumplimientos al Código de Conducta de Circle Up, a esta política, o a los Términos del proveedor<br/>
            • No existe derecho adquirido a renovación ni compensaciones monetarias. La continuidad del beneficio depende de la disponibilidad de asientos/planes y de la evaluación semestral
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            • <strong>Prohibiciones adicionales:</strong> no está permitido ceder, revender, subarrendar, compartir o eludir medidas técnicas del proveedor<br/>
            • <strong>Cambios de Términos:</strong> si el proveedor modifica sus Términos (p. ej., restricciones de uso en planes "Family/Team"), Circle Up podrá sustituir el mecanismo de acceso por una alternativa permitida, sin obligación de equivalencia exacta
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">6. Tratamiento de datos personales</h3>
          <p className="text-sm text-n-4 mb-5">
            • Datos mínimos necesarios (p. ej., nombre y correo electrónico) podrán ser compartidos con el proveedor para cursar la invitación al plan y gestionar el acceso<br/>
            • El tratamiento se rige por la Política de Privacidad de Circle Up y las políticas del proveedor<br/>
            • Las personas beneficiarias podrán ejercer sus derechos ARS (acceso, rectificación, supresión) por los canales habilitados
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">7. Conflictos de interés y no discriminación</h3>
          <p className="text-sm text-n-4 mb-5">
            • <strong>Integridad:</strong> toda decisión debe estar libre de conflictos de interés y favoritismos indebidos<br/>
            • <strong>No discriminación:</strong> no se discrimina por características protegidas<br/>
            • <strong>Registro:</strong> se documentarán criterios y decisiones de cada ciclo para auditoría interna
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">8. Preguntas frecuentes</h3>
          <p className="text-sm text-n-4 mb-5">
            • <strong>¿La beca es dinero?</strong> No, es acceso en especie por 6 meses a una plataforma educativa de terceros<br/>
            • <strong>¿Puedo transferirla?</strong> No, es personal e intransferible<br/>
            • <strong>¿Puede cambiar la plataforma?</strong> Sí, por disponibilidad/viabilidad<br/>
            • <strong>¿Qué pasa si incumplo?</strong> Puede revocarse el beneficio y/o reportarse al proveedor si aplica<br/>
            • <strong>¿Puedo volver a ganarla?</strong> Sí, si cumples criterios y hay disponibilidad
          </p>
        </>
      ),
    },
    {
      id: "onboarding-policy",
      title: "Política de Onboarding",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Esta política establece el proceso de incorporación para nuevos voluntarios, participantes y aliados de Circle Up Volunteers, garantizando una integración efectiva y alineada con nuestros valores.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Proceso para voluntarios:</strong> Sesión de introducción sobre valores y metodología (30-45 minutos), revisión del Código de Conducta y políticas de salvaguarda, asignación de mentor experimentado (opcional), período de observación y práctica gradual.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Proceso para participantes:</strong> Información clara sobre objetivos y metodología de las actividades, explicación de normas de convivencia y uso de espacios, orientación sobre canales de comunicación y feedback, seguimiento de primeras experiencias.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Proceso para aliados:</strong> Reunión de alineación sobre expectativas mutuas, definición de roles y responsabilidades, establecimiento de protocolos de comunicación, firma de carta de intención o MOU según corresponda.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Seguimiento y evaluación:</strong> Revisión a los 30 días de la primera participación, identificación de necesidades de apoyo adicional, ajustes en roles o responsabilidades según feedback, documentación de aprendizajes para mejora continua.
          </p>
        </>
      ),
    },
    {
      id: "minor-protection",
      title: "Protección de Menores",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Esta Política define los estándares mínimos de salvaguarda para la participación de personas menores de 18 años en actividades de Circle Up Volunteers ("Circle Up"). Se adapta a la naturaleza joven y de bajo riesgo del proyecto, priorizando claridad, proporcionalidad y prevención.
          </p>
          
          <h3 className="text-base font-medium text-n-1 mb-4">1. Alcance y definiciones</h3>
          <p className="text-sm text-n-4 mb-5">
            • <strong>Alcance:</strong> aplica a todas las actividades (cursos, talleres, charlas) en cualquier sede (espacios públicos, bibliotecas, colegios, empresas, cafés) y a comunicaciones asociadas (grupos y canales digitales)<br/>
            • <strong>Menor de edad:</strong> persona menor de 18 años<br/>
            • <strong>Adulto responsable:</strong> voluntario/a o persona del aliado designada para supervisión<br/>
            • <strong>Incidente de salvaguarda:</strong> cualquier situación que afecte o pueda afectar la seguridad, bienestar o dignidad de un menor (p. ej., acoso, maltrato, negligencia, riesgo inminente)
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">2. Principios</h3>
          <p className="text-sm text-n-4 mb-5">
            • <strong>Interés superior del menor:</strong> toda decisión prioriza su seguridad y bienestar<br/>
            • <strong>Prevención:</strong> reducir riesgos con medidas simples, visibles y verificables<br/>
            • <strong>Proporcionalidad:</strong> recabar y usar el mínimo de datos necesarios<br/>
            • <strong>Confidencialidad:</strong> proteger la identidad e información de menores y denunciantes<br/>
            • <strong>Coordinación:</strong> respetar y aplicar protocolos de la sede aliada (colegios, bibliotecas, etc.)
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">3. Requisitos para participación de menores</h3>
          <p className="text-sm text-n-4 mb-5">
            • <strong>Autorización:</strong> consentimiento del representante legal y del menor (cuando sea apropiado)<br/>
            • <strong>Información previa:</strong> objetivos, lugar, horarios, responsables y normas básicas<br/>
            • <strong>Registro:</strong> al ingreso, verificación de autorización y control de aforo
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">4. Supervisión y regla de dos adultos</h3>
          <p className="text-sm text-n-4 mb-5">
            • <strong>Regla de dos adultos:</strong> nunca permanecer a solas un adulto con un menor; las reuniones deben ser visibles (puertas abiertas o espacios con visibilidad)<br/>
            • <strong>Ratios orientativos:</strong> 1 adulto por cada 10 menores (13–17 años). Ajustar según actividad, espacio y riesgo<br/>
            • <strong>Traslados y sanitarios:</strong> acompañamiento visible; no permitir que un adulto acompañe a solas a un menor. Preferir acompañamiento entre pares, con supervisión a distancia
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">5. Interacciones permitidas y prohibidas</h3>
          <p className="text-sm text-n-4 mb-5">
            • <strong>Permitido:</strong> lenguaje respetuoso, apoyo pedagógico, reconocimiento positivo<br/>
            • <strong>Prohibido:</strong> contacto físico no apropiado, mensajes privados 1:1, solicitudes de datos innecesarios, regalos personales, insinuaciones o conductas sexuales, compartir transporte privado a solas<br/>
            • <strong>Comunicación digital:</strong> usar canales oficiales grupales; si se requiere 1:1, incluir al representante o al canal oficial en copia
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">6. Contenidos, imagen y medios</h3>
          <p className="text-sm text-n-4 mb-5">
            • <strong>Adecuación:</strong> contenidos y materiales deben ser pertinentes y apropiados a la edad<br/>
            • <strong>Imagen/fotografía:</strong> requerir consentimiento específico del representante legal; permitir exclusión de imagen sin represalia<br/>
            • <strong>Difusión:</strong> evitar identificar a menores con nombre completo o datos de localización; no etiquetar perfiles personales de menores<br/>
            • <strong>Audio/Podcast:</strong> solo con consentimiento; evitar datos identificables; curaduría previa
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">7. Voluntariado: requisitos mínimos</h3>
          <p className="text-sm text-n-4 mb-5">
            • <strong>Compromisos:</strong> completar el módulo de salvaguarda, aceptar este documento y el Código de Conducta<br/>
            • <strong>Verificación básica:</strong> declaración de antecedentes y referencias simples cuando sea viable; en sedes escolares, seguir los requisitos del colegio<br/>
            • <strong>Roles:</strong> designar un Responsable de Salvaguarda por sede/evento (puede ser rotativo) para responder dudas, recibir reportes y activar el protocolo
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">8. Protocolo de reporte y respuesta</h3>
          <p className="text-sm text-n-4 mb-5">
            <strong>Plazos orientativos:</strong><br/>
            • Protección inmediata: acciones de seguridad de forma inmediata<br/>
            • Registro inicial: dentro de 24 horas (hechos, sin juicios de valor)<br/>
            • Triage: dentro de 48 horas (evaluar gravedad, decidir escalamiento)<br/>
            • Cierre y aprendizajes: dentro de 15 días hábiles o antes
          </p>
          <p className="text-sm text-n-4 mb-5">
            <strong>Canales de reporte:</strong><br/>
            • Formulario oficial de incidentes (YouForm) o canal designado por sede<br/>
            • Se admite reporte anónimo; prohibidas represalias a quien reporta de buena fe
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">9. Coordinación con sedes y aliados</h3>
          <p className="text-sm text-n-4 mb-5">
            • Respetar y aplicar las políticas del aliado (colegios, bibliotecas, empresas) cuando sean más estrictas<br/>
            • Dejar constancia en MOU de: responsables, horarios, aforos, espacios de visibilidad, y rutas de escalamiento
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">10. Datos personales de menores</h3>
          <p className="text-sm text-n-4 mb-5">
            • <strong>Minimización:</strong> recabar solo lo necesario (p. ej., nombre, contacto del representante, autorizaciones)<br/>
            • <strong>Acceso por roles:</strong> restringido al personal que lo requiere<br/>
            • <strong>Retención:</strong> conservar autorizaciones y registros de incidentes por el tiempo estrictamente necesario
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">11. Incumplimientos y sanciones</h3>
          <p className="text-sm text-n-4 mb-5">
            • Cualquier incumplimiento puede derivar en la separación inmediata de la actividad y, según el caso, reporte a autoridades<br/>
            • Conductas graves (acoso, maltrato, riesgo sexual, violencia) implican expulsión y reporte inmediato
          </p>

          <h3 className="text-base font-medium text-n-1 mb-4">12. Revisión y mejora</h3>
          <p className="text-sm text-n-4 mb-5">
            • Esta Política se revisará al menos cada 12 meses o antes si cambian las condiciones operativas o normativas<br/>
            • Se documentarán aprendizajes y mejoras tras cada incidente o simulacro
          </p>
        </>
      ),
    },
    {
      id: "data-protection",
      title: "Protección de Datos",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Esta política complementa la Política de Privacidad estableciendo medidas específicas de protección de datos personales en todas las actividades de Circle Up Volunteers.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Principios de protección:</strong> Minimización de datos (recopilar solo lo necesario), proporcionalidad en el tratamiento, transparencia en el uso, seguridad en el almacenamiento y transmisión, y respeto por los derechos de los titulares.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Medidas técnicas:</strong> Cifrado en tránsito (HTTPS/TLS), acceso por roles y principio de mínimo privilegio, separación de entornos, pseudonimización para reportería, y control de cambios básicos en sistemas.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Protección especial para menores:</strong> Autorizaciones específicas del representante legal, tratamiento de datos mínimos y adecuados a la finalidad, no publicación de imágenes identificables sin consentimiento legal, aplicación de la regla de dos adultos.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Retención y eliminación:</strong> Inscripciones y asistencia hasta 24 meses, encuestas/NPS hasta 24 meses, materiales con consentimiento hasta 36 meses, registros técnicos hasta 6 meses. Aplicación de supresión/anonimización cuando ya no se necesiten.
          </p>
        </>
      ),
    },
    {
      id: "quality-standards",
      title: "Estándares de Calidad",
      content: (
        <>
          <p className="text-sm text-n-4 mb-5">
            Esta política establece los estándares de calidad para todas las actividades de Circle Up Volunteers, garantizando experiencias de aprendizaje efectivas y consistentes.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Criterios de contenido:</strong> Relevancia práctica para la vida diaria, objetivos de aprendizaje claros y medibles, estructura pedagógica con 70% práctica y 30% teoría, resultados tangibles que los participantes puedan usar inmediatamente.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Estándares de facilitación:</strong> Preparación previa de materiales y actividades, dominio del tema por parte del facilitador, habilidades básicas de comunicación y manejo de grupo, cumplimiento del Código de Conducta y políticas de salvaguarda.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Evaluación y mejora:</strong> NPS mínimo de 4.2 para actividades, encuestas de seguimiento a participantes, retroalimentación constructiva a facilitadores, documentación de buenas prácticas y lecciones aprendidas.
          </p>
          
          <p className="text-sm text-n-4 mb-5">
            <strong>Proceso de revisión:</strong> Evaluación previa de propuestas de talleres, acompañamiento durante primeras facilitaciones, revisión periódica de materiales y metodologías, actualización continua basada en feedback y resultados.
          </p>
        </>
      ),
    },
  ];

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsSidebarOpen(false);
  };

  const toggleGroup = (groupId) => {
    setExpandedGroup(expandedGroup === groupId ? null : groupId);
  };

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header setCurrentPage={setCurrentPage} />
        
        <div className="flex min-h-screen bg-n-8">
          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed top-20 left-4 z-50 lg:hidden w-10 h-10 bg-n-7 border border-n-6 rounded-lg flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Sidebar */}
          <div className={`fixed lg:sticky top-[4.75rem] lg:top-[5.25rem] left-0 h-[calc(100vh-4.75rem)] lg:h-[calc(100vh-5.25rem)] w-80 bg-n-8 border-r border-n-6 overflow-hidden z-40 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <div className="p-6 h-full overflow-y-auto">
              <h2 className="h4 text-n-1 mb-6">Políticas</h2>
              
              <nav className="space-y-1">
                {navigationGroups.map((group) => (
                  <div key={group.id} className="border-b border-n-6 last:border-b-0 pb-2 last:pb-0">
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className="flex items-center justify-between w-full text-left py-2 text-n-1 hover:text-color-1 transition-colors"
                    >
                      <span className="font-semibold text-sm uppercase tracking-wider">{group.title}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${expandedGroup === group.id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {expandedGroup === group.id && group.items.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {group.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`block w-full text-left py-2 px-4 text-sm rounded transition-colors ${
                              activeSection === item.id
                                ? 'bg-color-1/10 text-color-1 border-l-2 border-color-1'
                                : 'text-n-4 hover:text-n-1 hover:bg-n-7'
                            }`}
                          >
                            {item.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 lg:ml-0">
            <div className="max-w-5xl mx-auto px-6 py-8">
              {sections.map((section) => (
                <div
                  key={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className="mb-12 scroll-mt-24"
                  id={section.id}
                >
                  <div className="max-w-4xl">
                    <h1 className="text-xl font-medium text-n-1 mb-4">{section.title}</h1>
                    <div className="text-sm font-light leading-relaxed text-n-3 space-y-4">
                      {section.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <NeedHelp 
          title="¿Necesitas ayuda?"
          subtitle="¿Tienes dudas sobre nuestras políticas? Estamos aquí para ayudarte"
          cards={[
            {
              icon: "💬",
              title: "Únete a nuestra comunidad",
              description: "Conecta con otros miembros y resuelve dudas"
            },
            {
              icon: "📧",
              title: "Escríbenos",
              description: "",
              email: "hola@circleup.com.co"
            }
          ]}
        />

        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default PoliciesDocs;