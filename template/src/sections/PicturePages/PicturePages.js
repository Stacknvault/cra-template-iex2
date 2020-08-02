import React from 'react'
import PicturePage from './PicturePage';
import './PicturePages.scss';

export default function PicturePages({theme, imgObjs}) {
    // const photos = [
    //     {
    //         url: "https://www.pexels.com/photo/534172/download/?search_query=&tracking_id=zq1e8vodlv",
    //         description: "The Dinning Room"
    //     },
    //     {
    //         url: "https://www.pexels.com/photo/534151/download/?search_query=&tracking_id=zq1e8vodlv",
    //         description: "The Kitchen"
    //     },
    //     {
    //         url: "https://www.pexels.com/photo/534172/download/?search_query=&tracking_id=zq1e8vodlv",
    //         description: "The Dinning Room"
    //     },
    //     {
    //         url: "https://www.pexels.com/photo/534151/download/?search_query=&tracking_id=zq1e8vodlv",
    //         description: "The Kitchen"
    //     },
    // ];

    const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );

    const chunks = chunk(imgObjs, 2);

    return (
        <>
            {chunks.map((lilChunk, idx) => {
                return (
                    <PicturePage key={idx} theme={theme} className="2Place" photos={lilChunk} />
                );
            })}
        </>
    );
}