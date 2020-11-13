import React, { useState, useContext } from 'react';
import Page from '../Page/Page';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './ContractAgreement.scss'
import Header from '../Header/Header';
import { css } from 'emotion';
import TabPanel from './TabPanel';
import {ContextStore, ffmap} from '../../lib/Context'



export default function ContractAgreement({ theme, contracts, imgObj, children }) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [acceptedTabCount, setAcceptedTabCount] = useState(0);
    const filteredContracts = (contracts && contracts.filter(contract=>contract.legislationTextName!=="Provisionshinweis" || ffmap`entity.commissionProspect`)) || [];
    const initialState = filteredContracts.reduce((acc, c) => {
        acc[c.technicalName] = false;
        return acc;
    }, {});

    const [submitState, setSubmitState] = useState(initialState);


    const iexContext = useContext(ContextStore);


    const submitContractConsent = (contract) => {
        const newState = { ...submitState, [contract.technicalName]: true }
        setSubmitState(newState)
        if (selectedTab < filteredContracts.length - 1) {
            setSelectedTab(selectedTab + 1);           
        } else {
            iexContext.upgradeStage(iexContext.currentStage+1)
        }
        setAcceptedTabCount(acceptedTabCount + 1);
    }
    if (filteredContracts.length>0){
        return (
            <div className="fullpage" 
            // style={{
            //     backgroundImage: `url(${imgObj && imgObj.uri})`
            // }}
            >
                <img style={{position: 'absolute', left: 0, top: 0}} width="100%" src={imgObj.uri}/>
                <div className="ContractAgreement">
                    <Header theme={theme} className={css`
                        width: 100mm;
                    `} />
                    <div className='agreements'>
                        <Tabs className='MuiTabs-root selector' value={selectedTab} onChange={(event, newValue) => { setSelectedTab(newValue) }}>
                            {filteredContracts.map((contract, index) => {
                                return (
                                    <Tab key={`tabSelector_${contract.id}`} disabled={acceptedTabCount < index || submitState[contract.technicalName]} label={contract.legislationTextName}/>
                                );
                            })}
                        </Tabs>
                        {filteredContracts.map((contract, idx) => <TabPanel theme={theme} submitContractConsent={submitContractConsent} key={`tabPannel_${contract.id}`} value={selectedTab} index={idx} contract={contract} />)}
                    </div>
                </div>
            </div>
    
        );
    }else{
        return <></>;
    }
    
}