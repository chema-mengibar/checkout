import { createGlobalStyle } from 'styled-components';
import theme from 'shared/theme.shared'

const MainCSS = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Lato:300,700');

  html, body, #root{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    height:100%;
  }

  body {
    line-height: 1;
  }

  form{
    display:flex;
    flex-direction:row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .form-group{
    margin-bottom: 15px !important;
    flex: 0 0 100%;
    
    &--50{
      flex: 0 0 48%;
    }
  }

  .form-check{
    label{
      color: rgb(${theme.color.baseMedium}) ;
      top: -2px;
      position: relative;
      margin-left: 5px;
    }
  }

  input[type=checkbox]
  {
    /* Double-sized Checkboxes */
    -ms-transform: scale(1.2); /* IE */
    -moz-transform: scale(1.2); /* FF */
    -webkit-transform: scale(1.2); /* Safari and Chrome */
    -o-transform: scale(1.2); /* Opera */
    transform: scale(1.2);
    padding: 10px;
    margin-left:2px!important;
  }
  
  input:-internal-autofill-selected{
    background-color: rgb(${theme.color.base}) !important;
  }

  .frame-group-title{
    color:rgb(${theme.color.baseMedium});
    font-size : 18px;
    font-weight : ${ theme.fontWeigth.bold};
    margin:20px 0px 10px;
  }

`;

export default MainCSS;