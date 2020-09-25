import React, { useContext, useEffect, useState } from 'react';
import { ContextStore, ffmap, getExternalConfig, getFFUrl } from './lib/Context'
import Box from '@material-ui/core/Box';
import Draggable from 'react-draggable';

const stage = process.env.REACT_APP_STAGE || 'production';
const devProd = stage === 'production' || stage === 'staging' ? 'prod' : 'dev';

const companyLabels = {
  "companyCity": "Ort",
  "companyName": "Firmenname",
  "companyStreet": "Straße",
  "companyPostcode": "Postleitzahl",
  "companyMailInfo": "E-Mail-Adresse",
  "companyFax": "Fax",
  "companyPhoneInfo": "Telefonnummer",
  "companyUrl": "Firmenwebsite",
  "logo.url": "Logo URL"
}

function MissingVars() {
  const iexContext = useContext(ContextStore);
  const externalConfig = getExternalConfig();
  const [schemas, setSchemas] = useState(null);
  const [types, setTypes] = useState(null);
  const [ready, setReady] = useState(false)

  const fetchSchemasAndTypes = ()=>{
    fetch(`${getFFUrl()}/schema-service/v2/schemas?size=1000000`, { headers: {cognitotoken: iexContext.cognitotoken} })
    .then(res=>res.json())
    .then(s => {
        fetch(`${getFFUrl()}/schema-service/datatypes/alltypes`, { headers: {cognitotoken: iexContext.cognitotoken} })
            .then(res=>res.json())
            .then(t => {
                setSchemas(s);
                setTypes(t);
                setReady(true);
                // console.log('schemas and types', s, t);
            }, console.log)
    }, console.log);
  }

  useEffect(()=>{
    if (externalConfig && externalConfig.showMissingVars) {
      fetchSchemasAndTypes();
    }
  }, [])


  if (ready && externalConfig && externalConfig.showMissingVars){
    return (
      <Draggable>
      <Box borderRadius={16} style={{ cursor: 'move', padding: '15px', height: '50%', position: 'absolute', left: 20, top: 100, backgroundColor: 'black', color: 'white', opacity: 1}}>
        <div style={{ margin: '0.1em', height: '10%', fontWeight: 'bold'}}>Fehlende Variablen</div><hr/>
        <div style={{overflowY: 'scroll', borderRadius: 5, padding: 5, scrollbars: '', overflowX: 'scroll', backgroundColor: 'lightsalmon', height: '85%'}}>
          {window.missingVars.map(item=>{
            // const m = document.location.href.match('\/render\/([^\/]*)');
            
            // console.log('item', item);
            var label = item;
            var actuallyMissing = true;
            if (schemas && schemas.entries){
              const m = item.match('([^\.]*)\.(.*)$');
              var schemaName = m && m.length>0?m[1]:'';
              var schemaCaption = '';
              if (schemaName){
                if (schemaName === 'entity' || schemaName === 'contact' || schemaName === 'sender'){
                  if (schemaName === 'sender'){
                    schemaCaption='Makler' // agent
                  }
                  schemaName=iexContext.iex.context[schemaName]._metadata.schema
                  // console.log(`schema name is ${schemaName}`)
                }else if (schemaName === 'company'){
                  if (m.length>1){
                    const propName = m[2];
                    const l=companyLabels[propName];
                    if (l){
                      label=`Firma: ${companyLabels[propName]}`
                    }
                  }
                }
              }
              const sc = schemas.entries.filter(s=>s.name===schemaName);
              if (sc.length>0 && m.length>1){
                const propName = m[2];
                // console.log('schemaName', sc[0], item, schemaName, propName)
                const propValue = sc[0]['properties'][propName];
                if (!propValue){
                  actuallyMissing = false;
                  // console.log(`${item} is actually not missing`)
                }else{
                  try{label=`${schemaCaption||sc[0].captions.de}: ${propValue.captions.de}`;}catch(e){}
                }
              }
            }
            return actuallyMissing ? (<>
              <div style={{ margin: 0}}>{label}</div><br/>
            </>):(<></>);
            })}
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
