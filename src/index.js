import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import configureExpressionsStore from './hooks-store/expressions-store';
import configureLUStore from './hooks-store/lu-store';
import App from './App';
//import reportWebVitals from './reportWebVitals';

(async () => {await configureLUStore()})();
configureExpressionsStore();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
