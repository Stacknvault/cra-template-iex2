import React, { useContext } from 'react';
import './Expose.scss';
import { getBaseTheme } from './styles/IEXTheme'
import { Stage, ffmap, ContextStore } from './lib/Context'
import { currency, ffmd } from './lib/FormatUtils'

import FrontCover from './sections/FrontCover/FrontCover';
import TextPage from './sections/TextPage/TextPage';
import PicturePages from './sections/PicturePages/PicturePages';
import FloorPlans from './sections/FloorPlans/FloorPlans';
import AgentDetail from './sections/AgentDetail/AgentDetail';
import Fact from './sections/FactSheet/Fact';
import ContractAgreement from './sections/ContractAgreement/ContractAgreement';
import SmartFactSheet from './sections/FactSheet/SmartFactSheet';
import Moment from 'moment';
import Page from './sections/Page/Page';
import OpenMap from './sections/OpenMap/OpenMap';
import ReactDOM from 'react-dom';
import MapPage from './sections/OpenMap/MapPage';

// const estateTypes = {
//   "01TERR": "Terrassenwohnung",
//   "01ZO": "Sonstiger Wohnungstyp",
//   "01ZFERIE": "Ferienwohnung",
//   "01SOUT": "Souterrain",
//   "01PENT": "Penthouse",
//   "01HP": "Hochparterre",
//   "01DACH": "Dachgeschosswohnung",
//   "01LOFT": "Loftwohnung",
//   "01ETAG": "Etagenwohnung",
//   "01ZGALER": "Galerie",
//   "01ZATTIK": "Attikawohnung",
//   "01GERD": "Erdgeschosswohnung",
//   "01ZAPART": "Apartment",
//   "01ZROHD": "Rohdachboden",
//   "01": "Wohnungen",
//   "01MAIS": "Maisonettewohnung"
// };
// const energySources = {
//   "WAE": "Wärmepumpe",
//   "OEL": "Öl-Heizung",
//   "GAS": "Gas-Heizung",
//   "03": "Zentralheizung",
//   "BLO": "Blockheizkraftwerk",
//   "SOL": "Solar-Heizung",
//   "ELE": "Elektro-Heizung",
//   "02": "Ofenheizung",
//   "HOL": "Holz-Pelletheizung",
//   "FUS": "Fußbodenheizung",
//   "FER": "Fernwärme",
//   "NAC": "Nachtspeicherofen",
//   "01": "Etagenheizung"
// }
// const energyIdentificationTypes = {
//   "2": "Bedarfsausweis",
//   "3": "Verbrauchsausweis"
// }
// const energyEfficienceClasses = {
//   "01": "A+",
//   "02": "A",
//   "03": "B",
//   "04": "C",
//   "05": "D",
//   "06": "E",
//   "07": "F",
//   "08": "G",
//   "09": "H",
// }

const requiredFields = [
  "livingarea",
  "estatetype",
  "subheadline",
  // "addresses",
  // "addresses",
  // "addresses",!!!
  "commissioninclvat",
  "purchaseprice",
  "pricesqm",
  "rentsqf",
  "annuallease",
  "rent",
  "rentalincomenominal",
  "rentalincomeactual",
  "service_charge",
  "rentinclusiveofheating",
  "securitydeposit",
  "additionalrentcharges",
  "monthly_oberheads",
  "heatingcosts",
  "additionalexpenses",
  "infrastructurecosts",
  "price_on_request",
  "livingarea",
  "plotarea",
  "leasablearea",
  "plotcoverratio",
  "plotfront",
  "cellararea",
  "usablearea",
  "gardenarea",
  "officespace",
  "commercialarea",
  "asarea",
  "minpartialarea",
  "totalarea",
  "otherarea",
  "rooms",
  "kitchen_existing",
  "builtin_kitchen",
  "furnished",
  "guestToilet",
  "roomsmodifiable",
  "yearofconstruction",
  "constructibleaccto",
  "buildingplot",
  "landusage",
  "flooring",
  "qualfitout",
  "bathroomproperties",
  "recommuse",
  "floor",
  "no_of_floors",
  "fittings_stairs",
  "parking",
  "numgarages",
  "carportnum",
  "garagerent",
  "carportrent",
  "garagepurchaseprice",
  "carportpurchaseprice",
  "buildingpermit",
  "let",
  "monthlyrentincome",
  "completiondate",
  // "elevator",!!!
  "elevator_general",
  "balconyterrace",
  "condition",
  "barrierfree",
  "monument",
  "dpwiring",
  "shutters",
  "location",
  "typeoflocation",
  "fittings",
  "commissionProspect",
  "identifier",
  "numhousingunits",
  "numretailunits",
  "numofunits",
  "totalunits",
  "AnnualNetColdRentActualResidential",
  "AnnualNetColdRentActualCommercial",
  "AnnualNetColdRentActualOthers",
  "AnnualNetColdRentActualTotal",
  "AnnualNetColdRentResidential",
  "AnnualNetColdRentCommercial",
  "AnnualNetColdRentOthers",
  "AnnualNetColdRentTotal",
  "vacancyUnitsResidential",
  "vacancyUnitsCommercial",
  "vacancyUnitsOthers",
  "yield_actual",
  "yield",
  "xtimes_actual",
  "xtimes",
  "textEstate",
  "energyIdentificationType",
  "energyUsageValue",
  "energyEfficienceClass",
  "energy_certificate_availability",
  "energIdentificationDate",
  "energy_performance_certificate_valid_until",
  "energyWithWarmWater",
  "typeofheating",
  "fuelenergy_type",
  "yearofconstruction",
  "lastModernization",
  "lastRefurbishment",
  "energyidentificationtype",
  "energyusagevalue",
  "energyusagevaluevoltage",
  "energyusagevalueheat",
  "energyefficienceclass",
  "energidentificationdate",
  "pass_valid_till",
  "energywithwarmwater",
];
function Expose() {
  const iexContext = useContext(ContextStore);
  const schemaName = iexContext.iex.context.entity._metadata.schema;
  // console.log('The schema name is', schemaName);
  const schema = iexContext.iex.context.schemas.filter(item=>item.name===schemaName)[0];
  // console.log('The schema is', schema);
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
        <SmartFactSheet title="Wichtiges auf einen Blick" theme={theme}>
          {requiredFields.filter(field=>ffmap`entity.${field}`).map((field, index)=>{
            const name=`entity.${field}`
            const fieldSpec=schema.properties[field];
            var value=ffmap`${name}`;// false is returned as "false"
            // console.log('and the winner is', value);
            if (value && fieldSpec){
              if (fieldSpec.type==='CHECKBOX'){
                value=value==="false"?'Nein':'Ja';
              }else if (fieldSpec.type==='LIST'){
                // console.log('list value', fieldSpec)
                const fn=Object.entries(fieldSpec.fields).filter(field=>field[1].value===value);
                if (fn.length>0){
                  value=fn[0][1].captions.de;
                }
              }else if (fieldSpec.type==='DATE'){
                value=Moment(new Date(value*1000)).format('DD/MM/yyyy');
              }
              const label=fieldSpec.captions.de;
              var unit=fieldSpec.unit||'';
              if (unit==='€' || field==='price' || field==='rent'){//!!! improve this and use proper formatting from schema
                value=currency(value);
                unit=''// included already by formatter
              }
              return (<Fact key={`k${index}`} theme={theme} label={label} value={`${value} ${unit}`} />)
            }else{
              return(<></>)
            }
          })}
          {/* <Fact theme={theme} label="Objekttyp" value={estateTypes[ffmap`entity.estatetype`]} />
          <Fact theme={theme} label="Wohnfläche" value={`ca. ${ffmap`entity.livingarea`} m2`} />
          <Fact theme={theme} label="Anzahl Zimmer" value={ffmap`entity.rooms`} />
          <Fact theme={theme} label="Anzahl Balkone" value={ffmap`entity.balconies`} />
          <Fact theme={theme} label="Terrasse" value={ffmap`entity.terraceavailable` ? 'Ja': 'Nein'} />
          <Fact theme={theme} label="Anzahl Badezimmer" value={ffmap`entity.numberbathrooms`} />
          <Fact theme={theme} label="Gäste-WC " value={ffmap`entity.numseptoilets` > 0 ? 'Ja': 'Nein'} />
          
          <Fact theme={theme} label="Objekt" value={ffmap`entity.identifier`} />
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
          <Fact theme={theme} label="Baujahr Immobilie" value={ffmap`entity.yearofconstruction`} />
          <Fact type="currency" theme={theme} label="Kaufpreis" value={ffmap`entity.purchaseprice`} />
          <Fact type="currency" theme={theme} label="Mietepreis" value={ffmap`entity.rent`} />
          <Fact theme={theme} label="Käufer-Provision" value={ffmap`entity.commissionProspect`} /> */}
        </SmartFactSheet>
        {ffmap`entity.textEstate` && <TextPage title="Die Immobilie" theme={theme}>
          {ffmd(ffmap`entity.textEstate`)}
        </TextPage>}
        <TextPage title="Ausstattungsbeschreibung" theme={theme}>
          {ffmd(ffmap`entity.textEnvironment`)}
        </TextPage>
        {ffmap`entity.textLocation` && <TextPage title="Die Lage" theme={theme}>{ffmd(ffmap`entity.textLocation`)}</TextPage>}
        <MapPage theme={theme} title="MAP"></MapPage>
        {ffmap`entity.textConstructability` && <TextPage title="Bebaubarkeit" theme={theme}>{ffmd(ffmap`entity.textConstructability`)}</TextPage>}
        {ffmap`entity.textDevelopment` && <TextPage title="Erschließung" theme={theme}>{ffmd(ffmap`entity.textDevelopment`)}</TextPage>}
        {ffmap`entity.textFree` && <TextPage title="Freitext" theme={theme}>{ffmd(ffmap`entity.textFree`)}</TextPage>}
        {ffmap`entity.commissionInformation` && <TextPage title="Provisionshinweis" theme={theme}>{ffmd(ffmap`entity.commissionInformation`)}</TextPage>}
        <PicturePages theme={theme} imgObjs={ffmap`entity.longImage`}></PicturePages>
        <FloorPlans theme={theme} imgObjs={ffmap`entity.groundplotImage`}></FloorPlans>
        {ffmap`sender` && <AgentDetail theme={theme}></AgentDetail>}
      </Stage>
    </>
  );
}

export default Expose;
