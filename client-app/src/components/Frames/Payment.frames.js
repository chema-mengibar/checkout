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
const FrameBox = styled.div`
  width:auto;
  overflow:hidden;
  background-color: rgb(${theme.color.base1});
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

const formControlStyle ={
  backgroundColor: 'transparent',
  color:'white'
};

const PaymentFrame = (props) => {
   
  const [cardnummer, setCardnummer] = useState( "" );
  const [loading, setLoading] = useState( false );
  const [buttonDisabled, setButtonDisabled] = useState(  true );

  const handler = {
    cardnummer: (e ) => {
      setCardnummer(e.currentTarget.value);
      isValidForm();
    }
  };
  
  const isValidForm = ( ) => {
    setButtonDisabled( false );
  }

  const submitForm = ( id ) => {
    setLoading(true)
    Server.checkPayment( id )
            .then( ( response ) =>{ 
              console.log(response) 
              setLoading(false);
              props.clicked();
             } )
  };

  return(
   <Frame>
    <FrameBox>
      <div className="frame-title">Payment</div>
      
      <div className="frame-group-title">Zahlungsart</div>
      <Form>
        <Form.Group controlId="Kartennummer">
          <StyledLabel>Kartennummer</StyledLabel>
          <Form.Control style={formControlStyle} type="text" value={cardnummer} onChange={handler.cardnummer}/>
        </Form.Group>

        <Form.Group controlId="ValidDatum">
          <StyledLabel>Ablaufdatum</StyledLabel>
          <Form.Control style={formControlStyle} type="text" />
        </Form.Group>
        
        <Form.Group controlId="cardName">
          <StyledLabel>Name des Karteneinhabers</StyledLabel>
          <Form.Control style={formControlStyle} type="text" />
        </Form.Group>

        <Form.Group controlId="code" className="form-group--50">
          <StyledLabel>Sichersheitcode</StyledLabel>
          <Form.Control style={formControlStyle} type="text" />
        </Form.Group>
      </Form>

      <div className="frame-group-title">Rechnung</div>
      <Form>
        <Form.Group controlId="name">
          <StyledLabel>Name</StyledLabel>
          <Form.Control style={formControlStyle} type="text"/>
        </Form.Group>

        <Form.Group controlId="strasse">
            <StyledLabel>Straße und Hausnummer</StyledLabel>
            <Form.Control style={formControlStyle} type="text" />
          </Form.Group>

          <Form.Group controlId="ort" className="form-group--50">
            <StyledLabel>Ort</StyledLabel>
            <Form.Control style={formControlStyle} type="text" />
          </Form.Group>

          <Form.Group controlId="plz" className="form-group--50">
            <StyledLabel>PLZ</StyledLabel>
            <Form.Control style={formControlStyle} type="text" />
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
      { loading == false && 'Weiter' }
    </StyledButton>
   </Frame>
  )
}
export default PaymentFrame