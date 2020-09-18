import React, { useState, useEffect, useContext } from 'react';
import jp from 'jsonpath';

const stage = process.env.REACT_APP_STAGE || 'production';
const devProd = stage === 'production' || stage === 'staging' ? 'prod' : 'dev';

export const getExternalConfig = () => {
    if (window.document.location.hash){
        try{
            return JSON.parse(decodeURI(window.document.location.hash.substring(1)))
        }catch(e){
            console.log('getExternalConfig error', getExternalConfig);
            return undefined;
        }
        
    }
    return undefined;
}
const ContextStore = React.createContext({});
const Context = ({ children }) => {
    const [iex, setIEX] = useState({});
    const [ready, setReady] = useState(false);
    const [error, setError] = useState(null);
    const [config, setConfig] = useState(false);
    const [contractAcceptances, setContractAcceptances] = useState({});

    function upgradeStage(toStage) {
        console.log('contractAcceptances', contractAcceptances);
        const m = document.location.href.match('\/render\/([^\/]*)');
        const local = !m || m.length < 2;
        if (1===2 && local){
            const newIex = {...iex}
            newIex.currentStage++
            setIEX(newIex);
        }else{
            const exposeId = m[1]; // maybe better it came from the context
            const dateStr = new Intl.DateTimeFormat("de-DE", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
              }).format(new Date());

              var message = `<p>${dateStr} Uhr: Der Besucher hat das interaktive Exposé besucht</p>

              <p>14.Sep. 09:57 Uhr: Es wurden mehr Informationen angefordert</p>`

              Object.keys(contractAcceptances).length && iex.context.company.legislationTexts.map(item=>{
                item.legislationCheckboxes.filter(i=>contractAcceptances[`${item.id}-${i.value}`]).map(res=>{
                    message+=`<p>✓${res.label}<\p>
                    `
                })
              })
              message+=`<p>${dateStr} Uhr: Der Besucher hat das interaktive Exposé verlassen<\p>\n`
              console.log('message', message);
              
            fetch(`https://iex2-expose-lambda.${stage}.sf.flowfact-${devProd}.cloud/public/expose/${exposeId}/track?async`, 
            { 
                headers: {'content-type': 'application/json'}, 
                body: JSON.stringify({subject: 'Neuer Besucher im Interaktiven Exposé', message: message, stage: toStage}),
                method: 'post'
            })
            .then(jsonify)
            .then(result => {
                // we do the local upgrade also to speed up the process while we fetch the new context
                const newIex = {...iex}
                newIex.currentStage++
                setIEX(newIex);
                fetchContext(true, newIex.currentStage);
                // for some reason this is not always working
                // setTimeout(()=>window.document.location.reload(), 1000)
            }, reportError);
        }
    }

    const setContractAccepted = (id, value, isAccepted) =>{
        const ca = {...contractAcceptances};
        ca[`${id}-${value}`] = isAccepted;
        setContractAcceptances(ca);
    }

    const jsonify = res => res.json();
    const reportError = error => { setError("" + error) };
    const fetchContext = (expectStageChange, targetStage) => {
        var contextURL = 'assets/context/context.json';
        var cognitotoken = '';
        const externalConfig = getExternalConfig();
        if (externalConfig && externalConfig.contextURL && externalConfig.cognitotoken){
            contextURL=externalConfig.contextURL
            cognitotoken = externalConfig.cognitotoken;
        }
        fetch(contextURL, { headers: {cognitotoken} })
            .then(jsonify)
            .then(result => {
                if (expectStageChange && targetStage !== result.currentStage){
                    // let's try it again
                    console.log('Retrying context fetch until we see a stage change')
                    setTimeout(()=>fetchContext(true, targetStage), 1000);
                    return;   
                }
                setIEX(result);
                setError(null);
                fetch('assets/context/config.json', { headers: {} })
                    .then(jsonify)
                    .then(result => {
                        setConfig(result)
                        setReady(true);
                    }, reportError)
            }, reportError);
    }

    useEffect(fetchContext, []);
    const { currentStage } = iex;
    if (!ready) {
        return <></>
    }
    return <ContextStore.Provider value={{ iex, config, ready, error, upgradeStage, currentStage, setContractAccepted }}>{children}</ContextStore.Provider>
}

const Stage = ({ level, children }) => {
    const { iex, ready } = useContext(ContextStore);
    const { currentStage } = iex;
    if (!ready) return <></>
    if ("" + currentStage !== level) return <></>
    return <>{children}</>;
}

window.missingVars = []
const addMissingVar = (ms) => {
    if ( ! window.missingVars.find((item)=>item===ms)){
        window.missingVars = [ ...window.missingVars, ms ];
        window.missingVars.sort();
    } 
}
const ffmap = (strings, ...values) => {
    const iex = ContextStore._currentValue.iex;
    // console.log("Path : ",strings[0], iex)
    function q(jpath) {
        return jp.query(iex.context, jpath);
    }
    try {
        // try first with weird FF blah.values array
        let answer = q(`$.${strings[0]}.values`);
        // console.log("Answer with .values: ",answer)
        answer = answer[0];

        // undue the weird everything is a value array in FF
        if (Array.isArray(answer) && answer.length === 1) {
            // console.log("Unwrapping Array : ",answer[0]);
            answer = answer[0];
        }
        // console.log("Answer and typeof : ",answer, typeof answer);
        if (answer && typeof answer !== 'function') {
            return answer;
        } else {
            // console.log("What is it's a normal object????!?!!?");
            // okay entities have weird value arrays but sender obj doesn't!!!!
            answer = q(`$.${strings[0]}`)[0];
            // console.log("Answer without .value: ",answer);
            if (answer) {
                //FF-35
                if (answer.values && answer.values.length>0 && answer.values[0]===''){
                    addMissingVar(strings);
                    return undefined;
                }
                //END FF-35
                return answer;
            }
            // okay loop through all the default values
            for (let i = 0; i < values.length; i++) {
                if (values[0]) return values[0];
            }
            // i give up....
            addMissingVar(strings);
            return undefined;
        }
    } catch (e) {
        console.log(`Error trying to deference ${strings}`, e);
        addMissingVar(strings);
        return 'ERROR';
    }
}




export { Context, ContextStore, Stage, ffmap };
