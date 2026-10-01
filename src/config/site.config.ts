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
  // TODO: dominio final pendiente (SIN slash al final)
  url: 'https://ejemplo.com',
  title: 'Dental Veracruz — Dentista en Tijuana',
  description: 'Clínica dental en Colonia Libertad, Tijuana, Baja California. Agenda tu cita por WhatsApp.',
  locale: 'es_MX',
  lang: 'es',

  /**
   * Pre-lanzamiento: mientras sea true, TODO el sitio sale con noindex y
   * robots.txt bloquea el rastreo. Cambiar a false solo cuando ya exista el
   * permiso de publicidad COFEPRIS/COEPRIS y el contenido final esté aprobado.
   */
  prelaunch: true,

  // === Marca === (pendiente: logo, colores y og-default del cliente)
  logo: '/logo.png',
  ogImage: '/og-default.png',                // 1200x630
  themeColor: '#0e7490',

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
    legalName: '',                           // TODO: razón social, si aplica
    email: '',                               // TODO: correo de contacto
    phone: '+52 664 780 8302',
    /** WhatsApp en formato internacional sin "+" ni espacios (para wa.me) */
    whatsapp: '526647808302',
    whatsappMessage: 'Hola, me gustaría agendar una cita en Dental Veracruz.',
    /** Especialidades médicas (schema medicalSpecialty). */
    specialties: ['Dentistry'] as string[],
    address: {
      street: 'Blvd. Cuauhtémoc 11004, Col. Libertad',
      city: 'Tijuana',
      state: 'B.C.',
      zip: '22400',                          // TODO: confirmar CP con Google Business
      country: 'MX',
    },
    /** TODO: coordenadas reales (Google Maps → clic derecho). 0 = no se publica geo. */
    geo: { lat: 0, lng: 0 },
    /** TODO: horarios reales, formato schema.org: 'Mo-Fr 09:00-19:00', 'Sa 09:00-14:00' */
    openingHours: [] as string[],
    /** ¿Acepta pacientes nuevos? (aparece en resultados de Google) */
    acceptingNewPatients: true,
    priceRange: '$$',                        // $, $$, $$$
  },

  // === Servicios (pendiente: el cliente enviará la lista y el copy) ===
  // Cada servicio se muestra en el inicio. Sin afirmaciones absolutas ni promesas de resultados.
  services: [] as { name: string; description: string }[],

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
    instagram: '',
    facebook: '',
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

export function whatsappUrl(message: string = SITE.business.whatsappMessage): string {
  return `https://wa.me/${SITE.business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telUrl(): string {
  return `tel:${SITE.business.phone.replace(/\s/g, '')}`;
}

export function getTeamMember(id: string): TeamMember | undefined {
  return SITE.medicalTeam.find((m) => m.id === id);
}
