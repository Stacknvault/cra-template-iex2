import React from 'react'
import Page from '../Page/Page';
import { css } from 'emotion'
import { getBaseTheme } from '../../styles/IEXTheme'


export default function PicturePage({ theme, photos, className, title }) {
    const mytheme = theme ? theme : getBaseTheme();
    // console.log('==>photos', photos)
    return (
        <Page withMargin={true} title={title} theme={theme} className="picturePage" header={false} footer={false}>
            <div className={`pictureFrame ${className}`}>
                {photos.map(photoObj => {
                    return (
                        <div key={photoObj.uri} className="place">
                            <div className="picHolder" 
                            // style={{
                            //     backgroundImage: `url(${photoObj.uri})`
                            // }}
                            >
                                <img className="picImg" src={photoObj.uri}/>
                            </div>
                            {/* className="description" */}
                            {photoObj.headline && <div className={"description " + css`
                                background-color: ${mytheme.brand.colors.primary};
                            `}>{photoObj.headline}</div>}
                        </div>  
                    );
                })}
            </div>
        </Page>
    );
}