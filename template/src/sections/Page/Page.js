import React from 'react'
import './page.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { css } from 'emotion';
import { basetheme } from '../../styles/IEXTheme'

export default function Page({ theme, className, title, withMargin, backgroundComp, children }) {
    const mytheme = theme ? theme : basetheme;

    function renderTitle(title) {
        if (title)
            return <h1 className={css`
                        color: ${mytheme.brand.colors.primary}
                    `}>{title}</h1>
        else
            return undefined;
    }

    return (
        <div className={"sheet page " + css`
            background-color: ${mytheme.brand.colors.background};
            color: ${mytheme.brand.colors.baseText};
        `}>
            {backgroundComp && backgroundComp}
            <Header theme={theme} />
            <div className={`content ${className}`}>
                {withMargin ?
                    <div className="withMargin">{renderTitle(title)}{children}</div>
                    :
                    <>{renderTitle(title)}{children}</>
                }
            </div>
            <Footer theme={theme} />
        </div>
    );
}