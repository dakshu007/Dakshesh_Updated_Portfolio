import Image from "next/image";
import { cartrabbitProducts } from "@/lib/data";

/**
 * Infinite marquee of the six Cartrabbit products whose front end I built.
 * The list is rendered twice for a seamless loop; the copy is hidden from
 * assistive tech so screen readers hear each product once.
 */
export default function LogoStrip() {
  return (
    <section aria-labelledby="cartrabbit-heading" className="relative pb-4 pt-14 sm:pt-20">
      <div className="section">
        <h2
          id="cartrabbit-heading"
          className="text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink-soft"
        >
          Front end I built at Cartrabbit, used by 300,000+ stores
        </h2>
      </div>

      <div className="mask-fade-x mt-8 overflow-hidden">
        <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
              className="flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6"
            >
              {cartrabbitProducts.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="brand-link group flex items-center gap-3 rounded-2xl border border-line bg-white/70 px-6 py-4 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-card"
                    style={{ "--bc": item.color } as React.CSSProperties}
                  >
                    <Image
                      src={item.logo}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain grayscale transition duration-300 group-hover:grayscale-0"
                    />
                    <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
