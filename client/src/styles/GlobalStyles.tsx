import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    body{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
        font-family: 'Quicksand', sans-serif;
        background: #F1F1F1;
    }
`;

export default GlobalStyles;
