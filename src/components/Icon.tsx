import type { FC } from 'react';

type IconProps = {
  name: 'home' | 'tasks' | 'calendar' | 'badges' | 'shop' | 'profile' | 'close' | 'back';
  size?: number;
  stroke?: string;
};

const Icon: FC<IconProps> = ({ name, size = 24, stroke = 'currentColor' }) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5.25 9.75V21h13.5V9.75" />
          <path d="M9.75 21v-6h4.5v6" />
        </svg>
      );
    case 'tasks':
      return (
        <svg {...common}>
          <path d="M9 5h12" />
          <path d="M9 12h12" />
          <path d="M9 19h12" />
          <path d="M4 5h.01" />
          <path d="M4 12h.01" />
          <path d="M4 19h.01" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common}>
          <rect x={3} y={5} width={18} height={16} rx={2} />
          <path d="M16 3v4" />
          <path d="M8 3v4" />
          <path d="M3 11h18" />
        </svg>
      );
    case 'badges':
      return (
        <svg {...common}>
          <path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7z" />
          <path d="m9 10 2 2 4-4" />
        </svg>
      );
    case 'shop':
      return (
        <svg {...common}>
          <path d="m4 7 2 14h12l2-14" />
          <path d="M5 7h14l-2-4H7z" />
          <path d="M15 11a3 3 0 1 1-6 0" />
        </svg>
      );
    case 'profile':
      return (
        <svg {...common}>
          <circle cx={12} cy={8} r={4} />
          <path d="M4 21c1.5-3.5 4.5-5.5 8-5.5s6.5 2 8 5.5" />
        </svg>
      );
    case 'close':
      return (
        <svg {...common}>
          <path d="m6 6 12 12" />
          <path d="m6 18 12-12" />
        </svg>
      );
    case 'back':
      return (
        <svg {...common}>
          <path d="m11 5-7 7 7 7" />
          <path d="M18 12H5" />
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
