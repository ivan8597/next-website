import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'styled-components';
import { A11yProvider } from '../components/A11y';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <A11yProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </A11yProvider>
    </ThemeProvider>
  );
}

export default appWithTranslation(App);