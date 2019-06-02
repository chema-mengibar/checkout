import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../shared/theme.shared'
import { BasicStyledButton, BasicStyledLabel } from './style.frames'
import { Form } from 'react-bootstrap';

const Frame = styled.div`
  width:auto;
  overflow:hidden;
`

const StyledButton = styled(BasicStyledButton)`

`;

const StyledLabel = styled(BasicStyledLabel)`

`;

const formControlStyle ={
  backgroundColor: 'transparent',
  color:'rgb(111, 140, 154)'
};

const ContactFrame = (props) => {

  const [name, setName] = useState( (props.fieldsData && props.fieldsData.name) ? props.fieldsData.name : "" );
  const [prename, setPrename] = useState( (props.fieldsData && props.fieldsData.prename) ? props.fieldsData.prename : "" );
  const [email, setEmail] = useState( (props.fieldsData && props.fieldsData.email) ? props.fieldsData.email : "");
  const [address, setAddress] = useState( (props.fieldsData && props.fieldsData.address) ? props.fieldsData.address : "");
  const [place, setPlace] = useState( (props.fieldsData && props.fieldsData.place) ? props.fieldsData.place : "");
  const [plz, setPlz] = useState( (props.fieldsData && props.fieldsData.plz) ? props.fieldsData.plz : "");

  const [buttonDisabled, setButtonDisabled] = useState(  (props.fieldsData ) ? false : true );

  const isEmpty = (strValue) => {
    return (strValue === "");
  }

  const isValidForm = ( ) => {
    var emailInvalid = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( email );
     
    if( isEmpty(name) || isEmpty(prename) || isEmpty(email) || isEmpty(address) ||
        isEmpty(place) || isEmpty(plz))
    {
      setButtonDisabled( true );
    }
    else if( emailInvalid ){
      setButtonDisabled( true );
    }
    else{
      setButtonDisabled( false );
    }
  }

  useEffect(() => {
    isValidForm();
  }, [name,prename, email, address, place, plz ]);


  const handler = {
    name: (e) => {
      setName(e.currentTarget.value);
    },
    prename: (e) => {
      setPrename(e.currentTarget.value);
    },    
    email: (e) => {
      setEmail(e.currentTarget.value);
    },
    address: (e) => {
      setAddress(e.currentTarget.value);
    },
    place: (e) => {
      setPlace(e.currentTarget.value);
    },
    plz: (e) => {
      setPlz(e.currentTarget.value);
    },
  };

  const submitForm = ( ) => {
    let formData = {
      name: name,
      prename: prename,
      email: email,
      address: address,
      place: place,
      plz: plz
    }
    props.clicked( formData );
  }

  return(
   <Frame>
    <Form>
      <Form.Group controlId="name">
        <StyledLabel>Name<i>*</i></StyledLabel>
        <Form.Control style={formControlStyle} type="text" value={name} onChange={handler.name} />
      </Form.Group>

      <Form.Group controlId="vorname">
        <StyledLabel>Vorname<i>*</i></StyledLabel>
        <Form.Control style={formControlStyle} type="text" value={prename} onChange={handler.prename} />
      </Form.Group>
      
      <Form.Group controlId="email">
        <StyledLabel>Email<i>*</i></StyledLabel>
        <Form.Control style={formControlStyle} type="email" value={email} onChange={handler.email}/>
      </Form.Group>

      <Form.Group controlId="strasse">
        <StyledLabel>Straße und Hausnummer<i>*</i></StyledLabel>
        <Form.Control style={formControlStyle} type="text" value={address} onChange={handler.address}/>
      </Form.Group>

      <Form.Group controlId="ort" className="form-group--50">
        <StyledLabel>Ort<i>*</i></StyledLabel>
        <Form.Control style={formControlStyle} type="text" value={place} onChange={handler.place}/>
      </Form.Group>

      <Form.Group controlId="plz" className="form-group--50">
        <StyledLabel>PLZ<i>*</i></StyledLabel>
        <Form.Control style={formControlStyle} type="text"  value={plz} onChange={handler.plz}/>
      </Form.Group>
    </Form>
    <StyledButton id="contact-button" disabled={buttonDisabled} onClick={ ()=>{ submitForm() } }>Weiter</StyledButton>
   </Frame>
  )
}
export default ContactFrame