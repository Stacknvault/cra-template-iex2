import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Expose from './Expose';
import { Context, ContextStore } from './lib/Context'
import MissingVars from './MissingVars';

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <Expose />
      <MissingVars/>  
    </Context>
  </React.StrictMode>,
  document.getElementById('root')
);