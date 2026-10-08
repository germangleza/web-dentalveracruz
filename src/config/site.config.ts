/**
 * ⚙️ CONFIGURACIÓN CENTRAL — VERTICAL SALUD
 * ÚNICO archivo a editar por proyecto. Todo el sitio se alimenta de aquí.
 *
 * ⚕️ Sitios de salud son YMYL (Your Money or Your Life): Google exige
 * señales E-E-A-T extra. Este config incluye los campos médicos necesarios.
 */

/** Perfil de un profesional en medicalTeam (alimenta /equipo y los bloques de autor del blog). */
export interface TeamMemberInput {
  id: string;
  name: string;
  title: string;
  license: string;
  licenseSpecialty?: string;
  university: string;
  photo: string;
  bio: string;
  sameAs: string[];
}

export const SITE = {
  // === Básicos ===
  name: 'Dental Veracruz',
  url: 'https://www.dentalveracruz.com',     // Dominio final SIN slash al final (www = principal)
  title: 'Dental Veracruz | Clínica dental en Tijuana',
  description: 'Clínica dental en Tijuana: odontología general, ortodoncia, implantes, All-on-4 y endodoncia. Pacientes de México y EE. UU. Agenda por WhatsApp.',
  locale: 'es_MX',
  lang: 'es',

  /**
   * Pre-lanzamiento: mientras sea true, TODO el sitio sale con noindex y
   * robots.txt bloquea el rastreo. Cambiar a false solo cuando ya exista el
   * permiso de publicidad COFEPRIS/COEPRIS y el contenido final esté aprobado.
   */
  prelaunch: false,

  // === Marca ===
  logo: '/logo.png',                         // Logo a color (fondo transparente)
  logoWhite: '/logo-blanco.png',             // Logo en blanco para fondos oscuros
  ogImage: '/og-default.png',                // 1200x630
  themeColor: '#1B6F80',
  /** Foto principal del inicio (sesión propia, no stock). Vacío = panel con el logo. */
  heroImage: '/fachada-dental-veracruz-tijuana.jpg',
  /** Versión WebP de heroImage (más ligera); vacío = solo se usa heroImage */
  heroImageWebp: '/fachada-dental-veracruz-tijuana.webp',
  heroImageAlt: 'Fachada de Dental Veracruz en Col. Libertad, Tijuana, esquina con Blvd. Cuauhtémoc',

  // === Negocio médico (para schema Dentist) ===
  business: {
    /**
     * Tipo de entidad médica según schema.org:
     * 'MedicalClinic'      → clínicas y consultorios
     * 'Physician'          → médico individual / consultorio personal
     * 'Dentist'            → dentistas
     * 'MedicalOrganization'→ hospitales, laboratorios, organizaciones grandes
     */
    type: 'Dentist' as 'MedicalClinic' | 'Physician' | 'Dentist' | 'MedicalOrganization',
    legalName: 'JERGARALVER',                // Razón social (TODO: confirmar régimen, p. ej. S.A. de C.V.)
    email: '',                               // TODO: correo de contacto
    phone: '+52 664 780 8302',
    /** WhatsApp en formato internacional sin "+" ni espacios (para wa.me) */
    whatsapp: '526647808302',
    whatsappMessage: 'Hola, me gustaría agendar una cita en Dental Veracruz.',
    /** Especialidades médicas (schema medicalSpecialty). */
    specialties: ['Dentistry'] as string[],
    address: {
      /** Dirección PÚBLICA (igual a Google Business): acceso y estacionamiento por Aquiles Serdán */
      street: 'Av. Aquiles Serdán 11004-8, Col. Libertad',
      city: 'Tijuana',
      state: 'B.C.',
      zip: '22400',                          // TODO: confirmar CP con Google Business
      country: 'MX',
    },
    /** Referencia de acceso que se muestra junto a la dirección (ubicación, FAQ, llms.txt) */
    addressNote: 'Planta baja, esquina con Blvd. Cuauhtémoc Norte. Estacionamiento gratuito y acceso por Av. Aquiles Serdán; si vienes en Uber o taxi, pide que te dejen en Aquiles Serdán.',
    /** Domicilio LEGAL (COEPRIS, facturación, aviso de privacidad). No se usa como dirección pública. */
    legalAddress: 'Blvd. Cuauhtémoc 11004, Col. Libertad, C.P. 22400, Tijuana, B.C., México',
    /** Tomadas del embed de Google Maps (centro del mapa). Verificar con el pin exacto. */
    geo: { lat: 32.53359097365693, lng: -117.01171038775088 },
    /** Formato schema.org (igual que Google Business). */
    openingHours: ['Mo-Fr 09:00-17:00', 'Sa 08:00-16:00'] as string[],
    /** ¿Acepta pacientes nuevos? (aparece en resultados de Google) */
    acceptingNewPatients: true,
    priceRange: '$$',                        // $, $$, $$$
  },

  // === Google Maps (ficha "Dental Veracruz en Tijuana") ===
  maps: {
    /** src del iframe "Insertar un mapa" de Google Maps */
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3363.7212535661374!2d-117.01171038775088!3d32.53359097365693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9482f0c76382b%3A0xb14d413e246692c5!2sDental%20Veracruz%20en%20Tijuana!5e0!3m2!1ses-419!2smx!4v1790900466405!5m2!1ses-419!2smx',
    /** Enlace directo a la ficha (CID 0xb14d413e246692c5 en decimal) */
    placeUrl: 'https://maps.google.com/?cid=12775939453074444997',
  },

  // === Servicios ===
  // Sin afirmaciones absolutas ni promesas de resultados (publicidad de salud / COFEPRIS).
  services: {
    general: [
      { name: 'Limpieza dental', description: 'Retira placa y sarro para ayudar a mantener encías y dientes sanos.' },
      { name: 'Revisión y diagnóstico', description: 'Valoramos tu boca para detectar a tiempo cualquier problema.' },
      { name: 'Tratamientos preventivos', description: 'Cuidados que ayudan a prevenir caries y problemas futuros.' },
      { name: 'Tratamientos restaurativos', description: 'Reparan dientes dañados para recuperar su forma y función.' },
    ],
    /** id define también el ícono (SVG en index.astro): 'ortodoncia' | 'implantes' | 'all-on' | 'endodoncia' */
    specialties: [
      {
        id: 'ortodoncia',
        name: 'Ortodoncia',
        description: 'Corrige la alineación de los dientes y la mordida con brackets o alineadores, mejorando la estética y la función dental.',
      },
      {
        id: 'implantes',
        name: 'Implantes dentales',
        description: 'Reemplazan dientes perdidos con piezas de titanio que se integran al hueso, para recuperar la función y la apariencia de tu sonrisa.',
      },
      {
        id: 'all-on',
        name: 'All-on-4 y All-on-6',
        /** Página propia del tratamiento (SEO/GEO). Opcional en cada especialidad. */
        url: '/all-on-4-y-all-on-6-tijuana',
        description: 'Rehabilitación de arcada completa: una prótesis fija sobre 4 o 6 implantes, para quienes han perdido la mayoría o todos sus dientes. Requiere valoración previa.',
      },
      {
        id: 'endodoncia',
        name: 'Endodoncia',
        url: '/endodoncia-tijuana',
        description: '¿Dolor o infección en un diente? Te ayudamos a conservarlo con un tratamiento de conductos, para evitar la extracción siempre que sea posible.',
      },
    ],
  },

  // === Regulatorio (COFEPRIS / COEPRIS BC) ===
  // No se muestra nada hasta que el campo tenga valor real.
  regulatory: {
    /** Número de permiso de publicidad COFEPRIS — en trámite. Se muestra en el footer cuando exista. */
    advertisingPermit: '',
    /** Responsable sanitario (nombre + cédula). Vacío = no se muestra. */
    sanitaryResponsible: '',
  },

  // === Equipo médico (E-E-A-T: Google necesita saber QUIÉN atiende) ===
  // Vacío a petición del cliente: el doctor principal no quiere aparecer.
  // Con el equipo vacío, /equipo no se genera y no aparece en el menú ni en el sitemap.
  medicalTeam: [] as TeamMemberInput[],

  // === Redes sociales ===
  socials: {
    twitter: '',
    instagram: 'dental.veracruz.en.tijuana',
    facebook: 'DentalVeracruzTijuana',
    linkedin: '',
    youtube: '',
    tiktok: '',
  },

  // === Blog ===
  blog: {
    title: 'Blog de salud dental',
    description: 'Información médica confiable, revisada por especialistas.',
    postsPerPage: 10,
    defaultAuthor: 'Equipo Médico',
    /** Aviso mostrado al final de cada artículo (obligación ética + protección legal) */
    disclaimer:
      'Este contenido es informativo y no sustituye una consulta médica. Si tienes síntomas o dudas sobre tu salud, consulta a un profesional.',
  },

  // === Analytics ===
  analytics: {
    plausibleDomain: '',
    googleAnalyticsId: '',
  },
} as const;

export type SiteConfig = typeof SITE;
export type TeamMember = TeamMemberInput;

export function socialUrls(): string[] {
  const s = SITE.socials;
  return [
    s.twitter && `https://twitter.com/${s.twitter}`,
    s.instagram && `https://instagram.com/${s.instagram}`,
    s.facebook && `https://facebook.com/${s.facebook}`,
    s.linkedin && `https://linkedin.com/company/${s.linkedin}`,
    s.youtube && `https://youtube.com/@${s.youtube}`,
    s.tiktok && `https://tiktok.com/@${s.tiktok}`,
  ].filter(Boolean) as string[];
}

const DAY_NAMES: Record<string, string> = { Mo: 'Lun', Tu: 'Mar', We: 'Mié', Th: 'Jue', Fr: 'Vie', Sa: 'Sáb', Su: 'Dom' };

/** 'Mo-Fr 09:00-17:00' → 'Lun a Vie 9:00 – 17:00' */
export function formatHours(h: string): string {
  const [days, time] = h.split(' ');
  const d = days.split('-').map((x) => DAY_NAMES[x] ?? x).join(' a ');
  const t = time.split('-').map((x) => x.replace(/^0/, '')).join(' – ');
  return `${d} ${t}`;
}

export function whatsappUrl(message: string = SITE.business.whatsappMessage): string {
  return `https://wa.me/${SITE.business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telUrl(): string {
  return `tel:${SITE.business.phone.replace(/\s/g, '')}`;
}

export function getTeamMember(id: string): TeamMember | undefined {
  return SITE.medicalTeam.find((m) => m.id === id);
}
