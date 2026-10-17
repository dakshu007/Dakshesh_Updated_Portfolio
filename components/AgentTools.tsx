"use client";

import { useEffect } from "react";
import { person, socials, jobs, education, SITE_URL } from "@/lib/site";
import { mainProducts, achievementText } from "@/lib/data";

type Tool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: Record<string, boolean>;
  execute: (input: Record<string, unknown>) => Promise<unknown> | unknown;
};

type ModelContext = {
  registerTool?: (tool: Tool) => unknown;
  provideContext?: (ctx: { tools: Tool[] }) => unknown;
};

/**
 * Read-only WebMCP tools for browser AI agents: who Dakshesh is, how to hire
 * him, and what he has built. Registered only where the browser supports
 * WebMCP; a no-op everywhere else.
 */
export default function AgentTools() {
  useEffect(() => {
    const mc = (navigator as unknown as { modelContext?: ModelContext }).modelContext;
    if (!mc) return;

    const text = (value: unknown) => ({ content: [{ type: "text", text: JSON.stringify(value) }] });
    const tools: Tool[] = [
      {
        name: "get_dakshesh_profile",
        description:
          "Get Dakshesh B's profile: roles, location (Bangalore), availability, experience, education, contact details and resume link.",
        inputSchema: { type: "object", properties: {} },
        annotations: { readOnlyHint: true },
        execute: () =>
          text({
            name: person.name,
            roles: person.roles,
            location: "Bangalore (Bengaluru), India",
            availability: person.availability,
            experience: jobs.map((j) => `${j.title}, ${j.company} (${j.period})`),
            education: `${education.degree}, ${education.school} (${education.period})`,
            email: person.email,
            phone: person.phone,
            linkedin: socials.linkedin,
            github: socials.github,
            resume: `${SITE_URL}${person.resume}`,
          }),
      },
      {
        name: "list_dakshesh_products",
        description: "List the products Dakshesh B built, with what each does, its achievement and its link.",
        inputSchema: { type: "object", properties: {} },
        annotations: { readOnlyHint: true },
        execute: () =>
          text(
            mainProducts.map((p) => ({
              name: p.name,
              category: p.category,
              description: p.description,
              achievement: achievementText(p),
              page: `${SITE_URL}/${p.id}`,
              url: p.url,
            }))
          ),
      },
    ];

    try {
      if (typeof mc.registerTool === "function") tools.forEach((t) => mc.registerTool!(t));
      else if (typeof mc.provideContext === "function") mc.provideContext({ tools });
    } catch {
      // Agent APIs are experimental; never let them break the page.
    }
  }, []);

  return null;
}
