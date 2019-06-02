import React from "react";
import renderer, { create, act } from "react-test-renderer";
import Navigation from "./Navigation.AppContent";

const navItems = [
  {  step:'CONTACT', label:'Kontakdaten', status:'none' },
  {  step:'PAYMENT', label:'Bezahlinformationen', status:'none' },
  {  step:'ORDER', label:'Bestellabschluss', status:'none' },
];

// const steps = [ 'CONTACT', 'PAYMENT', 'ORDER' ];

describe("Navigation Snapshots", () => {
  
  test("step CONTACT", () => {
    let step = 'CONTACT'; // CONTACT, PAYMENT, ORDER
    const component = renderer.create(
      <Navigation step={step} items={ navItems } />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("step PAYMENT", () => {
    let step = 'PAYMENT';
    const component = renderer.create(
      <Navigation step={step} items={ navItems } />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


  test("step ORDER", () => {
    let step = 'ORDER'; 
    const component = renderer.create(
      <Navigation step={step} items={ navItems } />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

