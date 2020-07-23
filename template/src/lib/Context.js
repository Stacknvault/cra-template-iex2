import React, { useState, useEffect, useContext } from 'react';
import jp from 'jsonpath';


const ContextStore = React.createContext({});
const Context = ({ children }) => {
    const [iex, setIEX] = useState({});
    const [ready, setReady] = useState(false);
    const [error, setError] = useState(null);
    const [config, setConfig] = useState(false);

    // hacky hack hack
    function _setStageHack(val) {
        const newIex = {...iex}
        newIex.currentStage++;
        setIEX(newIex);
    }

    const jsonify = res => res.json();
    const reportError = error => { setError("" + error) };
    const fetchContext = () => {
        fetch('assets/context/context.json', { headers: {} })
            .then(jsonify)
            .then(result => {
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
    return <ContextStore.Provider value={{ iex, config, ready, error, _setStageHack }}>{children}</ContextStore.Provider>
}

const Stage = ({ level, children }) => {
    const { iex, ready } = useContext(ContextStore);
    const { currentStage } = iex;
    if (!ready) return <></>
    if ("" + currentStage !== level) return <></>
    return <>{children}</>;
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
                return answer;
            }
            // okay loop through all the default values
            for (let i = 0; i < values.length; i++) {
                if (values[0]) return values[0];
            }
            // i give up....
            return undefined;
        }
    } catch (e) {
        console.log(`Error trying to deference ${strings}`, e);
        return 'ERROR';
    }
}




export { Context, ContextStore, Stage, ffmap };