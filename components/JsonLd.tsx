/**
 * Renders a JSON-LD script tag, server-side. Accepts a single schema object
 * or an array of them.
 */
export default function JsonLd({
  schema,
}: {
  schema: Record<string, unknown> | Record<string, unknown>[];
}) {
  const json = JSON.stringify(schema);
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline here; it contains no user input.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
