import React from 'react'
import Page from '../Page/Page';
import './AgentDetail.scss';
import { ffmap } from '../../lib/Context'
import { css } from 'emotion';

export default function AgentDetail({ theme }) {
    return (
        <Page theme={theme} withMargin={true} title="IHR ANSPRECHPARTNER">
            <div className="agentDetail">
                <div className="lhs">
                    <img src={ffmap`sender.image.url`} className={css`
                            max-width: 100%;
                        `} />
                </div>
                <div className="rhs">
                    <h3>{ffmap`sender.salutation${'Herr'}`} {ffmap`sender.firstName`} {ffmap`sender.lastName`}</h3>
                    {ffmap`sender.position` && <div>Position : {ffmap`sender.position`}</div>}
                    {ffmap`sender.phone` && <div>Phone : {ffmap`sender.phone`}</div>}
                    {ffmap`sender.mobile` && <div>Mobile : {ffmap`sender.mobile`}</div>}

                    <div>
                        {ffmap`company.companyStreet`}&nbsp;
                        {ffmap`company.companyPostcode`}&nbsp;{ffmap`company.companyCity`}&nbsp;
                        {ffmap`company.companyUrl`}
                    </div>

                </div>
                <div className="span">

                </div>
            </div>
        </Page>
    );
}