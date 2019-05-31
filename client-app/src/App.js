import React, { useState } from 'react';
import AppWrapper from './components/AppWrapper/AppWrapper';
import AppContent from './components/AppContent/AppContent';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return(
    <AppWrapper>
      <AppContent/>
    </AppWrapper>
  );
};

export default App;