import React from 'react'
import Page from '../Page/Page';
import { css } from 'emotion'
import { getBaseTheme } from '../../styles/IEXTheme'


export default function PicturePage({ theme, photos, className }) {
    const mytheme = theme ? theme : getBaseTheme();
    // console.log('==>photos', photos)
    return (
        <Page theme={theme} className="picturePage">
            <div className={`pictureFrame ${className}`}>
                {photos.map(photoObj => {
                    return (
                        <div key={photoObj.uri} className="place">
                            <div className="picHolder" 
                            // style={{
                            //     backgroundImage: `url(${photoObj.uri})`
                            // }}
                            >
                                <img width="100%" src={photoObj.uri}/>
                            </div>
                            {/* className="description" */}
                            <div className={"description " + css`
                                background-color: ${mytheme.brand.colors.primary};
                            `}>{photoObj.headline}</div>
                        </div>  
                    );
                })}
            </div>
        </Page>
    );
}