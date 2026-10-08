import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, formatHours } from '../config/site.config';

/**
 * llms.txt — estándar emergente para GEO.
 * Le da a ChatGPT/Claude/Perplexity un resumen estructurado del sitio
 * para que te entiendan y te citen correctamente. Se regenera en cada build.
 */
export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const body = `# ${SITE.name}

> ${SITE.description}

## Información
- Sitio: ${SITE.url}
- Ubicación: ${SITE.business.address.street}, ${SITE.business.address.city}, ${SITE.business.address.state}
- Cómo llegar: ${SITE.business.addressNote}
- Horario: ${SITE.business.openingHours.map(formatHours).join(' · ')}${SITE.business.openingHours.some((h) => h.includes('Su')) ? '' : ' (domingo cerrado)'}
- Pacientes: México y Estados Unidos (turismo médico)
- Teléfono / WhatsApp: ${SITE.business.phone}${SITE.business.email ? `\n- Correo: ${SITE.business.email}` : ''}

## Tratamientos
${SITE.services.specialties.map((s) => `- ${'url' in s ? `[${s.name}](${SITE.url}${s.url})` : s.name}: ${s.description}`).join('\n')}

## Blog
${posts.map((p) => `- [${p.data.title}](${SITE.url}/blog/${p.id}): ${p.data.description}`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
