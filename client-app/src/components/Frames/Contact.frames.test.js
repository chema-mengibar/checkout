import React from "react";
import renderer, { create, act } from "react-test-renderer";
import ContactFrame from "./Contact.frames";

describe("Send Button", () => {
  test("should not be disable if the inputs are valid", () => {

    const mockFieldsData = {
      name: 'Mustermann',
      prename: 'Max',
      email: 'max.mustermann@mail.ipsum',
      address: 'Lorempis.str 45',
      place: 'Musterplace',
      plz: '12345',
    }
    const onSubmitFnMock = jest.fn();

    const component = renderer.create( <ContactFrame fieldsData={mockFieldsData} clicked={ onSubmitFnMock } />  );
    const _root = component.root;
    const button = _root.find( element => element.type === 'button' && element.props.id == 'contact-button' );
    
    expect(button.props.disabled).toEqual(false);
  });


  test("should be disable if the email address changed and is not valid", () => {

    const mockFieldsData = {
      name: 'Mustermann',
      prename: 'Max',
      email: 'max.mustermann@mail.ipsum',
      address: 'Lorempis.str 45',
      place: 'Musterplace',
      plz: '12345',
    }
    const onSubmitFnMock = jest.fn();

    const component = renderer.create( <ContactFrame fieldsData={mockFieldsData} clicked={ onSubmitFnMock } />  );
    const _root = component.root;
    const button = _root.find( element => element.type === 'button' && element.props.id == 'contact-button' );
    const inputEmail = _root.find( element => element.type === 'input' && element.props.id == 'email');
    
    const event = {
      currentTarget: { value: 'max.wrong-email.com' }
    };
    act(() => {
      inputEmail.props.onChange( event );
    });
    
    expect(button.props.disabled).toEqual(true);
  });


  test("should not be disable if the email address changed and is valid", () => {

    const mockFieldsData = {
      name: 'Mustermann',
      prename: 'Max',
      email: 'max.mustermann@mail.ipsum',
      address: 'Lorempis.str 45',
      place: 'Musterplace',
      plz: '12345',
    }
    const onSubmitFnMock = jest.fn();

    const component = renderer.create( <ContactFrame fieldsData={mockFieldsData} clicked={ onSubmitFnMock } />  );
    const _root = component.root;
    const button = _root.find( element => element.type === 'button' && element.props.id == 'contact-button' );
    const inputEmail = _root.find( element => element.type === 'input' && element.props.id == 'email');
    
    const event = {
      currentTarget: { value: 'max.mustermann@mail.de' }
    };
    act(() => {
      inputEmail.props.onChange( event );
    });

    expect(button.props.disabled).toEqual(false);
  });

});


describe("Component State", () => {
  
  test(" should have the input 'Name' value", () => {
    const onSubmitFnMock = jest.fn();
    const component = renderer.create( <ContactFrame fieldsData={null} clicked={ onSubmitFnMock } />  );
    const _root = component.root;
    
    const button = _root.find( element => element.type === 'button');
    const inputName = _root.find( element => element.type === 'input' && element.props.id == 'name');
    
    const mockGivedName = 'Musterman';

    const event = {
      currentTarget: { value: mockGivedName }
    };
        
    act(() => {
      inputName.props.onChange( event );
    });
    act(() => {
      button.props.onClick( );
    });
    
    const expectedObj = {
      name: mockGivedName,
      prename: '',
      email: '',
      address: '',
      place: '',
      plz: ''
    }

    expect(onSubmitFnMock).toBeCalledWith( expectedObj );
  });

});