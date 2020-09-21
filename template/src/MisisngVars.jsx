import React, { useContext } from 'react';
import { ContextStore, getExternalConfig } from './lib/Context'
import Box from '@material-ui/core/Box';
import Draggable from 'react-draggable';

function MissingVars() {
  const iexContext = useContext(ContextStore);
  const externalConfig = getExternalConfig();
  if (externalConfig && externalConfig.showMissingVars){
    return (
      <Draggable>
      <Box borderRadius={16} style={{ cursor: 'move', padding: '15px', height: '50%', position: 'absolute', left: 20, top: 100, backgroundColor: 'black', color: 'white', opacity: 0.6}}>
        <div style={{ margin: '0.1em', height: '10%', fontWeight: 'bold'}}>Fehlende Variablen</div><hr/>
        <div style={{overflow: 'scroll', height: '90%'}}>
          {window.missingVars.map(item=><>
            <div style={{ margin: '0.1em'}}>{item}</div><br/>
          </>)}
        </div>
        {window.missingVars.length===0 && (<>
          <div style={{ margin: '0.1em'}}>Kein Fehlende Variable</div><br/>
        </>)}
      </Box> 
      </Draggable>
    );
  }else{
    return (<></>);
  }
    
}

export default MissingVars;
