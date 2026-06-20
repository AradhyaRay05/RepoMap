import { useId } from "react";

type RepoMapLogoProps = {
  className?: string;
};

export default function RepoMapLogo({
  className = "w-10 h-10",
}: RepoMapLogoProps) {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="8"
          y1="6"
          x2="56"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
      </defs>

      <rect
        x="7"
        y="7"
        width="50"
        height="50"
        rx="13"
        fill={`url(#${gradientId})`}
      />
      <rect
        x="9.5"
        y="9.5"
        width="45"
        height="45"
        rx="10.5"
        stroke="#D8B4FE"
        strokeOpacity="0.9"
        strokeWidth="3"
      />

      <path
        d="M22 21H42"
        stroke="#DDD6FE"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M22 21V35"
        stroke="#DDD6FE"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M42 21V35"
        stroke="#DDD6FE"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M22 35H42"
        stroke="#DDD6FE"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M32 35V46"
        stroke="#DDD6FE"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      <circle cx="22" cy="21" r="4.5" fill="#F5F3FF" />
      <circle cx="42" cy="21" r="4.5" fill="#F5F3FF" />
      <circle cx="22" cy="35" r="4.5" fill="#C084FC" />
      <circle cx="42" cy="35" r="4.5" fill="#C084FC" />
      <circle cx="32" cy="46" r="5" fill="#FFFFFF" />
    </svg>
  );
}
