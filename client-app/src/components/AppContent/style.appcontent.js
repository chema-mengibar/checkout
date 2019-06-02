import { createGlobalStyle, css } from 'styled-components';
import theme from '../../shared/theme.shared'

export const AppContentCss = createGlobalStyle`
  
  .container-override{
    max-width:720px;
    @media (max-width: 575.98px) {
      padding: 10px; 
    }
  }

  .row-override{
    margin-left:0 !important;
    margin-right:0 !important;
  }

  .app-content__view-title-row{
    margin: 10px 0 20px;
  }

  p{
    color: rgb( ${ theme.color.baseDark});
    margin: 0 !important;

    &.text--accent{
      color: rgb( ${ theme.color.ciDark});
      font-size:20px;
    }
  }

  .app-content__toaster{
    display:flex;
    color:rgb( ${ theme.color.baseDark} );

    p{
      line-height: 45px;
      
      font-size:16px;
    }
    .fa-check-circle{
      font-size:38px;
      margin-right:10px;
      path{
        fill:green;
     }
    }
  }
`;