import React from 'react'
import { basetheme } from '../../styles/IEXTheme'
import { css, injectGlobal } from 'emotion';

export default function Fact({ theme, label, value }) {
    const mytheme = theme ? theme : basetheme;
    const rowClass = css`
        // row class
    `;
    const altRow = `.${rowClass}:nth-child(even) {background-color: ${theme.brand.colors.alternateRow};}`;
    console.log("ALT ROW : ",altRow);
    injectGlobal`${altRow}`

    return (
        <div className={['row',rowClass].join(' ')}>
            <div className="label">{label}</div>
            <div className="value">{value}</div>
        </div>
    );
}