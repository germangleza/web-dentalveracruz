/**
 * OPCIÓN B — Sitio solo como "clínica dental" (alcance del permiso de publicidad).
 * Se publica en /opcion-b para compararla con el sitio actual (opción A, en /).
 * Si se elige B: mover estos valores a site.config.ts, reemplazar index.astro por opcion-b.astro
 * y aplicar el resto de CAMBIOS-clinica-general.md (borrar páginas de especialidades, redirects, llms.txt).
 */
export const OPCION_B = {
  /** Ruta base de esta variante (el menú y los anclas apuntan aquí) */
  path: '/opcion-b',
  description:
    'Clínica dental en Tijuana: limpieza, revisión y diagnóstico, tratamientos preventivos y restaurativos. Pacientes de México y EE. UU. Agenda por WhatsApp.',
  heroImage: '/fachada-dental-veracruz-tijuana-clinica.jpg',
  heroImageWebp: '/fachada-dental-veracruz-tijuana-clinica.webp',
  regulatory: {
    /** Folio del permiso de publicidad (COEPRIS B.C. / COFEPRIS) — en trámite. Se muestra en el footer cuando exista. */
    advertisingPermit: '',
    /**
     * Leyenda del art. 19 del Reglamento en Materia de Publicidad: nombre del responsable
     * sanitario, institución (abreviada) y cédula. Vacío o con [CORCHETES] = no se muestra.
     * ⚠️ Pendiente: reemplazar con los datos reales de la responsable sanitaria.
     */
    sanitaryResponsible: 'Dra. [NOMBRE] · [ESCUELA] Céd. Prof. [NÚM.]',
  },
} as const;

/** true si el texto todavía tiene marcadores [PENDIENTE] y no debe publicarse */
export const isPlaceholder = (s: string) => /\[.+\]/.test(s);
