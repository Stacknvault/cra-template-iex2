import React, { useContext } from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ReactMustache from 'react-mustache'
import FormHelperText from '@material-ui/core/FormHelperText';
import { ContextStore } from '../..//lib/Context'

import { ffmap } from '../../lib/Context'
import { Button, CircularProgress } from '@material-ui/core';


export default function TabPanel({ children, submitContractConsent, contract, value, index, ...other }) {
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
            setLoading(true);
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
            <ReactMustache template={contract.legislationTextContent} data={ffmap`company`} />
        </div>
        <div className='Tab' hidden={value !== index} {...other}>
                <FormControl error={error} required={true} >
                    <FormGroup>
                        {contract.legislationCheckboxes.map(cb => {
                            
                            return (
                                <FormControlLabel
                                    key={cb.value}
                                    control={<Checkbox disabled={loading} checked={state[cb.value]} name={cb.value} onChange={e=>handleChange(e, contract, cb)} />}
                                    label={<ReactMustache template={cb.label + (cb.required?' (*)':'')} data={{...ffmap`company`, cancellationUrl: 'https://s3.eu-central-1.amazonaws.com/cloudios.development.company-service/legislationtexts/b/498f3bab-0fa8-4e64-94f4-3ce897f9c7fb/revocation_terms/1600244681999.html'}} />} />
                            );
                        })}
                    </FormGroup>
                    <FormHelperText>Alle mit (*) markierten Kontrollkästchen sind obligatorisch.</FormHelperText>
                    <Button variant="outlined" onClick={submitConsent} size="large" disabled={error} color="primary" style={{backgroundColor: '#abcdef'}}>
                    {loading && <CircularProgress size={14} />}
                    {!loading && 'Submit Consent'}
                    </Button>
                </FormControl>
        </div>
        </>
            )}
            </>
    );
}