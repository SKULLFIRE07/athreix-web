type Props = {
  className?: string;
};

export default function Mark({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Athreix mark"
      className={className}
    >
      {/* Outer peak silhouette */}
      <path
        d="M24 3 L44 45 L4 45 Z"
        fill="currentColor"
      />
      {/* Inner negative cut — splits the peak vertically with two angled blades */}
      <path
        d="M24 17 L34 42 L28 42 L24 33 L20 42 L14 42 Z"
        fill="var(--background, #000)"
      />
    </svg>
  );
}
