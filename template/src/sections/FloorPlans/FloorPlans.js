import React from 'react'
import Page from '../Page/Page';
import { getBaseTheme } from '../../styles/IEXTheme'
import { css } from 'emotion';

export default function FloorPlans({ theme, imgObjs }) {
    const mytheme = theme ? theme : getBaseTheme();
    console.log("imgObjs : ",imgObjs);
    return (
        <>
            { imgObjs && imgObjs.map && imgObjs.map((plan, idx) => {
                return (
                    <Page key={plan.uri + plan.headline} theme={theme} withMargin={true} title={idx === 0 ? "Grundrisse" : undefined}>
                        <div className="plan">
                            <img src={plan.uri} className={css`
                                max-width: 100%;
                                max-height: 80%;
                            `} />
                            <div className={css`
                                font-weight: 600;
                            `}>{plan.headline}</div>
                            <div>{plan.description}</div>
                        </div>
                    </Page>
                );
            })}
        </>
    );
}