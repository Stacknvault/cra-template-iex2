import React, { useContext } from 'react';
import './Expose.scss';
import { basetheme as theme } from './styles/IEXTheme'
import { Stage, ffmap } from './lib/Context'
import { ffmd } from './lib/FormatUtils'

import FrontCover from './sections/FrontCover/FrontCover';
import FactSheet from './sections/FactSheet/FactSheet';
import TextPage from './sections/TextPage/TextPage';
import PicturePages from './sections/PicturePages/PicturePages';
import FloorPlans from './sections/FloorPlans/FloorPlans';
import AgentDetail from './sections/AgentDetail/AgentDetail';
import Fact from './sections/FactSheet/Fact';
import ContractAgreement from './sections/ContractAgreement/ContractAgreement';

function Expose() {

  return (
    <>
      <Stage level="0">
        <ContractAgreement theme={theme} contracts={ffmap`company.legislationTexts`} imgObj={ffmap`entity.mainImage`}>
          {ffmap`company.companyStreet`}
        </ContractAgreement>
      </Stage>
      <Stage level="1">
        <FrontCover theme={theme} title={ffmap`entity.headline`} imgObj={ffmap`entity.mainImage`}></FrontCover>
        <FactSheet title="Wichtiges auf einen Blick" theme={theme}>
          <Fact theme={theme} label="Objekttyp" value="Doppelhaushälfte" />
          <Fact theme={theme} label="Wohnfläche" value="ca. 305 m2" />
          <Fact theme={theme} label="Grundstücksfläche" value=" ca. 1480 m2" />
          <Fact theme={theme} label="Anzahl Zimmer" value="4" />
          <Fact theme={theme} label="Anzahl Terrassen" value="3" />
          <Fact theme={theme} label="Anzahl Badezimmer" value="" />
          <Fact theme={theme} label="Gäste-WC " value="Ja" />
          <Fact theme={theme} label="Heizungsart" value="Zentralheizung" />
          <Fact theme={theme} label="ImmoNr" value="6068" />
          <Fact theme={theme} label="Straße" value="Kammerkoppel" />
          <Fact theme={theme} label="Hausnummer" value="29 a" />
          <Fact theme={theme} label="PLZ" value="24222" />
          <Fact theme={theme} label="Ort" value="Schwentinental" />
          <Fact theme={theme} label="Land" value="Deutschland" />
          <Fact theme={theme} label="Energieausweis" value="Bedarfsausweis" />
          <Fact theme={theme} label="Endenergiebedarf" value="111 kWh/(m2*a)" />
          <Fact theme={theme} label="Energieausweis gültig bis" value="02.10.2028" />
          <Fact theme={theme} label="Baujahr lt. Energieausweis" value="1993" />
          <Fact theme={theme} label="wesentlicher Energieträger" value="Gas" />
          <Fact theme={theme} label="Baujahr Immobilie" value="1993" />
          <Fact theme={theme} label="Kaufpreis" value="279.000,00 e" />
          <Fact theme={theme} label="Käufer-Provision" value="4,76%" />
        </FactSheet>
        <TextPage title="Die Immobilie" theme={theme}>{ffmd(ffmap`entity.textEstate`)}</TextPage>
        <TextPage title="Ausstattungsbeschreibung" theme={theme}>
          <h2>ALLGEMEINE AUSSTATTUNGSMERKMALE:</h2>
          <ul>
            <li>Doppelhaushälfte in Massivbauweise</li>
            <li>Schönes Grundstück</li>
            <li>Moderne Gasheizung (2015)</li>
            <li>Kunststofffenster</li>
            <li>Teilweise Rollläden</li>
            <li>Große Terrasse</li>
            <li>Garage und ein Stellplatz im Carport</li>
            <li>Schuppen für Gartengeräte, Fahrräder und Gartenmöbel</li>
            <li>Weiteres Gartenhaus</li>
            <li>Das Haus ist nach WEG geteilt</li>
          </ul>

          <h2>AUFTEILUNG ERDGESCHOSS:</h2>
          <ul>
            <li>Flur mit Platz für eine Garderobe</li>
            <li>Voll ausgestattete, moderne Küche</li>
            <li>Großes Wohn- und Esszimmer mit Kaminofen und Zugang zur Terrasse und dem Garten</li>
            <li>Modernes Gäste-WC</li>
            <li>Großer Hauswirtschaftsraum mit Waschmaschinenanschluss & Co.</li>
          </ul>

          <h2>AUFTEILUNG DACHGESCHOSS:</h2>
          <ul>
            <li>Großes Schlafzimmer</li>
            <li>Zwei individuell nutzbare Zimmer (Kinderzimmer, Gästezimmer, Büro, etc.)</li>
            <li>Vollbad mit Badewanne, Dusche und Tageslichtfenster</li>
            <li>Zugang zum wohnlich ausgebauten Spitzboden mit viel Nutzfläche</li>
          </ul>
        </TextPage>
        <TextPage title="Die Lage" theme={theme}>{ffmd(ffmap`entity.textEnvironment`)}</TextPage>
        <PicturePages theme={theme}></PicturePages>
        <FloorPlans theme={theme} imgObjs={ffmap`entity.groundplotImage`}></FloorPlans>
        <AgentDetail theme={theme}></AgentDetail>
      </Stage>
    </>
  );
}

export default Expose;
