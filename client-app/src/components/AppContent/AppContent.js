import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import uniqueId from 'lodash/uniqueId';
import theme from 'shared/theme.shared'
import Server from 'shared/Server';
import ContactFrame from 'components/Frames/Contact.frames';
import PaymentFrame from 'components/Frames/Payment.frames';
import OrderFrame from 'components/Frames/Order.frames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faShoppingCart, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`


  @media (min-width: 520px) {
    display:flex;
    flex-direction: column;
    //padding:30px;
    background-color: white;
    flex: 1 1;
    max-width:600px;
    align-self:center;
    box-sizing: border-box;
    height:auto;
    overflow:hidden;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`

const Header = styled.div`
  //flex-grow:0 1;
  height:50px;
  font-size: 34px;
  font-weight:700;
`

const Cart = styled.div`
  display:flex;
  flex-grow:0 1;
  min-height : 60px;
  height:auto;
  overflow:hidden;
  background-color:white;
  border: 1px solid rgb(${theme.color.accent});
  border-radius : ${theme.shape.border};
  -moz-border-radius : ${theme.shape.border};
  -webkit-border-radius : ${theme.shape.border};
  padding:10px;
  margin:10px 0;
  flex-direction:row;

  .infos{
    flex-grow:1;
  }

  .items{
    font-size: 19px;

    small{
      font-size: 13px;
    }
  }

  .icon--shopping-cart{
    margin-right:5px;
    path{
      fill: rgb(${theme.color.accent});
    }
  }
`

const Toaster = styled.div`
  display:flex;
  flex-grow:0 1;
  height : 60px;
  color:black;
  background-color: rgb(242,242,242);
  border-radius : ${theme.shape.border};
  -moz-border-radius : ${theme.shape.border};
  -webkit-border-radius : ${theme.shape.border};
  padding:10px;
  margin:10px 0;

  p{
    line-height: 45px;
    margin-left:10px;
    font-size:16px;
  }
  .fa-check-circle{
    font-size:38px;
    path{
      fill:green;
    }
  }
`

const CheckoutNav = styled.div`
  flex-grow:0 1;
  height:50px;
  display:flex;
  flex-direction:row;
  max-width: 100%;
  overflow: hidden;
`

const CheckoutNavItem = styled.div`
  flex-grow:1;
  background-color:white;
  cursor:pointer;
  line-height: 50px;
  text-align:center;

  span{
    padding:0px 5px 5px;
  }

  @media (max-width: 480px) {
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
      ${ (props) => props.step && props.step == 'CONTACT' && css`
        border-bottom: 4px solid rgb( ${theme.color.base} );
      `}

      ${ (props) => props.step && props.step == 'PAYMENT' && css`
        border-bottom: 4px solid rgb( ${theme.color.base1} );
      `}

      ${ (props) => props.step && props.step == 'ORDER' && css`
        border-bottom: 4px solid rgb( ${theme.color.base2} );
      `}
    }

    @media (max-width: 480px) {
      font-size:23px;
    }

  }

  path{
    ${ (props) => props.step && props.step == 'CONTACT' && css`
      fill: rgb( ${theme.color.base} );
    `}

    ${ (props) => props.step && props.step == 'PAYMENT' && css`
      fill:  rgb( ${theme.color.base1} );
    `}

    ${ (props) => props.step && props.step == 'ORDER' && css`
      fill: rgb( ${theme.color.base2} );
    `}
  }
`

const FrameContainer = styled.div`
  width:auto;
  overflow:hidden;
`

let cartInfo = null;
let contactData = null;
let paymentData = null;
let orderData = {};

const navItems = [
  {  step:'CONTACT', label:'Kontakdaten', status:'none' },
  {  step:'PAYMENT', label:'Bezahlinformationen', status:'none' },
  {  step:'ORDER', label:'Bestellabschluss', status:'none' },
]

const AppContent = (props) => {

  const [ loadingCart, setLoadingCart] = useState(false);
  const [ step, setStep ] = useState('CONTACT');
  const [ process, setProcess ] = useState('CHECKOUT'); // CHECKOUT, DONE

  const setCurrentStep = (step) => {
    setStep( step )
  }

  const stepCallBack = {
    contact: ( formData ) =>{
      contactData = formData;
      orderData['contact'] = contactData;
      setCurrentStep('PAYMENT')
    },
    payment: ( x ) =>{
      console.log( x );
      setCurrentStep('ORDER')
    },
    order: ( x ) =>{
      console.log( x );
      setProcess('DONE')
    }
  } 

  useEffect(() => {
    setLoadingCart( true ); 
    Server.getCart( 12 )
    .then( successData =>{ 
      cartInfo = successData; 
      setLoadingCart( false ); 
      console.log( cartInfo ) 
    } );
  }, []);
    
  return(
   <Container>
     <Header>Checkout</Header>
     {  
        process && process == 'CHECKOUT' && cartInfo && cartInfo.cartId &&
          <Cart> 
            <div className="infos">
              <b>Cart Id:</b> {cartInfo.cartId} <br />
              <b>Summe:</b> {cartInfo.price} € <br />
              <b>Mehrwertsteuer:</b> {cartInfo.taxes} % <br />
              <b>Gesamtsumme:</b> {cartInfo.totalPrice} € <br />
              <b>Lieferkosten:</b> {cartInfo.shippingCost} € 
            </div>
            <div className="items">
              <FontAwesomeIcon icon={faShoppingCart} className="icon--shopping-cart" /> 
              {cartInfo.products.length} <small>Items</small>
            </div>
          </Cart>
     }
     {
        process && process == 'CHECKOUT' &&
        <CheckoutNav> 
          {
            navItems && navItems[0] &&
            navItems.map( (item) => {
              return <CheckoutNavItem 
                          key={uniqueId('tab_')} 
                          step={ item.step }
                          className={ step === item.step ? 'active' : '' }
                          onClick={ () => setCurrentStep( item.step )  }

                      >
                        <FontAwesomeIcon icon={faChevronCircleRight} />
                        <span>{ item.label }</span>
                      </CheckoutNavItem>
            })
          }
        </CheckoutNav>
      }
      {
        process && process == 'CHECKOUT' &&
        <FrameContainer>
        { step && step == 'CONTACT' && <ContactFrame fieldsData={contactData} clicked={ ( params ) => stepCallBack.contact( params ) } /> }
        { step && step == 'PAYMENT' && <PaymentFrame clicked={ ( params ) => stepCallBack.payment( params ) } /> }
        { step && step == 'ORDER' && <OrderFrame orderData={ orderData } clicked={ ( params ) => stepCallBack.order( params ) }/> }
        </FrameContainer>
      }
      {
        process && process == 'DONE' &&
        <Toaster> 
          <FontAwesomeIcon icon={faCheckCircle} />
          <p>Vielen Dank für Ihre Bestellung.</p>
        </Toaster>
      }
   </Container>
  )
}
export default AppContent