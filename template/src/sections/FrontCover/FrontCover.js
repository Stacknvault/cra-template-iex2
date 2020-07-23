import React from 'react'
import './FrontCover.scss'

//
import HeroImage from '../../mock/pics/modern-building-against-sky-323780.jpg';
import Header from '../Header/Header';
import Page from '../Page/Page';

export default function FrontCover({ theme, title, imgObj }) {
    console.log("IMG OBJ : ", imgObj);
    return (
        <Page className="frontCover" theme={theme}>
            <div className="desc">
                <div className="title">{title}</div>
                <div className="data">Objekt: 16068 | Neusserkoppelstraße 29 a | 26486&nbsp;Wangerooge | 779.000,00 € </div>
            </div>
            <div className="pic" >
                <div className="picHolder" style={{
                    backgroundImage: `url(${imgObj.uri})`
                }}>

                </div>
                {imgObj.headline && <div className="headline">
                    {imgObj.headline}
                    {imgObj.description && <div className="description">
                        {imgObj.description}
                    </div>}
                </div>}
            </div>
        </Page>
    );
}