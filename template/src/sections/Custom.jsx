import React from 'react';
import { Section } from '@stacknvault/iex2-core/dist/index.jsx';


function CustomSection({className, name, iex, ready, error, config}) {
  return (
    <div className={className}>
        {ready && 
          <div>
            Hello {iex.context.contact.firstName}! This is a custom section. You are at stage {iex.currentStage}
          </div>
        }
        {error && 
          <div>
            Something went wrong: {error}
          </div>
          
        }
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
