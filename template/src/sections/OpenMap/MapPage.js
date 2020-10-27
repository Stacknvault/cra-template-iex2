import React from "react";
import { ffmap } from "../../lib/Context";
import Page from "../Page/Page";
import OpenMap from "./OpenMap";

export default function MapPage({title, theme}) {
const lat=ffmap`entity.latitude`
const lng=ffmap`entity.longitude`
  return lat && lng ?(
    <Page theme={theme} withMargin={true} title={title}>
        <OpenMap position={[ffmap`entity.latitude`, ffmap`entity.longitude`]} zoom={17}/>
    </Page>
  ):(<></>);
}
