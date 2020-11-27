import React from 'react'
import './page.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { css } from 'emotion';
import { getBaseTheme } from '../../styles/IEXTheme'

export default function Page({ theme, className, title, withMargin, backgroundComp, children, header, footer, anchor }) {
    const mytheme = theme ? theme : getBaseTheme();

    function renderTitle(title) {
        if (title)
            return <h1 className={css`
                        color: ${mytheme.brand.colors.primary}
                    `}>{title}</h1>
        else
            return undefined;
    }

    return (
        <div ref={anchor} className={"sheet page " + css`
            background-color: white;
            color: #808080;
        `}>
            {backgroundComp && backgroundComp}
            <Header className={header?"showOnScreen":"hideOnScreen"} theme={theme} />
            <div className={`content ${className}`}>
                {withMargin ?
                    <div className="withMargin">{renderTitle(title)}{children}</div>
                    :
                    <>{renderTitle(title)}{children}</>
                }
            </div>
            <Footer className={footer?"showOnScreen":"hideOnScreen"} theme={theme} />
        </div>
    );
}