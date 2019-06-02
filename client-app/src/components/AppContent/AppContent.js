import React, { Fragment, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { AppContentCss } from './style.appcontent'
import uniqueId from 'lodash/uniqueId';
import theme from 'shared/theme.shared'
import Server from 'shared/Server';
import ContactFrame from 'components/Frames/Contact.frames';
import PaymentFrame from 'components/Frames/Payment.frames';
import OrderFrame from 'components/Frames/Order.frames';
import { ClipLoader } from 'react-spinners';
import Navigation from 'components/AppContent/Navigation.AppContent';
import Product from 'components/AppContent/Product.AppContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col } from 'react-bootstrap';

const StyledContainer = styled.div`
  background-color:transparent;
  font-family: ${ theme.fontFamily.primary};
`

const ViewTitle = styled.div`
  font-weight : ${ theme.fontWeigth.bold};
  font-size : 25px;
  color: rgb( ${ theme.color.baseMedium});
`

const RowTitle = styled(ViewTitle)`
  font-size : 18px;
  margin-bottom:20px;
`

const RowBox = styled(Row)`
  background : #FFFFFF;
  background : rgba(255, 255, 255, 1);
  border-radius : 10px;
  -moz-border-radius : 10px;
  -webkit-border-radius : 10px;
  box-shadow : 2px 3px 4px rgba(0, 0, 0, 0.1);
  min-height:50px;
  padding:25px;
  margin-bottom:25px;
  margin-left:0 !important;
  margin-right:0 !important;

  ${ (props) => props.action && css`
    margin-bottom:0;
    border-radius :10px 10px  0 0 ;
    -moz-border-radius : 10px 10px  0 0 ;
    -webkit-border-radius :10px 10px  0 0 ;
  `}

  ${ (props) => props.navigation && css`
    margin-bottom:0;
    border-radius : 0 0 10px 10px;
    -moz-border-radius : 0 0 10px 10px;
    -webkit-border-radius : 0 0 10px 10px;
  `}
`

const RowBoxNavigation = styled(RowBox)`
  margin-bottom:0;
  border-radius :10px 10px  0 0 ;
  -moz-border-radius : 10px 10px  0 0 ;
  -webkit-border-radius :10px 10px  0 0 ;
  border-bottom: 1px solid rgb( ${ theme.color.baseLight} )
`

const ActionRow = styled(Row)`
  background : rgb( ${ theme.color.ciLight});
  box-shadow : 2px 3px 4px rgba(0, 0, 0, 0.1);
  min-height:40px;
  padding:10px;
  margin-bottom:25px;
  margin-top:0;
  margin-left:0 !important;
  margin-right:0 !important;
  border-radius : 0 0 10px 10px ;
  -moz-border-radius :0 0 10px 10px ;
  -webkit-border-radius :0 0 10px 10px ;
  text-align:center;
  color:white;
  font-size:18px;
  font-weight: ${ theme.fontWeigth.bold};
  cursor:pointer;
`

const views = {
  'CART': { label:'Warenkorb' },
  'CHECKOUT': { label:'Checkout' },
  'DONE': { label:'Vielen Dank!' }
}

const navItems = [
  {  step:'CONTACT', label:'Kontakdaten', status:'none' },
  {  step:'PAYMENT', label:'Bezahlinformationen', status:'none' },
  {  step:'ORDER', label:'Bestellabschluss', status:'none' },
]

let contactData = null;
let orderData = {};

const AppContent = (props) => {

  const [ loadingCart, setLoadingCart] = useState(false);
  const [ currentView, setCurrentView ] = useState('CART'); // CART, CHECKOUT, DONE
  const [ step, setStep ] = useState('CONTACT'); // CONTACT, PAYMENT, ORDER
  const [ cartInfos, setCartInfos ] = useState({}); 
  const [ products, setProducts ] = useState([]); 

  const setCurrentStep = (step) => { setStep( step ) }

  useEffect(() => {
    setLoadingCart( true ); 
    Server.getCart( 12 )
    .then( successData =>{ 
      setLoadingCart( false ); 
      setCartInfos( successData );
      setProducts( successData.products );
    } );
  }, []);

  const stepCallBack = {
    contact: ( formData ) => {
      contactData = formData;
      orderData['contact'] = formData;
      setCurrentStep('PAYMENT')
    },
    payment: ( formData ) => {
      orderData['payment'] = formData;
      setCurrentStep('ORDER')
    },
    order: () => {
      setCurrentView('DONE')
    }
  } 

  return(
  <StyledContainer>
    <AppContentCss />
    <Container fluid={false} className='container-override'>
      <Row className="app-content__view-title-row row-override">
        <Col> 
          <ViewTitle>{ views[ currentView ].label }</ViewTitle>
        </Col>
      </Row>
      {
        currentView && currentView == 'CART' && 
        <Fragment>
          <RowBox>
            <Col> 
              <RowTitle>Items {products.length}</RowTitle>
              { loadingCart && <ClipLoader sizeUnit={"px"} size={25}  loading={ loadingCart } color={'rgb(255, 128, 54)'}  /> }
              {
                products && products[0] &&
                products.map( ( productItem ) => { 
                  return <Product key={ uniqueId('product_') } info={ productItem }/>  
                })
              }
            </Col>
          </RowBox> 
          <RowBox action={'true'}>
            <RowTitle>Details</RowTitle>
            { loadingCart &&  <ClipLoader sizeUnit={"px"} size={25} loading={ loadingCart } color={'rgb(255, 128, 54)'}  />    }
            {
              cartInfos && cartInfos.cartId &&
              <Fragment>
                  <Col sm={6}>
                    <p>Summe</p><p className="text--accent">{ cartInfos.price }€</p>
                  </Col>
                  <Col sm={6}> 
                    <p>Lieferkosten: { cartInfos.shippingCost }€</p>
                    <p>Gesamtsumme: { cartInfos.totalPrice }€ </p>
                    <p>Mehrwertsteuer: { cartInfos.taxes }% </p>
                  </Col>
              </Fragment>
            }
          </RowBox> 
          <ActionRow onClick={ () => setCurrentView( 'CHECKOUT' ) }> Jetzt Kaufen </ActionRow>
        </Fragment>
      }
      {
        currentView && currentView == 'CHECKOUT' && 
        <Fragment>
          <RowBoxNavigation>
            <Navigation step={step} items={ navItems } />
          </RowBoxNavigation>
          <RowBox navigation={'true'}  action={'true'}>
            <Col> 
              { step && step == 'CONTACT' && <ContactFrame fieldsData={contactData} clicked={ ( params ) => stepCallBack.contact( params ) } /> }
              { step && step == 'PAYMENT' && <PaymentFrame goback={ ()=>{ setStep('CONTACT') } }  clicked={ ( params ) => stepCallBack.payment( params ) } /> }
              { step && step == 'ORDER' && <OrderFrame stepsData={ orderData } goback={ ()=>{ setStep('PAYMENT') } }  clicked={ ( params ) => stepCallBack.order( params ) }/> }
            </Col>
          </RowBox> 
          <ActionRow onClick={() => setCurrentView( 'CART' )}> Zurück zum Shopping Cart </ActionRow>
        </Fragment>
      }
      {
        currentView && currentView == 'DONE' && 
        <Fragment>
          <RowBox action={'true'}>
            <Col className="app-content__toaster"> 
              <FontAwesomeIcon icon={faCheckCircle} />
              <p>Vielen Dank für Ihre Bestellung.</p>
            </Col>
          </RowBox> 
          <ActionRow onClick={() => setCurrentView( 'CART' )}> Zurück zum Shop </ActionRow>
        </Fragment>
      }
    </Container>
   </StyledContainer>
  )
}

export default AppContent