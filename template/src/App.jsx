import React from 'react';
import './App.scss';
import Custom from './sections/Custom';
import {Stage, GracefulHeroBanner, ProvisionContractAgreement, SimpleDataTable, ImageWall} from '@stacknvault/iex2-core';

function App() {
  return (
    <div className="App">
        <Stage level="0">
          <ProvisionContractAgreement className="section"/>
        </Stage>
        <Stage level="1">
          <Custom className="section"/>
        </Stage>
        <Stage level="1">
          <GracefulHeroBanner className="dotted"/>
        </Stage>
        <Stage level="1"> 
          <SimpleDataTable className="dotted"/>
        </Stage>
        <Stage level="1">
          <ImageWall className="section"/>
        </Stage>
    </div>
  );
}

export default App;
