import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    body{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
        font-family: 'Quicksand', sans-serif;
        background: #171717;
        color: #ededed;
        overflow-x: hidden;
        /* width */
        & ::-webkit-scrollbar {
        width: 10px;
        }

        /* Track */
        & ::-webkit-scrollbar-track {
        background: #171717;
        }

        /* Handle */
        & ::-webkit-scrollbar-thumb {
        background: #ededed;
        }

        /* Handle on hover */
        & ::-webkit-scrollbar-thumb:hover {
        background: #555;
        }
    }
`;

export default GlobalStyles;
