export default function Mark({ small = false }: { small?: boolean }) {
  const size = small ? 28 : 150;

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <line x1="60" y1="5" x2="60" y2="47" stroke="currentColor" strokeWidth="2" />
      <line x1="60" y1="73" x2="60" y2="115" stroke="currentColor" strokeWidth="2" />
      <path
        d="M44 27C22 35 16 52 16 60C16 68 22 85 44 94"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
      />
      <path
        d="M76 27C98 35 104 52 104 60C104 68 98 85 76 94"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
      />
      <circle cx="60" cy="60" r="5" fill="#aa8743" />
    </svg>
  );
}
