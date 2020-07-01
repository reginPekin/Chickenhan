import React from 'react';
import ReactDOM from 'react-dom';

import './style/index.css';
import '@chickenhan/components/src/__styles__/global.css';

import { App } from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
