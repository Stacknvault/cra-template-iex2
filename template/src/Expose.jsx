import React, { useContext } from 'react';
import './Expose.scss';
import { getBaseTheme } from './styles/IEXTheme'
import { Stage, ffmap, ContextStore } from './lib/Context'
import { ffmd } from './lib/FormatUtils'

import FrontCover from './sections/FrontCover/FrontCover';
import FactSheet from './sections/FactSheet/FactSheet';
import TextPage from './sections/TextPage/TextPage';
import PicturePages from './sections/PicturePages/PicturePages';
import FloorPlans from './sections/FloorPlans/FloorPlans';
import AgentDetail from './sections/AgentDetail/AgentDetail';
import Fact from './sections/FactSheet/Fact';
import ContractAgreement from './sections/ContractAgreement/ContractAgreement';
import MapSection from './sections/Map/MapSection';
import Page from './sections/Page/Page';
const estateTypes = {
  "01TERR": "Terrassenwohnung",
  "01ZO": "Sonstiger Wohnungstyp",
  "01ZFERIE": "Ferienwohnung",
  "01SOUT": "Souterrain",
  "01PENT": "Penthouse",
  "01HP": "Hochparterre",
  "01DACH": "Dachgeschosswohnung",
  "01LOFT": "Loftwohnung",
  "01ETAG": "Etagenwohnung",
  "01ZGALER": "Galerie",
  "01ZATTIK": "Attikawohnung",
  "01GERD": "Erdgeschosswohnung",
  "01ZAPART": "Apartment",
  "01ZROHD": "Rohdachboden",
  "01": "Wohnungen",
  "01MAIS": "Maisonettewohnung"
};
const energySources = {
  "WAE": "Wärmepumpe",
  "OEL": "Öl-Heizung",
  "GAS": "Gas-Heizung",
  "03": "Zentralheizung",
  "BLO": "Blockheizkraftwerk",
  "SOL": "Solar-Heizung",
  "ELE": "Elektro-Heizung",
  "02": "Ofenheizung",
  "HOL": "Holz-Pelletheizung",
  "FUS": "Fußbodenheizung",
  "FER": "Fernwärme",
  "NAC": "Nachtspeicherofen",
  "01": "Etagenheizung"
}
const energyIdentificationTypes = {
  "2": "Bedarfsausweis",
  "3": "Verbrauchsausweis"
}
const energyEfficienceClasses = {
  "01": "A+",
  "02": "A",
  "03": "B",
  "04": "C",
  "05": "D",
  "06": "E",
  "07": "F",
  "08": "G",
  "09": "H",
}
function Expose() {
  const iexContext = useContext(ContextStore);
  // console.log('iexContext', iexContext);
  const theme = getBaseTheme();
  return (
    <>
      <Stage level="0">
        <ContractAgreement theme={theme} contracts={ffmap`company.legislationTexts`} imgObj={ffmap`entity.mainImage`}>
          {ffmap`company.companyStreet`}
        </ContractAgreement>
      </Stage>
      <Stage level="1">
        <FrontCover theme={theme} title={ffmap`entity.headline`} imgObj={ffmap`entity.mainImage`}></FrontCover>
        {/* <Page theme={theme} title={'Map'} withMargin={true}>
          <MapSection className="section" marker={false} traffic={false} controls={false}/>
        </Page> */}
        <FactSheet title="Wichtiges auf einen Blick" theme={theme}>
          <Fact theme={theme} label="Objekttyp" value={estateTypes[ffmap`entity.estatetype`]} />
          <Fact theme={theme} label="Wohnfläche" value={`ca. ${ffmap`entity.livingarea`} m2`} />
          {/* <Fact theme={theme} label="Grundstücksfläche" value={` ca. ??? m2`} /> */}
          <Fact theme={theme} label="Anzahl Zimmer" value={ffmap`entity.rooms`} />
          <Fact theme={theme} label="Anzahl Balkone" value={ffmap`entity.balconies`} />
          <Fact theme={theme} label="Terrasse" value={ffmap`entity.terraceavailable` ? 'Ja': 'Nein'} />
          <Fact theme={theme} label="Anzahl Badezimmer" value={ffmap`entity.numberbathrooms`} />
          <Fact theme={theme} label="Gäste-WC " value={ffmap`entity.numseptoilets` > 0 ? 'Ja': 'Nein'} />
          {/* <Fact theme={theme} label="Heizungsart" value="Zentralheizung???" /> */}
          
          <Fact theme={theme} label="ImmoNr" value={ffmap`entity.identifier`} />
          {!ffmap`entity.addresses..street` &&
            <Fact theme={theme} label="Straße" value={ffmap`entity.street`} />
          } 
          {ffmap`entity.addresses..street` && 
            <>
            <Fact theme={theme} label="Straße" value={ffmap`entity.addresses..street`} />
            <Fact theme={theme} label="PLZ" value={ffmap`entity.addresses..zipcode`} />
            <Fact theme={theme} label="Ort" value={ffmap`entity.addresses..city`} />
            <Fact theme={theme} label="Land" value={ffmap`entity.addresses..country`} />
            </>
          }
          <Fact theme={theme} label="Endenergieausweistyp" value={energyIdentificationTypes[ffmap`entity.energyidentificationtype`]} />
          <Fact theme={theme} label="Endenergiebedarf" value={`${ffmap`entity.energyusagevalue`} kWh/(m2*a)`} />
          <Fact theme={theme} label="Endenergiefficienzklasse" value={energyEfficienceClasses[ffmap`entity.energyefficienceclass`]} />
          <Fact theme={theme} label="wesentlicher Energieträger" value={energySources[ffmap`entity.fuelenergy_type`]} />
          <Fact type="date" theme={theme} label="Energieausweis gültig bis" value={ffmap`entity.pass_valid_till`} />
          {/* <Fact theme={theme} label="Baujahr lt. Energieausweis" value={ffmap`entity.energidentificationdate`} /> */}
          <Fact theme={theme} label="Baujahr Immobilie" value={ffmap`entity.yearofconstruction`} />
          <Fact type="currency" theme={theme} label="Kaufpreis" value={ffmap`entity.purchaseprice`} />
          <Fact type="currency" theme={theme} label="Mietepreis" value={ffmap`entity.rent`} />
          <Fact theme={theme} label="Käufer-Provision" value={ffmap`entity.commissionProspect`} />
        </FactSheet>
        <TextPage title="Die Immobilie" theme={theme}>
          {ffmd(ffmap`entity.textEstate`)}
        </TextPage>
        <TextPage title="Ausstattungsbeschreibung" theme={theme}>
          {ffmd(ffmap`entity.textEnvironment`)}
          
        
        </TextPage>
        <TextPage title="Die Lage" theme={theme}>{ffmd(ffmap`entity.textLocation`)}</TextPage>
        <PicturePages theme={theme} imgObjs={ffmap`entity.longImage`}></PicturePages>
        <FloorPlans theme={theme} imgObjs={ffmap`entity.groundplotImage`}></FloorPlans>
        {ffmap`sender` && <AgentDetail theme={theme}></AgentDetail>}
      </Stage>
    </>
  );
}

export default Expose;
