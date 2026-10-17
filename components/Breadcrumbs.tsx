import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ trail }: { trail: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((item, i) => (
          <li key={item.name} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-ink">
                {item.name}
              </Link>
            ) : (
              <span className="font-medium text-ink" aria-current="page">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
