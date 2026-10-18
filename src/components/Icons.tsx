import type { SVGProps } from 'react';

export function Arrow({ direction = 'up', ...props }: SVGProps<SVGSVGElement> & { direction?: 'up' | 'down' | 'right' }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}
    style={{ transform: direction === 'down' ? 'rotate(135deg)' : direction === 'right' ? 'rotate(45deg)' : undefined, ...props.style }}>
    <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" />
  </svg>;
}

export function Asterisk(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true" {...props}>
    {[0, 45, 90, 135].map((angle) => <rect key={angle} x="42" y="0" width="16" height="100" transform={`rotate(${angle} 50 50)`} />)}
  </svg>;
}
