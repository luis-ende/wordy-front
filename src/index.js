import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css';
import configureExpressionsStore from './hooks-store/expressions-store';
import configureLUStore from './hooks-store/lu-store';
import App from './App';
//import reportWebVitals from './reportWebVitals';

(async () => {await configureLUStore()})();
configureExpressionsStore();

/* ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
); */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>    
      <App />    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
