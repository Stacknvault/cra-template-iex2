import React, {useContext} from 'react';
import {ContextStore} from '@stacknvault/iex2-core'

const Custom = ({className}) =>{
  const {iex, config, ready, error} = useContext(ContextStore);
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


export default Custom;
