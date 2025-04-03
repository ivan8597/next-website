import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ClientOnly from './ClientOnly';
import { motion } from 'framer-motion';
import { sequentialFadeIn } from '../utils/animations';
import { AriaLive, Hidden } from './A11y';

const HeaderContainer = styled(motion.header)`
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1A202C;
  cursor: pointer;
`;

const MenuButton = styled(IconButton)`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const DesktopMenu = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

interface MenuItemProps {
  $isActive?: boolean;
}

const MenuItem = styled(motion.div)<MenuItemProps>`
  color: ${props => props.$isActive ? '#1A202C' : '#4A5568'};
  font-weight: ${props => props.$isActive ? '600' : '500'};
  cursor: pointer;
  &:hover {
    color: #1A202C;
  }
`;

// Создаем placeholder для серверного рендеринга
const ServerPlaceholder = () => (
  <HeaderContainer>
    <Nav>
      <Logo>Menu</Logo>
    </Nav>
  </HeaderContainer>
);

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const menuItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

const Header = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/contact', label: t('nav.contact') }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const headerContent = (
    <HeaderContainer
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      role="banner"
    >
      <Nav>
        <Hidden>
          <h1>{t('site.name')}</h1>
        </Hidden>
        <Link href="/" legacyBehavior>
          <Logo 
            variants={sequentialFadeIn(0.1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            aria-label={t('nav.home')}
          >
            {t('site.name')}
          </Logo>
        </Link>
        <MenuButton
          edge="start"
          color="inherit"
          aria-label={t('header.toggleMenu')}
          aria-expanded={mobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <MenuIcon />
        </MenuButton>
        <DesktopMenu role="navigation" aria-label={t('nav.main')}>
          {menuItems.map(({ href, label }, index) => (
            <Link href={href} key={href} legacyBehavior>
              <MenuItem 
                $isActive={router.pathname === href}
                variants={menuItemVariants}
                whileHover={{ y: -3 }}
                whileTap={{ y: 0 }}
                custom={index}
                role="menuitem"
                aria-current={router.pathname === href ? 'page' : undefined}
              >
                {label}
              </MenuItem>
            </Link>
          ))}
        </DesktopMenu>
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={toggleMobileMenu}
          aria-label={t('nav.mobile')}
        >
          <AriaLive>
            {mobileMenuOpen ? t('header.menuOpened') : t('header.menuClosed')}
          </AriaLive>
          <List sx={{ width: 250 }} role="menu">
            {menuItems.map(({ href, label }) => (
              <ListItem
                key={href}
                button
                onClick={() => {
                  router.push(href);
                  toggleMobileMenu();
                }}
                selected={router.pathname === href}
                role="menuitem"
                aria-current={router.pathname === href ? 'page' : undefined}
              >
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Nav>
    </HeaderContainer>
  );

  return (
    <ClientOnly fallback={<ServerPlaceholder />}>
      {headerContent}
    </ClientOnly>
  );
};

export default Header;