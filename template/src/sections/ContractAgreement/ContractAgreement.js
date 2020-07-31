import React, { useState, useContext } from 'react';
import Page from '../Page/Page';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './ContractAgreement.scss'
import Header from '../Header/Header';
import { css } from 'emotion';
import TabPanel from './TabPanel';
import {ContextStore} from '../../lib/Context'



export default function ContractAgreement({ theme, contracts, imgObj, children }) {
    const [selectedTab, setSelectedTab] = useState(0);

    const initialState = contracts.reduce((acc, c) => {
        acc[c.technicalName] = false;
        return acc;
    }, {});

    const [submitState, setSubmitState] = useState(initialState);

    console.log("Contracts : ", contracts, initialState);

    const iexContext = useContext(ContextStore);


    const submitContractConsent = (contract) => {
        console.log("Contract State :", contract);
        const newState = { ...submitState, [contract.technicalName]: true }
        console.log("New state ", newState)
        setSubmitState(newState)
        if (selectedTab < contracts.length - 1) {
            console.log("Now : ", selectedTab, " goes to ", contracts.length)
            setSelectedTab(selectedTab + 1);           
        } else {
            console.log(`stage from ${iexContext.currentStage} to ${iexContext.currentStage+1}`);
            iexContext.upgradeStage(iexContext.currentStage+1)
        }
    }

    return (
        <div className="fullpage" style={{
            backgroundImage: `url(${imgObj.uri})`
        }}>
            <div className="ContractAgreement">
                <Header theme={theme} className={css`
                    width: 100mm;
                `} />
                <div className='agreements'>
                    <Tabs className='MuiTabs-root selector' value={selectedTab} onChange={(event, newValue) => { setSelectedTab(newValue) }}>
                        {contracts.map(contract => {
                            return (
                                <Tab key={`tabSelector_${contract.id}`} disabled={submitState[contract.technicalName]} label={contract.legislationTextName} />
                            );
                        })}
                    </Tabs>
                    {contracts.map((contract, idx) => <TabPanel theme={theme} submitContractConsent={submitContractConsent} key={`tabPannel_${contract.id}`} value={selectedTab} index={idx} contract={contract} />)}
                </div>
            </div>
        </div>

    );
}