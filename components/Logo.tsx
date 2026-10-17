import Image from "next/image";

/** The cloud "D" brand mark, the same artwork as the favicon. */
export default function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/icon.svg"
      alt=""
      width={size}
      height={size}
      unoptimized
      priority
      className={`shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
