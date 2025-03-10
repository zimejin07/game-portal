"use client";

import { BRAND_CONFIG } from "@repo/constants/brandConfig";
import { useParams } from "next/navigation";
import { ButtonProps } from "@repo/types";

export function Button({ label, onClick }: ButtonProps) {
  const { market } = useParams();
  const brand =
    BRAND_CONFIG[market as keyof typeof BRAND_CONFIG] ||
    BRAND_CONFIG["casino-a"];

  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-white rounded-md"
      style={{ backgroundColor: brand.primaryColor }}
    >
      {label}
    </button>
  );
}
