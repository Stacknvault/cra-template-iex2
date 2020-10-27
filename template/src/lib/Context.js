import React, { useState, useEffect, useContext } from 'react';
import jp from 'jsonpath';

const stage = process.env.REACT_APP_STAGE || 'production';
const devProd = stage === 'production' || stage === 'staging' ? 'prod' : 'dev';

export const getStage = ()=>{
    return stage;
}
export const getDevProd = ()=>{
    return devProd
}
export const getFFUrl = ()=>{
    return `https://api.${stage}.cloudios.flowfact-${devProd}.cloud`;

}
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
    const [cognitotoken, setCognitotoken] = useState('');

    function upgradeStage(toStage) {
        // console.log('contractAcceptances', contractAcceptances);
        const m = document.location.href.match('\/render\/([^\/]*)');
        const local = !m || m.length < 2;
        if (local){
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
            //   console.log('message', message);
              
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
        var contextURL = `assets/context/context.json?${Math.random()}`;
        var _cognitotoken = '';
        const externalConfig = getExternalConfig();
        if (externalConfig && externalConfig.contextURL && externalConfig.cognitotoken){
            contextURL=externalConfig.contextURL
            _cognitotoken = externalConfig.cognitotoken;
        }
        // console.log('cognitotoken', _cognitotoken);
        setCognitotoken(_cognitotoken);
        fetch(contextURL, { headers: {cognitotoken: _cognitotoken} })
            .then(jsonify)
            .then(result => {
                if (expectStageChange && targetStage !== result.currentStage){
                    // let's try it again
                    // console.log('Retrying context fetch until we see a stage change')
                    setTimeout(()=>fetchContext(true, targetStage), 1000);
                    return;   
                }
                setIEX(result);
                setError(null);
                fetch(`assets/context/config.json?${Math.random()}`, { headers: {cognitotoken: _cognitotoken} })
                    .then(jsonify)
                    .then(result => {
                        // resetMissingVars();
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
    return <ContextStore.Provider value={{ iex, config, ready, error, upgradeStage, currentStage, setContractAccepted, cognitotoken }}>{children}</ContextStore.Provider>
}

const Stage = ({ level, children }) => {
    const { iex, ready } = useContext(ContextStore);
    const { currentStage } = iex;
    if (!ready) return <></>
    if ("" + currentStage !== level) return <></>
    return <>{children}</>;
}

const resetMissingVars = ()=>{
    window.missingVars = [];
}
resetMissingVars();
const addMissingVar = (ms) => {
    if ( ! window.missingVars.find((item)=>item===ms)){
        window.missingVars.push(ms);
        window.missingVars.sort();
    }
}
const ffmap = (strings, ...values) => {
    var str = "";
    for (var i=0; i<strings.length; i++){
        str+=strings[i];
        if (i<values.length){
            str+=values[i];
        }
    }

    // console.log(str);
    const iex = ContextStore._currentValue.iex;
    // console.log("Path : ",strings[0], iex)
    function q(jpath) {
        return jp.query(iex.context, jpath);
    }
    try {
        // try first with weird FF blah.values array
        let answer = q(`$.${str}.values`);
        // console.log("Answer with .values: ",answer)
        answer = answer[0];

        // undue the weird everything is a value array in FF
        if (Array.isArray(answer) && answer.length === 1) {
            // console.log("Unwrapping Array : ",answer[0]);
            answer = answer[0];
        }
        // console.log("Answer and typeof : ",answer, typeof answer);
        // if ((answer || (answer.values && answer.values.length===1 && answer.values[0]==false)) && typeof answer !== 'function') {
        if (answer && typeof answer !== 'function') {
            if (answer.length===0){
                addMissingVar(str);
                return undefined;
            }else{
                // console.log('======================>answer1', answer)
                return answer;
            }
        } else {
            // console.log("What is it's a normal object????!?!!?");
            // okay entities have weird value arrays but sender obj doesn't!!!!
            answer = q(`$.${str}`)[0];
            // console.log("Answer without .value: ",answer);
            if (answer) {
                //FF-35
                if ((answer.values && answer.values.length>0 && answer.values[0]==='') || (answer.length===0)){
                    addMissingVar(str);
                    return undefined;
                }
                //END FF-35
                // console.log('======================>answer2', answer)
                // check if values[0]=false
                if (answer.values && answer.values.length===1 && answer.values[0]==false){
                    return "false";
                }
                return answer;
            }
            addMissingVar(str);
            return undefined;
        }
    } catch (e) {
        // console.log(`Error trying to reference ${strings}`, e);
        addMissingVar(str);
        return 'ERROR';
    }
}




export { Context, ContextStore, Stage, ffmap, resetMissingVars };
