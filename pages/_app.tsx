import { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { StyleSheetManager, createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
import theme from '../styles/theme';

const clientSideEmotionCache = createEmotionCache();

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }
`;

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppProps & { emotionCache?: ReturnType<typeof createEmotionCache> }) {
  return (
    <CacheProvider value={emotionCache}>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== 'as'}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </StyleSheetManager>
    </CacheProvider>
  );
}

export default MyApp;