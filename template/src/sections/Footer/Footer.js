import React from 'react'
import './Footer.scss';
import { css, cx } from 'emotion'

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
                    <div className="name">Muster &amp; Beispiel Immobilien</div>
                    <div className="info">
                        <span className="label">Büro Wangerooge:</span>
                        <span className="value">Holzstraße. 28c | 26486&nbsp;Wangerooge | T (04469) 90 99 999 | F (04469) 90 99 888</span>
                    </div>
                    <div className="info">
                        <span className="label">Büro Köln:</span>
                        <span className="value">Holweider Str. 2a | 51065 Köln | T (0221) 99 59 00 | F (0221) 99 59 00</span>
                    </div>
                    <div className="info">
                        <span className="label">Homepage:</span>
                        <span className="value">www.muster-beispiel.de | Mail: anfragen@muster-beispiel.de</span>
                    </div>
                </div>
            </div>
        </div>
    );
}