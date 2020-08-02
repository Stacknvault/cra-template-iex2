import React from 'react'
import './Footer.scss';
import { css, cx } from 'emotion'
import { ffmap } from '../../lib/Context'

export default function Footer({theme}) {
    const colors = theme && theme.brand && theme.brand.colors ? theme.brand.colors : 
        {primary: '#000', secondary: '#333', secondaryText: '#ffffff'} 

    return (
        <div className={"footerWrapper "+css`
            border-top: 1mm solid ${colors.primary};
        `}>
            <div className={"footer "+css`
                 background-color: ${colors.secondary};
                 color: ${colors.secondaryText};
            `}>
                <div>
                    <div className="name">{ffmap`company.companyName`} Immobilien</div>
                    <div className="info">
                        <span className="label">{ffmap`company.companyName`}:</span>
                        <span className="value">{ffmap`company.companyStreet`} | {ffmap`company.companyPostcode`}&nbsp;{ffmap`company.companyCity`} | T {ffmap`company.companyPhoneInfo`} {ffmap`company.companyFax` && `| F ${ffmap`company.companyFax`}`}</span>
                    </div>
                    {/* <div className="info">
                        <span className="label">Büro Köln:</span>
                        <span className="value">Holweider Str. 2a | 51065 Köln | T (0221) 99 59 00 | F (0221) 99 59 00</span>
                    </div> */}
                    <div className="info">
                        <span className="label">Homepage:</span>
                        <span className="value">{ffmap`company.companyUrl` && (ffmap`company.companyUrl`).replace('http://', '').replace('https://', '')} | Mail: {ffmap`company.companyMailInfo`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}