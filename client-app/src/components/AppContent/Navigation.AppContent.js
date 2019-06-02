import React from 'react';
import styled from 'styled-components';
import uniqueId from 'lodash/uniqueId';
import theme from '../../shared/theme.shared'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

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