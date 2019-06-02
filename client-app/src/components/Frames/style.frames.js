import styled, { css } from 'styled-components'
import { Button, Form } from 'react-bootstrap';
import theme from '../../shared/theme.shared'

/** 
// Style share example:
const wrapperStyles = css`
 background-color: red;
`
*/

export const BasicStyledButton = styled(Button)`
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

export const BasicStyledLabel = styled(Form.Label)`
  color: rgb(${theme.color.baseMedium});
  font-size:13px;
  letter-spacing: 0.05em;
  font-weight:400;
  i{
    color: rgb(${theme.color.ciDark});
    font-weight: ${theme.fontWeigth.bold};
  }
`;
