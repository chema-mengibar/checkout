import React, { Fragment, useState, useEffect } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import theme from 'shared/theme.shared'

const ProductCss = createGlobalStyle`
  
`;

const ProductContainer = styled.div`
  display:flex
  flex-direction:row;
  margin-top: 10px;

  &:not(:last-child):after {
    border-bottom: 1px solid rgb( ${theme.color.baseLight} );
  }

  .product__left{
    padding-right:10px;
  }

  .product__right{
    flex-grow:1;
  }

  .product__img{
    width:100px;
    height:100px;
    background-color: rgb( ${theme.color.baseLight} );
  }

  .product__name{
    font-size : 18px;
    margin-bottom:5px;
    color:  rgb( ${theme.color.ciDark} );
  }

  .product__extras{
    color:  rgb( ${theme.color.baseMedium} );
  }
`

const Product = (props) => {

  const infos = props.info;

  return(
    <ProductContainer>
      <ProductCss/>
      <div className="product__left">
        <div className="product__img"></div>
      </div>
      <div className="product__right"> 
        <div className="product__name"> { infos.name } </div>
        <div className="product__extras"> { infos.extras } </div>
      </div>
    </ProductContainer>  
  )
}  

export default Product