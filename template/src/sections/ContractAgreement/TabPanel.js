import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ReactMustache from 'react-mustache'
import FormHelperText from '@material-ui/core/FormHelperText';

import { ffmap } from '../../lib/Context'
import { Button, CircularProgress } from '@material-ui/core';


export default function TabPanel({ children, submitContractConsent, contract, value, index, ...other }) {
    const initialState = contract.legislationCheckboxes.reduce((acc, cb) => {
        acc[cb.value] = false;
        return acc;
    }, {});
    const [state, setState] = React.useState(initialState);
    const [loading, setLoading] = React.useState(false);

    const handleChange = (event) => {
        const newState = { ...state, [event.target.name]: event.target.checked };
        console.log("State is now: ", newState)
        setState(newState);
    };

    const submitConsent = () => {
        if(!error) {
            setLoading(true);
            submitContractConsent(contract);
        }
    }
    

    const error = contract.legislationCheckboxes.filter(cb => {
        return state[cb.value];
    }).length !== contract.legislationCheckboxes.length;

    return (
        <div className='Tab' hidden={value !== index} {...other}>
            {value === index && (
                <>
                    <ReactMustache template={contract.legislationTextContent} data={ffmap`company`} />
                    <FormControl error={error} required={true} >
                        <FormGroup>
                            {contract.legislationCheckboxes.map(cb => {
                                return (
                                    <FormControlLabel
                                        key={cb.value}
                                        control={<Checkbox checked={state[cb.value]} name={cb.value} onChange={handleChange} />}
                                        label={<ReactMustache template={cb.label} data={ffmap`company`} />} />
                                );
                            })}
                        </FormGroup>
                        <FormHelperText>All checkboxes are required.</FormHelperText>
                        <Button variant="outlined" onClick={submitConsent} size="large" disabled={error} color="primary" style={{backgroundColor: '#abcdef'}}>
                        {loading && <CircularProgress size={14} />}
                        {!loading && 'Submit Consent'}
                        </Button>
                    </FormControl>
                </>
            )}
        </div>
    );
}