import { BRAND_CONFIG } from "@repo/constants/brandConfig";
import { useParams } from "next/navigation";

export function Layout({ children }: { children: React.ReactNode }) {
  const { market } = useParams();
  const brand =
    BRAND_CONFIG[market as keyof typeof BRAND_CONFIG] ||
    BRAND_CONFIG["casino-a"];

  return (
    <div
      className="p-6"
      style={{ "--brand-color": brand.primaryColor } as React.CSSProperties}
    >
      <header className="p-4 bg-[var(--brand-color)] text-white text-center">
        <h1 className="text-2xl font-bold">{brand.name}</h1>
      </header>
      {children}
    </div>
  );
}
