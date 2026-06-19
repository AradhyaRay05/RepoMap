export default function RepoMapLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id="repoGradient"
          x1="0"
          y1="0"
          x2="64"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#9F67FF" />
          <stop offset="100%" stopColor="#7B39FC" />
        </linearGradient>
      </defs>

      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="14"
        stroke="url(#repoGradient)"
        strokeWidth="3"
      />

      <path d="M22 20H42" stroke="url(#repoGradient)" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 20V34" stroke="url(#repoGradient)" strokeWidth="3" strokeLinecap="round" />
      <path d="M42 20V34" stroke="url(#repoGradient)" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 34H42" stroke="url(#repoGradient)" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 34V46" stroke="url(#repoGradient)" strokeWidth="3" strokeLinecap="round" />

      <circle cx="22" cy="20" r="4" fill="#9F67FF" />
      <circle cx="42" cy="20" r="4" fill="#9F67FF" />
      <circle cx="22" cy="34" r="4" fill="#7B39FC" />
      <circle cx="42" cy="34" r="4" fill="#7B39FC" />
      <circle cx="32" cy="46" r="4.5" fill="#FFFFFF" />
    </svg>
  );
}