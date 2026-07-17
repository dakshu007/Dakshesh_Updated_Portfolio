export default function SectionHeading({
  eyebrow,
  title,
  description,
  headingId,
  align = "left",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  headingId?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div
      data-reveal
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      <p
        className={`eyebrow ${align === "center" ? "justify-center" : ""} ${
          dark ? "text-white" : ""
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={headingId}
        className={`mt-4 display-2 ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed text-pretty ${
            dark ? "text-white/70" : "text-ink-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
