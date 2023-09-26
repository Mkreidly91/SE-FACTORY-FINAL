import { ReactNode, useRef } from 'react';
import { useInView } from 'framer-motion';

function InView({
  children,
  transform,
  duration = '0.9',
  delay = '0.5',
  className,
}: {
  children: ReactNode;
  transform: string;
  duration?: string;
  delay?: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 'some' });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isInView ? 'none' : `${transform}`,
        opacity: isInView ? 1 : 0,
        transition: `all ${duration}s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default InView;
