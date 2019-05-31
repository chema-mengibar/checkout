import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import theme from 'shared/theme.shared'
import Server from 'shared/Server';
import { Button, Form } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';


const Frame = styled.div`
  width:auto;
  overflow:hidden;
`

const OrderInfo = styled.div`
  color:white;
  margin-bottom: 25px;

  span{
    display: block;
    margin-bottom: 5px;
  }
`
const FrameBox = styled.div`
  width:auto;
  overflow:hidden;
  background-color: rgb(${theme.color.base2});
  border-radius : ${theme.shape.border};
  -moz-border-radius : ${theme.shape.border};
  -webkit-border-radius : ${theme.shape.border};
  padding:25px;
  margin-bottom:10px;
`

const StyledButton = styled(Button)`
  background-color: rgb(${theme.color.accent}) !important;
  color: rgb(${theme.color.white});
	font-size: 14px;
  border:none !important;
	border-radius: ${theme.shape.border};
  width: 145px;
  height: 40px;
  float: right;
`;

const StyledLabel = styled(Form.Label)`
  color: rgb(${theme.color.white});
  font-size:11px;
  letter-spacing: 0.05em;
  font-weight:400;
`;

const OrderFrame = (props) => {
  
  let od = props.orderData.contact;

  const [loading, setLoading] = useState( false );
  const [buttonDisabled, setButtonDisabled] = useState(  true );

  const [agbChecked, setAgbChecked] = useState( 0 );
  const [newsChecked, setNewsChecked] = useState( 0 );

  const submitForm = ( ) => {
    setLoading(true)

    let orderData = props.orderData.contact;
    orderData.orderId = 'ORD_ID-123456789';

    Server.sendOrder( orderData )
            .then( ( response ) =>{ 
              console.log(response) 
              setLoading(false);
              props.clicked( response );
             } )
  };

  const isValidForm = ( ) => {
    setButtonDisabled( false );
  }

  const handler = {
    agb: (e: ChangeEvent<HTMLInputElement> ) => {
      setAgbChecked(e.currentTarget.checked);
      console.log( e.currentTarget.checked )
      setButtonDisabled( !e.currentTarget.checked );
    },
    news: (e: ChangeEvent<HTMLInputElement> ) => {
      setNewsChecked(e.currentTarget.checked);
    }
  };

  return(
   <Frame>
    <FrameBox>
      <div className="frame-title">Bestellung</div>
      <span className="frame-group-title">Ihre Daten</span>
      <OrderInfo>
        { od && <span>{od.prename + ' ' + od.name }</span>}
        { od && <span>{od.email }</span>}
        { od && <span>{od.address + ', ' + od.plz + ' - ' + od.place  }</span>}
      </OrderInfo>
       <Form>
        <Form.Group controlId="newsletter">
            <Form.Check size="lg" type="checkbox" label="Newsletter" 
              checked={newsChecked} onChange={handler.news} 
             />
            <StyledLabel>
              Newsletter invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </StyledLabel>
        </Form.Group>

        <Form.Group controlId="agb">
            <Form.Check size="lg" type="checkbox" label="AGB" 
              checked={agbChecked} onChange={handler.agb} 
            />
            <StyledLabel> 
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </StyledLabel>
         </Form.Group>
       </Form>
    </FrameBox>
    <StyledButton 
      disabled={buttonDisabled}
      onClick={ ()=> { submitForm( 12345 );  }  }
    >
      <ClipLoader
        sizeUnit={"px"}
        size={25}
        loading={ loading }
        color={'#FFFFFF'}
      />
      { loading == false && 'Bestellen' }
    </StyledButton>
   </Frame>
  )
}
export default OrderFrame