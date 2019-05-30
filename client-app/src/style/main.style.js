import { createGlobalStyle } from 'styled-components';
import theme from 'shared/theme.shared'

const MainCSS = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Lato:300,700');

  html, body, #root{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    height:100%;
  }

  body {
    line-height: 1;
    font-family: ${ theme.fontFamily.primary};
  }

`;

export default MainCSS;