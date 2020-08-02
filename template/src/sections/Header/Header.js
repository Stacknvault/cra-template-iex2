import React from 'react'
import './Header.scss';
import { css } from 'emotion';
import { basetheme } from '../../styles/IEXTheme'


export default function Header({theme, className}) {
    const mytheme = theme ? theme : basetheme;
    return (
        <div className={`logo header ${className}`}>
            <div className={"shield "+css`
                 background-color: ${mytheme.brand.colors.primary};
                 color: ${mytheme.brand.colors.primaryText};
            `}>M / B</div>
            <div className="text1">Muster &amp; Beispiel</div>
            <div className="text2">Immobilien</div>
        </div>
    );
}