import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  aspectRatio?: number;
  rounded?: boolean;
  shadow?: boolean;
  fadeIn?: boolean;
  hover?: 'zoom' | 'lift' | 'none';
}

const ImageWrapper = styled(motion.div)<{
  $aspectRatio?: number;
  $rounded: boolean;
  $shadow: boolean;
}>`
  position: relative;
  width: 100%;
  height: ${props => props.$aspectRatio ? 'auto' : '100%'};
  padding-top: ${props => props.$aspectRatio ? `${100 / props.$aspectRatio}%` : '0'};
  overflow: hidden;
  border-radius: ${props => props.$rounded ? '8px' : '0'};
  box-shadow: ${props => props.$shadow ? '0 4px 12px rgba(0, 0, 0, 0.08)' : 'none'};
`;

const StyledImage = styled(Image)<{ $isLoaded: boolean }>`
  opacity: ${props => props.$isLoaded ? 1 : 0};
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  rounded = false,
  shadow = false,
  fadeIn = true,
  hover = 'none',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Варианты эффектов при наведении
  const hoverEffects = {
    zoom: { scale: 1.05 },
    lift: { y: -10 },
    none: {}
  };
  
  useEffect(() => {
    // Сбрасываем состояние загрузки при изменении src
    setIsLoaded(false);
  }, [src]);
  
  const handleLoadingComplete = () => {
    setIsLoaded(true);
  };
  
  return (
    <ImageWrapper 
      $aspectRatio={aspectRatio}
      $rounded={rounded}
      $shadow={shadow}
      whileHover={hoverEffects[hover]}
      transition={{ duration: 0.3 }}
    >
      <StyledImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        $isLoaded={!fadeIn || isLoaded}
        onLoadingComplete={handleLoadingComplete}
        style={{
          objectFit: 'cover',
          position: aspectRatio ? 'absolute' : 'relative',
          top: 0,
          left: 0,
          width: '100%',
          height: aspectRatio ? '100%' : 'auto'
        }}
        {...props}
      />
    </ImageWrapper>
  );
};

export default OptimizedImage; 