import React, { useContext } from 'react'
import './FrontCover.scss'
import { ffmap, ContextStore } from '../../lib/Context'
//
import HeroImage from '../../mock/pics/modern-building-against-sky-323780.jpg';
import Header from '../Header/Header';
import Page from '../Page/Page';
import { currency } from '../../lib/FormatUtils';

export default function FrontCover({ theme, title, imgObj }) {
    // console.log("IMG OBJ : ", imgObj);
    const iexContext = useContext(ContextStore);
    // console.log('iexContext', iexContext);
    const addressStreet = ffmap`entity.addresses..street`
    // console.log("IMG OBJ : ", imgObj, addressStreet);
    const addressStr = addressStreet ? (`${addressStreet} | ${ffmap`entity.addresses..zipcode`} ${ffmap`entity.addresses..city`}`):( ffmap`entity.street`);
    const frontCoverText = `Objekt: ${ffmap`entity.identifier`} | ${addressStr} | ${ffmap`entity.purchaseprice` ? currency(ffmap`entity.purchaseprice`) : ''}${ffmap`entity.rent` ? currency(ffmap`entity.rent`) : ''} `
    return (
        <Page className="frontCover" theme={theme}>
            <div className="desc">
                <div className="title">{title}</div>
                <div className="data">{frontCoverText}</div>
            </div>
            {imgObj &&
            <div className="pic" >
                <div className="picHolder"
                // style={{
                //     backgroundImage: `url(${imgObj.uri})`
                // }}
                >
                    <img width="100%" src={imgObj.uri}/>
                </div>
                {imgObj.headline && <div className="headline">
                    {imgObj.headline}
                    {imgObj.description && <div className="description">
                        {imgObj.description}
                    </div>}
                </div>}
            </div>
            }
        </Page>
    );
}