import { useEffect, useState } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
`;

interface YouTubeLiteProps {
  videoId: string;
}

const YouTubeLite = ({ videoId }: YouTubeLiteProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <VideoContainer>
      {!isLoaded && (
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt="Video thumbnail"
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          onClick={() => setIsLoaded(true)}
        />
      )}
      {isLoaded && (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute' }}
        />
      )}
    </VideoContainer>
  );
};

export default YouTubeLite;