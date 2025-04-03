import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ImageWrapperProps {
  $rounded?: boolean;
  $shadow?: boolean;
}

const ImageWrapper = styled(motion.div)<ImageWrapperProps>`
  position: relative;
  overflow: hidden;
  border-radius: ${props => props.$rounded ? '50%' : '0'};
  box-shadow: ${props => props.$shadow ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
  
  &:hover {
    img[data-hover="zoom"] {
      transform: scale(1.05);
    }
  }
`;

const StyledImage = styled(Image)`
  transition: transform 0.3s ease;
`;

// Компонент для отображения заглушки
const Placeholder = styled.div<ImageWrapperProps>`
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 200%;
  animation: shimmer 1.5s infinite;
  border-radius: ${props => props.$rounded ? '50%' : '0'};
  
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  rounded?: boolean;
  shadow?: boolean;
  fadeIn?: boolean;
  hover?: 'zoom' | 'none';
  style?: React.CSSProperties;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  rounded = false,
  shadow = false,
  fadeIn = true,
  hover = 'none',
  style = {},
  priority = false,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  // Генерируем заглушку для отсутствующего изображения
  const generatePlaceholderSrc = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#e0e0e0';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(alt || 'Image', width / 2, height / 2);
    }
    return canvas.toDataURL();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <ImageWrapper
      $rounded={rounded}
      $shadow={shadow}
      initial={fadeIn ? { opacity: 0 } : undefined}
      animate={fadeIn ? { opacity: 1 } : undefined}
      transition={{ duration: 0.3 }}
      style={style}
    >
      {hasError ? (
        <Placeholder $rounded={rounded} />
      ) : (
        <StyledImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          onError={handleError}
          onLoad={handleLoad}
          data-hover={hover}
          priority={priority}
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
      {isLoading && !hasError && <Placeholder $rounded={rounded} />}
    </ImageWrapper>
  );
};

export default OptimizedImage; 