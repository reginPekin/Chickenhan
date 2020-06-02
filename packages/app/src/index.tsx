import React from 'react';
import ReactDOM from 'react-dom';

import './style/index.css';

// import { FirstComponent } from '@chickenhan/components/src/FirstComponent';
import { App } from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
