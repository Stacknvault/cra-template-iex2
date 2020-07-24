import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Expose from './Expose';
import { Context } from './lib/Context'

ReactDOM.render(
  <React.StrictMode>
    <Context><Expose /></Context>
  </React.StrictMode>,
  document.getElementById('root')
);