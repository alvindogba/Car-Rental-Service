import React, { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn';
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0
}) => {
  const [ref, isVisible] = useScrollAnimation();

  const animationClasses = {
    fadeInUp: isVisible 
      ? 'translate-y-0 opacity-100' 
      : 'translate-y-8 opacity-0',
    fadeInLeft: isVisible 
      ? 'translate-x-0 opacity-100' 
      : '-translate-x-8 opacity-0',
    fadeInRight: isVisible 
      ? 'translate-x-0 opacity-100' 
      : 'translate-x-8 opacity-0',
    fadeIn: isVisible 
      ? 'opacity-100' 
      : 'opacity-0',
    scaleIn: isVisible 
      ? 'scale-100 opacity-100' 
      : 'scale-95 opacity-0'
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${animationClasses[animation]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;