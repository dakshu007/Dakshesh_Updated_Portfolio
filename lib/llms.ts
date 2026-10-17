import { SITE_URL, LAST_UPDATED, person, socials, jobs, education } from "./site";
import { mainProducts, legacyProducts, projects, skillGroups, achievementText } from "./data";
import { productContent } from "./products-content";
import { roles } from "./roles";
import { homeFaqs } from "./faq";
import { jpStory } from "./stories";
import { resultTotals, rankings, RESULTS_PERIOD, RESULTS_SOURCE } from "./results";

const u = (path: string) => `${SITE_URL}${path}`;

function summaryBlock() {
  return `# ${person.name}

> ${person.name} is a Full-Stack Developer, Frontend Engineer and SEO Engineer in Bangalore (Bengaluru), India. ${person.availability} He built MyKavo, a website monitoring SaaS on every platform (25 active users in 3 months), and BillZap, a GST billing app live on Google Play.

Last updated: ${LAST_UPDATED}

## Quick facts

- Name: ${person.name} (also known as Dakshesh)
- Roles: ${person.roles.join(", ")}
- Location: Bangalore (Bengaluru), Karnataka, India
- Availability: Open to full-time roles in Bangalore, ready to relocate anywhere, also takes freelance projects
- Experience: about 2 years of professional experience
- Current: ${jobs[0].title} at ${jobs[0].company} (${jobs[0].period})
- Previous: ${jobs[1].title} at ${jobs[1].company} (${jobs[1].period}), front end for six WooCommerce products used by 300,000+ stores
- Education: ${education.degree}, ${education.school}, ${education.location} (${education.period})
- Email: ${person.email}
- Phone and WhatsApp: ${person.phone}
- Resume (PDF): ${u(person.resume)}
- LinkedIn: ${socials.linkedin}
- GitHub: ${socials.github}`;
}

function productsBlock(full: boolean) {
  const lines = mainProducts.map((p) => {
    const c = productContent[p.id];
    const head = `- [${p.name}](${u(`/${p.id}`)}): ${p.description} ${achievementText(p)}. Live at ${p.url}${p.site ? ` and ${p.site}` : ""}.`;
    if (!full || !c) return head;
    return `${head}\n  ${c.overview}`;
  });
  const legacy = legacyProducts.map((p) => `- [${p.name}](${u(`/${p.id}`)}): ${p.description}`);
  return `## Products and achievements

${lines.join("\n")}

Earlier side projects:

${legacy.join("\n")}`;
}

export function llmsTxt() {
  return `${summaryBlock()}

## Hiring pages

${roles.map((r) => `- [${r.role} in Bangalore](${u(`/${r.slug}`)}): ${r.metaDescription}`).join("\n")}

${productsBlock(false)}

## Results

${resultTotals.map((t) => `- ${t.label}: ${t.display}`).join("\n")}
- Source: ${RESULTS_SOURCE}, ${RESULTS_PERIOD}
- Full report: ${u("/results")}

## Success stories

- [All success stories](${u("/success-stories")})
- [${jpStory.title}](${u(`/success-stories/${jpStory.slug}`)}): ${jpStory.inShort}

## Client work

${projects.map((p) => `- [${p.title}](${u(`/work/${p.slug}`)}): ${p.tagline} ${p.liveUrl}`).join("\n")}

## Pages

- [Home](${u("/")})
- [About](${u("/about")})
- [Results](${u("/results")})
- [Full profile for LLMs](${u("/llms-full.txt")})
`;
}

export function llmsFullTxt() {
  const faqs = [...homeFaqs, ...roles.flatMap((r) => r.faqs), ...jpStory.faqs];
  return `${summaryBlock()}

## Summary

${person.summary}

## Experience

${jobs
  .map(
    (j) => `### ${j.title}, ${j.company} (${j.period}, ${j.location})

${j.summary}

${j.highlights.map((h) => `- ${h}`).join("\n")}${j.stack ? `\n\nStack: ${j.stack.join(", ")}` : ""}`
  )
  .join("\n\n")}

### Education

${education.degree}, ${education.school}, ${education.location}, ${education.period}

## Skills

${skillGroups.map((g) => `- ${g.title}: ${g.skills.join(", ")}`).join("\n")}

${productsBlock(true)}

## Roles

${roles
  .map(
    (r) => `### ${r.role} in Bangalore (${u(`/${r.slug}`)})

${r.intro}

${r.pitch}

${r.proof.map((p) => `- ${p.title}: ${p.desc}`).join("\n")}

Skills: ${r.skills.join(", ")}`
  )
  .join("\n\n")}

## Search results (${RESULTS_SOURCE}, ${RESULTS_PERIOD})

${resultTotals.map((t) => `- ${t.label}: ${t.display} (${t.caption})`).join("\n")}

Google page 1 rankings:

${rankings.map((r) => `- #${r.position} for "${r.query}" (${r.site}, ${r.clicks} clicks)`).join("\n")}

## Client work

${projects
  .map((p) => `### ${p.title} (${p.liveUrl})

${p.summary}

${p.stats.map((s) => `- ${s.label}: ${s.value}`).join("\n")}`)
  .join("\n\n")}

## Success story: ${jpStory.title} (${u(`/success-stories/${jpStory.slug}`)})

${jpStory.inShort}

Testimonial from ${jpStory.owner.name}, ${jpStory.owner.role}, ${jpStory.client}: "${jpStory.testimonial}"

## Frequently asked questions

${faqs.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}
`;
}
