import Image from "next/image";
import type { CSSProperties } from "react";

const cartrabbitProducts = [
  {
    name: "Retainful",
    color: "#F85C1B",
    url: "https://www.retainful.com/",
    logo: "/images/logos/retainful.svg",
  },
  {
    name: "Flycart",
    color: "#EA242B",
    url: "https://www.flycart.org/",
    logo: "/images/logos/flycart.svg",
  },
  {
    name: "WPLoyalty",
    color: "#4F47EB",
    url: "https://wployalty.net/",
    logo: "/images/logos/wployalty.svg",
  },
  {
    name: "UpsellWP",
    color: "#3B82F6",
    url: "https://upsellwp.com/",
    logo: "/images/logos/upsellwp.svg",
  },
  {
    name: "Spark Editor",
    color: "#2FBF71",
    url: "https://sparkeditor.com/",
    logo: "/images/logos/spark.svg",
  },
  {
    name: "Yuko",
    color: "#6F65F8",
    url: "https://yuko.so/",
    logo: "/images/logos/yuko.svg",
  },
];

export default function LogoStrip() {
  return (
    <section
      aria-label="Products I built for at Cartrabbit"
      className="bg-black py-12"
    >
      <div className="section">
        <p className="text-center text-sm font-medium text-white/70">
          Front end I built and maintained at Cartrabbit for 1.10 years, used by 300,000+ stores
        </p>
        <ul className="mt-7 flex flex-wrap items-start justify-center gap-x-10 gap-y-6">
          {cartrabbitProducts.map((product) => (
            <li key={product.name}>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ "--bc": product.color } as CSSProperties}
                className="brand-link flex flex-col items-center gap-2 font-display text-lg font-bold tracking-tight text-white sm:text-xl"
              >
                <Image
                  src={product.logo}
                  alt={`${product.name} logo`}
                  width={40}
                  height={40}
                  className="product-logo h-10 w-10"
                />
                <span>{product.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
