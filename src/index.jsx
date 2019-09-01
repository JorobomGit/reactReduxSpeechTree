import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(
  <App />,
  // The target element might be either root or app,
  // depending on your development environment
  // document.getElementById("app")
  document.getElementById('root'),
);
