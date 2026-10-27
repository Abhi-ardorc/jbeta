export const LogoMark = ({ className = "h-9 w-9" }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <path
      d="M24 15.5c-3.6-3-8-4.1-14-3.4v21.4c6-.7 10.4.4 14 3.4 3.6-3 8-4.1 14-3.4V12.1c-6-.7-10.4.4-14 3.4Z"
      stroke="#4E6BA8"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path d="M24 15.5v21.4" stroke="#4E6BA8" strokeWidth="2.4" />
    <path
      d="M24 4l1.7 3.2 3.5 1.6-3.5 1.5L24 13.5l-1.7-3.2-3.5-1.5 3.5-1.6L24 4Z"
      fill="#4E6BA8"
    />
  </svg>
);

export const Wordmark = ({ className = "" }) => (
  <span className={`font-serif leading-none ${className}`}>
    Believe <em className="italic text-copper">Joanie</em> Believe
  </span>
);
