import React, { useState } from 'react';
import styled from 'styled-components';
import theme from 'shared/theme.shared'
import Server from 'shared/Server';
import { BasicStyledButton, BasicStyledLabel } from './style.frames'
import { Form } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';

const Frame = styled.div`
  width:auto;
  overflow:hidden;
`

const OrderInfo = styled.div`
  color:rgb(${theme.color.baseMedium});;
  margin-bottom: 25px;

  span{
    display: block;
    margin-bottom: 5px;
  }
`

const StyledButton = styled(BasicStyledButton)`

`;

const StyledLabel = styled(BasicStyledLabel)`

`;

const OrderFrame = (props) => {
  
  let odC = (props.stepsData && props.stepsData.contact) ? props.stepsData.contact : {};
  let odP = (props.stepsData && props.stepsData.payment) ? props.stepsData.payment : {};

  const [loading, setLoading] = useState( false );
  const [buttonDisabled, setButtonDisabled] = useState(  true );

  const [agbChecked, setAgbChecked] = useState( 0 );
  const [newsChecked, setNewsChecked] = useState( 0 );

  const submitForm = () => {

    setLoading(true)

    let orderData = {
      orderId:'ORD_ID-123456789'
    };

    Object.keys(odC).forEach(function (item, key) {
      orderData['c_' + key] = item;
    });

    Object.keys(odP).forEach(function (item, key) {
      orderData['payment_' + key] = item;
    });

    Server.sendOrder( orderData )
      .then( ( response ) =>{ 
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
      setButtonDisabled( !e.currentTarget.checked );
    },
    news: (e: ChangeEvent<HTMLInputElement> ) => {
      setNewsChecked(e.currentTarget.checked);
    }
  };

  return(
    <Frame>
      <div className="frame-group-title">Kontaktsdaten</div>
      <OrderInfo>
        { odC && <span>{odC.prename + ' ' + odC.name }</span>}
        { odC && <span>{odC.email }</span>}
        { odC && <span>{odC.address + ', ' + odC.plz + ' - ' + odC.place  }</span>}
      </OrderInfo>

      <div className="frame-group-title">Rechnungsdaten</div>
      <OrderInfo>
        { odP && <span>{odP.name }</span>}
        { odP && <span>{odP.address }</span>}
        { odP && <span>{odP.place + ', ' + odP.postalcode }</span>}
      </OrderInfo>

      <Form>
        <Form.Group controlId="newsletter">
            <Form.Check size="lg" type="checkbox" label="Newsletter" checked={newsChecked} onChange={handler.news} />
            <StyledLabel>
              Newsletter invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </StyledLabel>
        </Form.Group>

        <Form.Group controlId="agb">
            <Form.Check size="lg" type="checkbox" label="AGB*" checked={agbChecked} onChange={handler.agb} />
            <StyledLabel> 
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </StyledLabel>
        </Form.Group>
      </Form>

      <StyledButton 
        disabled={buttonDisabled}
        onClick={ ()=> { submitForm( 12345 ); } }
      >
        <ClipLoader sizeUnit={"px"} size={25} loading={ loading }  color={'#FFFFFF'} />
        { loading == false && 'Bestellen' }
      </StyledButton>
      <StyledButton type={'secondary'} onClick={ ()=> { props.goback()  }  } > Züruck </StyledButton>

    </Frame>
  )
}
export default OrderFrame