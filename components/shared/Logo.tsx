import Image from "next/image";
import logoMark from "@/public/logo-mark.jpeg";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP: Record<NonNullable<LogoProps["size"]>, number> = {
  sm: 56,
  md: 88,
  lg: 132,
};

export function Logo({ size = "md", className = "" }: LogoProps) {
  const px = SIZE_MAP[size];

  return (
    <Image
      src={logoMark}
      alt="Explo-Gen Technologies"
      width={px}
      height={px}
      priority
      className={`rounded-xl shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] ${className}`}
    />
  );
}
