import React from 'react';
import styled from 'styled-components';

const SkipLink = styled.a`
  position: absolute;
  left: -9999px;
  top: 0;
  padding: 1rem;
  background: #1a202c;
  color: white;
  z-index: 9999;

  &:focus {
    left: 0;
  }
`;

const VisuallyHidden = styled.span`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
`;

export const SkipToContent: React.FC = () => (
  <SkipLink href="#main-content">
    Перейти к основному содержанию
  </SkipLink>
);

interface AriaLiveProps {
  children: React.ReactNode;
  type?: 'polite' | 'assertive';
}

export const AriaLive: React.FC<AriaLiveProps> = ({ 
  children, 
  type = 'polite' 
}) => (
  <div aria-live={type} aria-atomic="true">
    {children}
  </div>
);

export const Hidden: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => (
  <VisuallyHidden>{children}</VisuallyHidden>
);

export const A11yProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => (
  <>
    <SkipToContent />
    {children}
  </>
); 