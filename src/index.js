import React from 'react';
import { FormControlStatic } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './fonts/UnBPro_Black.otf';
import './fonts/UnBPro_BoldItalic.otf';
import './fonts/UnBPro_Bold.otf';
import './fonts/UnBPro_Italic.otf';
import './fonts/UnBPro_Light.otf';
import './fonts/UnBPro_Regular.otf';
import './fonts/UnB-Office_Bold.ttf';
import './fonts/UnB-Office_Italic.ttf';
import './fonts/UnB-Office_Regular.ttf';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
