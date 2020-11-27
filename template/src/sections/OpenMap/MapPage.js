import React from "react";
import { ffmap } from "../../lib/Context";
import Page from "../Page/Page";
import OpenMap from "./OpenMap";

export default function MapPage({title, theme, anchor}) {
const lat=ffmap`entity.latitude`
const lng=ffmap`entity.longitude`
  return lat && lng ?(
    <Page anchor={anchor} theme={theme} withMargin={true} title={title} header={false} footer={false}>
        <OpenMap position={[ffmap`entity.latitude`, ffmap`entity.longitude`]} zoom={17}/>
    </Page>
  ):(<></>);
}
