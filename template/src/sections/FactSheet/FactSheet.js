import React from 'react'
import './FactSheet.scss';
import Page from '../Page/Page';
import { basetheme } from '../../styles/IEXTheme'

export default function FactSheet({ theme, title, children }) {
    const mytheme = theme ? theme : basetheme;
    return (
        <Page className="factSheet" theme={theme} title={title} withMargin={true}>
            <div className="dataTable">
                {children}
            </div>
        </Page>
    );
}