import React from 'react'
import './Header.scss';
import { css } from 'emotion';
import { getBaseTheme } from '../../styles/IEXTheme'
import { ffmap } from '../../lib/Context'

export default function Header({theme, className}) {
    const mytheme = theme ? theme : getBaseTheme();
    return (
        <div className={`header ${className}`}>
            <div className="text1">{ffmap`company.companyName`}</div>
            {ffmap`company.logo.url` &&<div className={"shield"}><img src={ffmap`company.logo.url`} className={css`
            max-width: 100%;
            max-height: 80%;
        `} /></div>}
        </div>
    );
}