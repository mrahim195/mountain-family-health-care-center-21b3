import type { SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement> & {
  variant?: "full" | "mark";
  title?: string;
};

export function Logo({
  variant = "full",
  title = "Mountain Family Health Care Center",
  className,
  ...props
}: LogoProps) {
  const size = variant === "mark" ? 36 : 42;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
      {...props}
    >
      <title>{title}</title>
      <rect width="42" height="42" rx="11" fill="#1B4538" />
      <path
        d="M7.5 28.5 15.2 16.8l4.1 5.6 5.2-8.4L34.5 28.5H7.5Z"
        fill="#E8F2EE"
      />
      <path
        d="M15.2 16.8 19.3 22.4 21.8 18.8 26.5 14l8 14.5H21.2l-1.9-2.6-4.1-5.6Z"
        fill="#9BC4B4"
        opacity="0.9"
      />
      <path
        d="M21 11.2v3.2M21 12.8h0"
        stroke="#E8F2EE"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M19.2 13.6h3.6"
        stroke="#E8F2EE"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="21" cy="11.2" r="1.35" fill="#7EB8C9" />
    </svg>
  );
}
