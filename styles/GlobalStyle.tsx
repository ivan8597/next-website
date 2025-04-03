import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    color: #1A202C;
    background: #FFFFFF;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  /* Улучшения доступности */
  :focus {
    outline: 2px solid #4299E1;
    outline-offset: 2px;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  :focus-visible {
    outline: 2px solid #4299E1;
    outline-offset: 2px;
  }

  /* Скрытие скролл-бара для WebKit браузеров */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #F7FAFC;
  }

  ::-webkit-scrollbar-thumb {
    background: #CBD5E0;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #A0AEC0;
  }
`;

export default GlobalStyle; 