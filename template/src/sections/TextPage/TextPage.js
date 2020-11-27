import React from 'react'
import Page from '../Page/Page';

export default function TextPage({ theme, title, anchor, children }) {
    if (children.props.source){
        return (
            <Page anchor={anchor} theme={theme} title={title} withMargin={true} header={false} footer={false}>
                {children}
            </Page>
        );
    }else{
        return(<></>);
    }
}