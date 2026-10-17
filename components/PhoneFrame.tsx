/** A clean, CSS-only Android phone frame for product mockups. */
export default function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19] w-full rounded-[2.6rem] bg-[#0E0F14] p-[0.55rem] shadow-[0_40px_80px_-30px_rgba(10,11,16,0.55),inset_0_0_0_1.5px_rgba(255,255,255,0.08)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-white">
        <div aria-hidden="true" className="absolute left-1/2 top-2.5 z-10 h-5 w-5 -translate-x-1/2 rounded-full bg-[#0E0F14]" />
        {children}
      </div>
    </div>
  );
}
