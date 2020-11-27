import React from 'react'
import './FactSheet.scss';
import Page from '../Page/Page';
import { getBaseTheme } from '../../styles/IEXTheme'

export default function FactSheet({ theme, title, children }) {
    const mytheme = theme ? theme : getBaseTheme();
    return (
        <Page className="factSheet" theme={theme} title={title} withMargin={true} header={false} footer={false}>
            <div className="dataTable">
                {children}
            </div>
        </Page>
    );
}