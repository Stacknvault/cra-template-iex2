import React, { useState, useEffect } from 'react';
import './App.css';
import Custom from './sections/Custom';
import {GracefulHeroBanner, ProvisionContractAgreement, SimpleDataTable, ImageWall} from '@stacknvault/iex2-core'


function App() {
  return (
    <div className="App">
          <ProvisionContractAgreement className="section"/>
          <Custom className="section"/>
          <GracefulHeroBanner className="dotted"/>
          <SimpleDataTable className="dotted"/>
          <ImageWall className="section"/>
    </div>
  );
}

export default App;
