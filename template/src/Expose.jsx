import React, { useContext, useEffect, useRef, useState } from 'react';
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
import MapPage from './sections/OpenMap/MapPage';
import {Button, Link } from '@material-ui/core';
import useSticky from './hooks/useSticky';
import { requiredFields } from './config';
import { Print } from '@material-ui/icons';


function Expose() {
  const iexContext = useContext(ContextStore);
  const schemaName = iexContext.iex.context.entity._metadata.schema;
  // console.log('The schema name is', schemaName);
  const schema = iexContext.iex.context.schemas.filter(item=>item.name===schemaName)[0];
  // console.log('The schema is', schema);
  // console.log('iexContext', iexContext);
  const theme = getBaseTheme();

  const { element } = useSticky();

  // const { printElement } = useSticky();
  

  const menu = {
    start: useRef(null),
    agent: useRef(null),
    pictures: useRef(null),
    facts: useRef(null),
    immo: useRef(null),
    equipment: useRef(null),
    thearea: useRef(null),
    map: useRef(null),
    constructability: useRef(null),
    floorPlans: useRef(null),
    textDevelopment: useRef(null),
    textFree: useRef(null),
    commissionInformation: useRef(null),
  }
  const [currentMenuItem, setCurrentMenuItem] = useState(menu.start)

  const handleScroll = (event)=>{
    var minPositive={item:null, pos:100000};
    Object.keys(menu).map((key)=>{
      if (menu[key].current){
        // console.log(key, menu[key].current.getBoundingClientRect().y)
        const rect=menu[key].current.getBoundingClientRect();
        if (rect.y>=0 && rect.y<minPositive.pos){
          minPositive={item: menu[key], pos: rect.y}
        }
      }
    })
    if (minPositive.item){
      setCurrentMenuItem(minPositive.item);
    }
    let scrollTop = event.srcElement.body.scrollTop;
    // console.log(scrollTop, window.scrollY);
  }
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
  },[]);


  const menuItem=(item, title)=>(
    <div className="menuItem">
      <Link
          component="button"
          variant="body2"
          
          onClick={()=>{
            setCurrentMenuItem(item);
            let node = item.current;
            console.log(node.getBoundingClientRect())
            console.log(node);
            if (node) {
                node.scrollIntoView();
            }
          }}
        >
          <span className={item===currentMenuItem?"menuItemTextHightlighted":"menuItemText"}>{item===currentMenuItem?"> ":""} {title}</span>
      </Link>
    </div>
  )

  const renderMenu = ()=>(
    <div className="menu">
      {menuItem(menu.start, 'START')}
      {menuItem(menu.facts, 'WICHTIGES')}
      <div className="menuItem">
        <div className="subMenu">TEXTE</div>
        {ffmap`entity.textEstate` && menuItem(menu.immo, 'DIE IMMOBILIE')}
        {ffmap`entity.textEnvironment` && menuItem(menu.equipment, 'AUSSTATTUNGSBESCHREIBUNG')}
        {ffmap`entity.textLocation` && menuItem(menu.thearea, 'DIE LAGE')}
        {ffmap`entity.textConstructability` && menuItem(menu.constructability, 'BEBAUBARKEIT')}
        {ffmap`entity.textDevelopment` && menuItem(menu.textDevelopment, 'ERSCHLIESSUNG')}
        {ffmap`entity.textFree` && menuItem(menu.textFree, 'FREITEXT')}
        {ffmap`entity.commissionInformation` && menuItem(menu.commissionInformation, 'PROVISIONSHINWEIS')}
      </div>
      <div className="menuItem">
        <div className="subMenu">GALERIE</div>      
        {menuItem(menu.pictures, 'OBJEKTBILDER')}
        {menuItem(menu.map, 'MAP')}
        {ffmap`entity.floorPlans` && menuItem(menu.floorPlans, 'GRUNDRISE')}
      </div>
      
      {menuItem(menu.agent, 'IHR ANSPRECHPARTNER')}
      
    </div>
  )

  const renderPrintButton = ()=>(
    <div className="printButtonHolder">
      <Button onClick={window.print} className="printButton">
        <div>
          <Print/>
        </div>
        <div>
          &nbsp;Exposé drucken
        </div>
      </Button>      
    </div>
  )

  return (
    <>
      <Stage level="0">
        <ContractAgreement theme={theme} contracts={ffmap`company.legislationTexts`} imgObj={ffmap`entity.mainImage`}>
          {ffmap`company.companyStreet`}
        </ContractAgreement>
      </Stage>
      <Stage level="1">
        {renderMenu()}
        {renderPrintButton()}

        <div ref={element}>
          <FrontCover anchor={menu.start} theme={theme} title={ffmap`entity.headline`} imgObj={ffmap`entity.mainImage`}></FrontCover>
          {/* <Page theme={theme} title={'Map'} withMargin={true}>
            <MapSection className="section" marker={false} traffic={false} controls={false}/>
          </Page> */}
          <SmartFactSheet anchor={menu.facts} title="Wichtiges auf einen Blick" theme={theme}>
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
          </SmartFactSheet>
          {ffmap`entity.textEstate` && <TextPage anchor={menu.immo} title="Die Immobilie" theme={theme}>
            {ffmd(ffmap`entity.textEstate`)}
          </TextPage>}
          <TextPage title="Ausstattungsbeschreibung" anchor={menu.equipment} theme={theme}>
            {ffmd(ffmap`entity.textEnvironment`)}
          </TextPage>
          {ffmap`entity.textLocation` && <TextPage anchor={menu.thearea} title="Die Lage" theme={theme}>{ffmd(ffmap`entity.textLocation`)}</TextPage>}
          {ffmap`entity.textConstructability` && <TextPage anchor={menu.constructability} title="Bebaubarkeit" theme={theme}>{ffmd(ffmap`entity.textConstructability`)}</TextPage>}
          {ffmap`entity.textDevelopment` && <TextPage anchor={menu.textDevelopment} title="Erschließung" theme={theme}>{ffmd(ffmap`entity.textDevelopment`)}</TextPage>}
          {ffmap`entity.textFree` && <TextPage anchor={menu.textFree} title="Freitext" theme={theme}>{ffmd(ffmap`entity.textFree`)}</TextPage>}
          {ffmap`entity.commissionInformation` && <TextPage anchor={menu.commissionInformation} title="Provisionshinweis" theme={theme}>{ffmd(ffmap`entity.commissionInformation`)}</TextPage>}
          <PicturePages title={"OBJEKTBILDER"} anchor={menu.pictures} theme={theme} imgObjs={ffmap`entity.longImage`}></PicturePages>
          <MapPage anchor={menu.map} theme={theme} title="MAP"></MapPage>
          <FloorPlans anchor={menu.floorPlans} theme={theme} imgObjs={ffmap`entity.groundplotImage`}></FloorPlans>
          {ffmap`sender` && <AgentDetail anchor={menu.agent} theme={theme}></AgentDetail>}
        </div>
      </Stage>
    </>
  );
}

export default Expose;
