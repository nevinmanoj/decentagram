import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import {TestProvider} from './context/testContext'
ReactDOM.render(
  <React.StrictMode>
    <TestProvider>
    <BrowserRouter>
      <App />
      {/* <Apptest /> */}
      {/* <DropDown /> */}
    </BrowserRouter>
    </TestProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
