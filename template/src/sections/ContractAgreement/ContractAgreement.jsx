import React, {useContext, useState} from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styles from './ContractAgreement.module.scss'
import Header from '../Header/Header'
import {CheckCircle, CheckCircleOutline} from '@material-ui/icons'
import TabPanel from './TabPanel/TabPanel'
import {ContextStore, ffmap} from '../../lib/Context'


export default function ContractAgreement({theme, contracts, imgObj, children}) {
  const [selectedTab, setSelectedTab] = useState(0)
  const [acceptedTabCount, setAcceptedTabCount] = useState(0)
  const filteredContracts = (contracts && contracts.filter(contract => contract.legislationTextName !== 'Provisionshinweis' || ffmap`entity.commissionProspect`)) || [] // filter Provisionshinweis if there is no comission
  const initialState = filteredContracts.reduce((acc, c) => {
    acc[c.technicalName] = false
    return acc
  }, {})

  const [submitState, setSubmitState] = useState(initialState)
  const iexContext = useContext(ContextStore)

  const submitContractConsent = (contract) => {
    const newState = {...submitState, [contract.technicalName]: true}
    setSubmitState(newState)
    if (selectedTab < filteredContracts.length - 1) {
      setSelectedTab(selectedTab + 1)
    } else {
      iexContext.upgradeStage(iexContext.currentStage + 1)
    }
    setAcceptedTabCount(acceptedTabCount + 1)
  }
  const goBack = () => {
    setSelectedTab(selectedTab - 1)
  }
  if (filteredContracts.length > 0) {
    return (
      <div className={styles.fullPage}>
        <img
          style={{position: 'absolute', left: 0, top: 0}} width="100%" src={imgObj.uri}
        alt='property img'/>
        <div className={styles.contentWrap}>
          <Header theme={theme}/>

          <Tabs
            className={styles.tabsWrap}
            value={selectedTab}
            variant='fullWidth'
            onChange={(event, newValue) => setSelectedTab(newValue)}>

            {filteredContracts.map((contract, index) => <Tab
              key={`tabSelector_${index}`}
              disabled={selectedTab < index}
              label={
                <div className={styles.checkCircleContent}>
                  {selectedTab > index &&
                  <CheckCircle className={styles.checkCircle} style={{color: '#05B9AE' /*theme.brand.colors.primary*/}}/>}
                  {selectedTab <= index && <CheckCircleOutline className={styles.checkCircleNext}/>}
                  <p className={styles.circleHelpText}>{contract.legislationTextName}</p>
                </div>
              }/>,
            )}
          </Tabs>
          <div className={styles.tabPanelWrap}>
            {filteredContracts.map((contract, idx) => <TabPanel
              theme={theme}
              submitContractConsent={submitContractConsent}
              goBack={goBack}
              key={`tabPannel_${idx}`}
              value={selectedTab}
              index={idx}
              totalLength={filteredContracts.length}
              contract={contract}/>)}
          </div>


        </div>
      </div>

    )
  } else {
    return <></>
  }

}