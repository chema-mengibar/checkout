import React, { Fragment, useState, useEffect } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import uniqueId from 'lodash/uniqueId';
import theme from 'shared/theme.shared'
import Server from 'shared/Server';
import ContactFrame from 'components/Frames/Contact.frames';
import PaymentFrame from 'components/Frames/Payment.frames';
import OrderFrame from 'components/Frames/Order.frames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faShoppingCart, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const NavigationCss = createGlobalStyle`
  
`;

const NavigationContainer = styled.div`
  display:flex;
  flex-direction:row;
`

const CheckoutNavItem = styled.div`
  flex-grow:1;
  text-align:center;

  span{
    padding:0px 5px 5px;
    font-size : 17px;
  }

  path{
    fill: rgb( ${theme.color.baseMedium} );
  }

  @media (max-width: 480px) {
    font-size:23px;
    span{
      display:none;
    }
  }

  @media (min-width: 520px) {
    svg{
      display:none;
    }
  }

  &.active{
    span{
      color: rgb( ${theme.color.ciDark} );
    }
    path{
      fill:  rgb( ${theme.color.ciDark} );
    }
  }
`

const Navigation = (props) => {

  const navItems = props.items;
  const step = props.step;

  return(
    <NavigationContainer>
      <NavigationCss/>
      {
        navItems && navItems[0] &&
        navItems.map( (item) => {
          return <CheckoutNavItem 
                      key={uniqueId('tab_')} 
                      step={ item.step }
                      className={ step === item.step ? 'active' : '' }
                   >
                    <FontAwesomeIcon icon={faChevronCircleRight} />
                    <span>{ item.label }</span>
                  </CheckoutNavItem>
        })
      }
      
    </NavigationContainer>  
  )
}  

export default Navigation