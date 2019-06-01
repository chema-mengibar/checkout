// @flow

import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import MainCSS from 'style/main.style';
import theme from 'shared/theme.shared';

const Wrapper = styled.div`
  background-color: white;
  min-height:100%;
  width:100%;  
  display:flex;
  flex-direction:column;
 
  @media (max-width: 700px) {
    background-color: ${theme.color.green};
  }
`;

//AppWrapper or Fragment
const AppWrapper = ({
  children,
}:Props):Node => (
  <Wrapper>
    <MainCSS/>
    {children}
  </Wrapper>
);

export default AppWrapper;