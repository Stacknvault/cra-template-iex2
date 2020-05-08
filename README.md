# IEX2 applications

IEX2 allows developers use the technology they want to generate expose templates to send real estate items to a given contact.

Developers can leverage the IEX2 components and the *expose* script to develop and publish expose templates.

## Structure of the expose

An expose has *stages*. It represents the lifecycle that the customer goes through when buying real estate. Some sensitive information may be hidden until certain stage and some *sections* will be also availabe after certain stage.

A *section* is a block that is presented to the user. Examples:
- Provisioning Contract Agreement
- A Hero Banner
- An image carousel
- ...

The engine expects two files to exist on the public directory:
- assets/context/config.json
- assets/context/context.json
### config.json
This file includes the configuration of the sections and sensitive fields that need to be hidden for certain stages:
An example:
```
{
    "excludes": [
        {"fieldName": "entity.addresses", "minStage": 2}
    ],
    "stages": {
        "0": ["ProvisionContractAgreement"],
        "1": ["Custom", "GracefulHeroBanner", "SimpleDataTable", "ImageWall"]
    }
}
```

- The *entity.addresses* field isn't available on de model until stage 2
- The *ProvisionContractAgreement* is the only *section* available on the stage 0, then the rest are available on the stage 1

When sections are used, like on the example below,  the framework controls when to show them:
```
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
```

If a custom section is built, it should be wrapped into a *Section* object like this:

```
import React from 'react';
import { Section } from '@stacknvault/iex2-core';


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

```

# The _expose_ script

Apart from the regular yarn scripts, in the project directory, you can run:

## `yarn run expose -- help`

__USAGE__:
`yarn run expose -- <publish|render|set-stage|get-context>  --<option name>=<option value>`

For help, run:

`yarn run expose -- help`

or

`yarn run expose -- <command> help`

## `yarn run expose -- publish help`

Publishes a template. Before publishing, make sure that the react app is built first (`yarn run build`).

__USAGE__:
`yarn run expose -- publish  [ --template-id=<your own template id> ]`

A custom template-id can be used.

## `yarn run expose -- render help`

Renders a template for a given contact-id, entity-id and optional company-id. Before rendering, make sure that the template is published first.

__USAGE__:
`yarn run expose -- render [--render-id=<your own render id> ] --template-id=<template id> --contact-id=<contact id> --entity-id=<entity id> [ --company-id=<company id> ]`

If company id is not specified, it will be taken from the sender

A custom render-id can be used.

## `yarn run expose -- set-stage help`

Sets the stage of a rendered template

__USAGE__:
`yarn run expose -- set-stage --render-id=<render id> --stage=<stage number starting from 0>`

## `yarn run expose -- get-context help`

Gets the context for a given contact-id, entity-id and optional company-id and it writes it to public/assets/context/context.json.

__USAGE__:
`yarn run expose -- get-context --contact-id=<contact id> --entity-id=<entity id> --stage=<stage number starting from 0> [ --company-id=<company id> ]`

If company id is not specified, it will be taken from the sender