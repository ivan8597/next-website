import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ButtonGroup, Button } from '@mui/material';
import ClientOnly from './ClientOnly';

const SwitcherContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  
  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
  }
`;

const StyledButton = styled(Button)`
  font-size: 14px !important;
  padding: 4px 12px !important;
  min-width: 40px !important;
  
  @media (max-width: 768px) {
    font-size: 12px !important;
    padding: 2px 8px !important;
  }
`;

// Placeholder для серверного рендеринга
const ServerPlaceholder = () => null;

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  
  const switcherContent = (
    <SwitcherContainer>
      <ButtonGroup variant="contained" size="small">
        <StyledButton
          onClick={() => router.push({ pathname, query }, asPath, { locale: 'ru' })}
          color={router.locale === 'ru' ? 'primary' : 'inherit'}
          variant={router.locale === 'ru' ? 'contained' : 'outlined'}
        >
          RU
        </StyledButton>
        <StyledButton
          onClick={() => router.push({ pathname, query }, asPath, { locale: 'en' })}
          color={router.locale === 'en' ? 'primary' : 'inherit'}
          variant={router.locale === 'en' ? 'contained' : 'outlined'}
        >
          EN
        </StyledButton>
      </ButtonGroup>
    </SwitcherContainer>
  );
  
  return (
    <ClientOnly fallback={<ServerPlaceholder />}>
      {switcherContent}
    </ClientOnly>
  );
};

export default LanguageSwitcher; 