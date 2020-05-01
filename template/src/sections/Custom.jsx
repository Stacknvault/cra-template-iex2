import React from 'react';
import { Section } from '@stacknvault/iex2-core/dist/index.jsx';


function CustomSection({className, name, iex, ready, error, config}) {
  return (
    <div className={className}>
        {ready && 
          <div>
            Hello stage {iex.context.contact.lastName}! You are at stage {iex.currentStage}
              <div>This is the header</div>
              <div>This is the header2</div>
          </div>
        }
        {error && 
          <div>
            Something went wrong: {error}
          </div>
          
        }
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
    </div>
  );
}

function Custom({className}){
  return (
    <Section name="Custom">
      <CustomSection className={className}/>
    </Section>
  );
}

export default Custom;
