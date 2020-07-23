import React from 'react'
import Page from '../Page/Page';

export default function TextPage({ theme, title, children }) {
    return (
        <Page theme={theme} title={title} withMargin={true}>
            {children}
        </Page>
    );
}