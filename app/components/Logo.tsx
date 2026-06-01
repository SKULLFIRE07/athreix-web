type Props = {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeMap = {
  sm: "h-5 md:h-6",
  md: "h-7 md:h-9",
  lg: "h-12 md:h-16",
  xl: "h-16 md:h-24",
};

export default function Logo({ className = "", size = "md" }: Props) {
  return (
    <svg
      viewBox="0 0 360 80"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Athreix"
      className={`${sizeMap[size]} w-auto ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <text
        x="0"
        y="62"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontWeight={600}
        fontSize={72}
        letterSpacing={4}
        fill="currentColor"
      >
        ATHREIX
      </text>

      {/* Short, sharp sweep accent over the X */}
      <path
        d="M 272 14 L 358 2"
        stroke="currentColor"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
