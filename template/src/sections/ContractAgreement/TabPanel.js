import React, { useContext } from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ReactMustache from 'react-mustache'
import FormHelperText from '@material-ui/core/FormHelperText';
import { ContextStore } from '../..//lib/Context'

import { ffmap } from '../../lib/Context'
import { Button, CircularProgress } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';


export default function TabPanel({ children, submitContractConsent, goBack, contract, value, index, totalLength, ...other }) {
    const initialState = contract.legislationCheckboxes.reduce((acc, cb) => {
        acc[cb.value] = false;
        return acc;
    }, {});
    const [state, setState] = React.useState(initialState);
    const [loading, setLoading] = React.useState(false);
    const iexContext = useContext(ContextStore);

    const handleChange = (event, contract, checkbox) => {
        const newState = { ...state, [event.target.name]: event.target.checked };
        // console.log("State is now: ", newState)
        setState(newState);
        iexContext.setContractAccepted(contract.id, checkbox.value, event.target.checked);
    };

    const submitConsent = () => {
        if(!error) {
            if (index===totalLength-1){
                setLoading(true);
            }
            submitContractConsent(contract);
        }
    }
    

    const error = contract.legislationCheckboxes.filter(cb => {
        return !cb.required || state[cb.value];
    }).length !== contract.legislationCheckboxes.length;
    return (
        <>
        {value === index && (
        <>
        <div className='Text'>
            <div className='InnerText'>
                <ReactMustache template={contract.legislationTextContent} data={{company: ffmap`company`}} />
            </div>
        </div>
        <div className='Tab' hidden={value !== index} {...other}>
                <FormControl error={error} required={true} >
                    <FormGroup>
                        {contract.legislationCheckboxes.map(cb => {
                            
                            return (
                                <FormControlLabel
                                    key={cb.value}
                                    control={<Checkbox className="greenChk" disabled={loading} checked={state[cb.value]} name={cb.value} onChange={e=>handleChange(e, contract, cb)} />}
                                    label={<div className='checkLabel'><ReactMustache template={cb.label + (cb.required?' (*)':'')} data={{company: ffmap`company`, cancellationUrl: 'https://s3.eu-central-1.amazonaws.com/cloudios.development.company-service/legislationtexts/b/498f3bab-0fa8-4e64-94f4-3ce897f9c7fb/revocation_terms/1600244681999.html'}} /></div>} />
                            );
                        })}
                    </FormGroup>
                    <FormHelperText>Alle mit (*) markierten Kontrollkästchen sind obligatorisch.</FormHelperText>
                    <div className='consentButtonWrapper'>
                        <div></div>
                        <div>
                            {index>0 && !loading && <Button className='backButton' onClick={goBack} size="large" style={error?{}:{color: 'rgb(109, 131, 145)'}}>
                                <ArrowBack/>Zurück
                            </Button>}
                            <Button variant="outlined" onClick={submitConsent} size="large" disabled={error} style={error?{}:{backgroundColor: '#05B9AE', color: 'white'}}>
                            {loading && <CircularProgress size={14} />}
                            {!loading && index<totalLength-1 && 'Weiter'}
                            {!loading && index==totalLength-1 && 'Exposé anzeigen'}
                            </Button>
                        </div>
                    </div>
                </FormControl>
        </div>
        </>
            )}
            </>
    );
}