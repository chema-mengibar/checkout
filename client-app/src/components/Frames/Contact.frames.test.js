import React from "react";
import renderer, { create, act } from "react-test-renderer";
import ContactFrame from "./Contact.frames";

describe("Component Snapshots", () => {
  test("", () => {
    const component = renderer.create(
      <ContactFrame />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Send Button", () => {
  test("should not be disable if the inputs are valid", () => {

    const onSubmitFnMock = jest.fn();
    const component = renderer.create( <ContactFrame fieldsData={null} clicked={ onSubmitFnMock } />  );
    const _root = component.root;
    
    const button = _root.find( element => element.type === 'button');
    const inputName = _root.find( element => element.type === 'input' && element.props.id == 'name');
    
    const event = {
      currentTarget: { value: 'Musterman' }
    };
    act(() => {
      inputName.props.onChange( event );
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