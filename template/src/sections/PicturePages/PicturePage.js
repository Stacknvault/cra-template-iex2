import React from 'react'
import Page from '../Page/Page';
import { css } from 'emotion'
import { basetheme } from '../../styles/IEXTheme'


export default function PicturePage({ theme, photos, className }) {
    const mytheme = theme ? theme : basetheme;
    return (
        <Page theme={theme} className="picturePage">
            <div className={`pictureFrame ${className}`}>
                {photos.map(photoObj => {
                    return (
                        <div key={photoObj.url} className="place">
                            <div className="picHolder" style={{
                                backgroundImage: `url(${photoObj.url})`
                            }}></div>
                            {/* className="description" */}
                            <div className={"description " + css`
                                background-color: ${mytheme.brand.colors.primary};
                            `}>{photoObj.description}</div>
                        </div>
                    );
                })}
            </div>
        </Page>
    );
}