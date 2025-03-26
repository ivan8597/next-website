import { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { StyleSheetManager, createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import theme from '../styles/theme';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'as'}>
      <ThemeProvider theme={theme}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
        <CssBaseline />
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </StyleSheetManager>
  );
}

export default MyApp;