// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background: #f4f4f4;
    color: #333;
  }

  a {
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #333;
  }
`;

export default GlobalStyles;
