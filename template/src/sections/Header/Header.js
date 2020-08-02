import React from 'react'
import './Header.scss';
import { css } from 'emotion';
import { basetheme } from '../../styles/IEXTheme'
import { ffmap } from '../../lib/Context'

export default function Header({theme, className}) {
    const mytheme = theme ? theme : basetheme;
    return (
        <div className={`logo header ${className}`}>
            <div className={"shield "+css`
                 background-color: ${mytheme.brand.colors.primary};
                 color: ${mytheme.brand.colors.primaryText};
            `}><img src={ffmap`company.logo.url`} className={css`
            max-width: 100%;
            max-height: 80%;
        `} /></div>
            <div className="text1">{ffmap`company.companyName`}</div>
            <div className="text2">Immobilien</div>
        </div>
    );
}