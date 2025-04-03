import React from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import Link from 'next/link';
import ClientOnly from './ClientOnly';

const FooterContainer = styled.footer`
  background: #1A202C;
  color: white;
  padding: 3rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Copyright = styled.p`
  color: #A0AEC0;
  text-align: center;
  font-size: 0.875rem;
`;

const Links = styled.div`
  display: flex;
  gap: 2rem;
`;

const FooterLink = styled.div`
  color: #A0AEC0;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

// Создаем placeholder для серверного рендеринга
const ServerPlaceholder = () => (
  <FooterContainer>
    <FooterContent>
      <Copyright>© 2023</Copyright>
    </FooterContent>
  </FooterContainer>
);

const Footer = () => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  const footerContent = (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          © {currentYear} {t('site.name')}. {t('footer.rights')}.
        </Copyright>
        <Links>
          <Link href="/privacy" legacyBehavior>
            <FooterLink>{t('footer.privacy')}</FooterLink>
          </Link>
          <Link href="/terms" legacyBehavior>
            <FooterLink>{t('footer.terms')}</FooterLink>
          </Link>
        </Links>
      </FooterContent>
    </FooterContainer>
  );

  return (
    <ClientOnly fallback={<ServerPlaceholder />}>
      {footerContent}
    </ClientOnly>
  );
};

export default Footer;