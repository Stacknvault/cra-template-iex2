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
                    <img src='https://www.pexels.com/photo/1138903/download/?search_query=professional&tracking_id=zq1e8vodlv' className={css`
                            max-width: 100%;
                        `} />
                </div>
                <div className="rhs">
                    <h3>{ffmap`sender.salutation${'Herr'}`} {ffmap`sender.firstname`} {ffmap`sender.lastname`}</h3>
                    {ffmap`sender.position` && <div>Position : {ffmap`sender.position`}</div>}
                    {ffmap`sender.phone` && <div>Phone : {ffmap`sender.phone`}</div>}
                    {ffmap`sender.mobile` && <div>Mobile : {ffmap`sender.mobile`}</div>}

                    <div>
                        {ffmap`company.companyStreet`}
                        {ffmap`company.companyPostcode`}  {ffmap`company.companyCity`}
                        {ffmap`company.companyUrl`}
                    </div>

                </div>
                <div className="span">

                </div>
            </div>
        </Page>
    );
}