import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import theme from 'shared/theme.shared'
import Server from 'shared/Server';
import { Button, Form } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';

const Frame = styled.div`
  width:auto;
  overflow:hidden;
`

const StyledButton = styled(Button)`
  background-color: rgb(${theme.color.ciDark}) !important;
  color: rgb(${theme.color.white});
	font-size: 14px;
  border:none !important;
	border-radius: ${theme.shape.border};
  width: 145px;
  height: 40px;
  float: right;

  ${ (props) => props.type && props.type === 'secondary' && css`
    background-color: rgb(${theme.color.baseLight}) !important;
    margin-right:15px;
    color: rgb(${theme.color.baseDark}) !important;
  `}

  @media (max-width: 575.98px) {
    width: 100px; 
  }
`;

const StyledLabel = styled(Form.Label)`
  color: rgb(${theme.color.baseMedium});
  font-size:13px;
  letter-spacing: 0.05em;
  font-weight:400;
  i{
    color: rgb(${theme.color.ciDark});
    font-weight: ${theme.fontWeigth.bold};
  }
`;

const formControlStyle ={
  backgroundColor: 'transparent',
  color:'rgb(111, 140, 154)'
};

const PaymentFrame = (props) => {
   
  const [cardnummer, setCardnummer] = useState( "" );
  const [date, setDate] = useState( "" );
  const [cardName, setCardName] = useState( "" );
  const [code, setCode] = useState( "" );
  const [billName, setBillName] = useState( "" );
  const [billAddress, setBillAddress] = useState( "" );
  const [billPlace, setBillPlace] = useState( "" );
  const [billPostalCode, setBillPostalCode] = useState( "" );

  useEffect(() => {
    isValidForm();
  }, [cardnummer,date,cardName,code,billName,billAddress,billPlace,billPostalCode ]);

  const [loading, setLoading] = useState( false );
  const [buttonDisabled, setButtonDisabled] = useState(  true );

  const handler = {
    cardnummer: (e ) => {
      setCardnummer(e.currentTarget.value);
    },
    date: (e) => {
      setDate(e.currentTarget.value);
    },
    cardName: (e) => {
      setCardName(e.currentTarget.value);
    },
    code: (e) => {
      setCode(e.currentTarget.value);
    },
    billName: (e) => {
      setBillName(e.currentTarget.value);
    },
    billAddress: (e) => {
      setBillAddress(e.currentTarget.value);
    },
    billPlace: (e) => {
      setBillPlace(e.currentTarget.value);
    },
    billPostalCode: (e) => {
      setBillPostalCode(e.currentTarget.value);
    }
  };
  
  const isEmpty = (strValue) => {
    return (strValue === "");
  }

  const isValidForm = ( ) => {
    if( isEmpty(cardnummer) || isEmpty(date) || isEmpty(cardName) || isEmpty(code) ||
        isEmpty(billName) || isEmpty(billAddress) || isEmpty(billPlace) || isEmpty(billPostalCode) )
    {
      setButtonDisabled( true );
    }
    else{
      setButtonDisabled( false );
    }
  }

  const submitForm = ( id ) => {

    const formData = {
      name: billName,
      address: billAddress,
      place: billPlace,
      postalcode: billPostalCode
    }
    setLoading(true)
    Server.checkPayment( id )
            .then( ( response ) =>{ 
              console.log(response) 
              setLoading(false);
              props.clicked( formData );
             } )
  };

  return(
   <Frame>
    <div className="frame-group-title">Zahlungsart</div>
    <Form>
      <Form.Group controlId="Kartennummer">
        <StyledLabel>Kartennummer<i>*</i></StyledLabel>
        <Form.Control style={formControlStyle} type="text" value={cardnummer} onChange={handler.cardnummer}/>
      </Form.Group>

      <Form.Group controlId="ValidDatum">
        <StyledLabel>Ablaufdatum<i>*</i></StyledLabel>
        <Form.Control style={formControlStyle} type="text"  value={date} onChange={handler.date}/>
      </Form.Group>
      
      <Form.Group controlId="cardName">
        <StyledLabel>Name des Karteneinhabers<i>*</i></StyledLabel>
        <Form.Control style={formControlStyle} type="text" value={cardName} onChange={handler.cardName} />
      </Form.Group>

      <Form.Group controlId="code" className="form-group--50">
        <StyledLabel>Sichersheitcode<i>*</i></StyledLabel>
        <Form.Control style={formControlStyle} type="text" value={code} onChange={handler.code} />
      </Form.Group>
    </Form>

    <div className="frame-group-title">Rechnung</div>
    <Form>
      <Form.Group controlId="name">
        <StyledLabel>Name<i>*</i></StyledLabel>
        <Form.Control style={formControlStyle} type="text" value={billName} onChange={handler.billName}/>
      </Form.Group>

      <Form.Group controlId="strasse">
          <StyledLabel>Straße und Hausnummer<i>*</i></StyledLabel>
          <Form.Control style={formControlStyle} type="text" value={billAddress} onChange={handler.billAddress} />
        </Form.Group>

        <Form.Group controlId="ort" className="form-group--50">
          <StyledLabel>Ort<i>*</i></StyledLabel>
          <Form.Control style={formControlStyle} type="text" value={billPlace} onChange={handler.billPlace} />
        </Form.Group>

        <Form.Group controlId="plz" className="form-group--50">
          <StyledLabel>PLZ<i>*</i></StyledLabel>
          <Form.Control style={formControlStyle} type="text" value={billPostalCode} onChange={handler.billPostalCode} />
        </Form.Group>
    </Form>

    <StyledButton 
      disabled={buttonDisabled}
      onClick={ ()=> { submitForm( );  }  }
    >
      <ClipLoader
        sizeUnit={"px"}
        size={25}
        loading={ loading }
        color={'#FFFFFF'}
      />
      { loading == false && 'Weiter' }
    </StyledButton>
    <StyledButton type={'secondary'} onClick={ ()=> { props.goback()  }  } > Züruck </StyledButton>

   </Frame>
  )
}
export default PaymentFrame