import React from 'react'
import { basetheme } from '../../styles/IEXTheme'
import { css, injectGlobal } from 'emotion';
import Moment from 'moment';
import { currency } from '../../lib/FormatUtils';

export default function Fact({ type, theme, label, value }) {
    const mytheme = theme ? theme : basetheme;
    const valuePresent = value && ((''+value).indexOf('undefined')<0);
    const rowClass = css`
        // row class
    `;
    const altRow = `.${rowClass}:nth-child(even) {background-color: ${theme.brand.colors.alternateRow};}`;
    injectGlobal`${altRow}`
    var v = value;
    if (valuePresent){
        if (type === 'date'){
            v=Moment(new Date(value*1000)).format('DD/MM/yyyy');
        }else if (type === 'currency'){
            v=currency(value);
        }
    }
    return (
        <>
            {valuePresent &&
            <div className={['row',rowClass].join(' ')}>
                <div className="label">{label}</div>
                <div className="value">{v}</div>
            </div>
            }
        </>
    );
}