import React, { useContext } from 'react';
import { ContextStore, getExternalConfig } from './lib/Context'
import Box from '@material-ui/core/Box';

function MissingVars() {
  const iexContext = useContext(ContextStore);
  const externalConfig = getExternalConfig();
  if (externalConfig && externalConfig.showMissingVars){
    return (

      <Box borderRadius={16} style={{ padding: '15px', position: 'absolute', left: 100, top: 100, backgroundColor: 'black', color: 'white', opacity: 0.6}}>
        <div style={{ margin: '0.1em', fontWeight: 'bold'}}>Missing variables</div><hr/>
        {window.missingVars.map(item=><>
          <div style={{ margin: '0.1em'}}>{item}</div><br/>
        </>)}
        {window.missingVars.length===0 && (<>
          <div style={{ margin: '0.1em'}}>No missing variables</div><br/>
        </>)}
      </Box>   
    );
  }else{
    return (<></>);
  }
    
}

export default MissingVars;
