import React from 'react'
import './FactSheet.scss';
import Page from '../Page/Page';
import { getBaseTheme } from '../../styles/IEXTheme'
import FactSheet from './FactSheet';

export default function SmartFactSheet({ theme, title, anchor, children }) {
    const mytheme = theme ? theme : getBaseTheme();
    // 25 points per page? 30 chars per point?
    const POINTS_PER_PAGE=25;
    var pages=[];
    var page=[];
    // var nPages=Math.ceil(children.length/l);
    var p=0;
    children.filter(child=>child.props.label).map(child=>{
        p+=child.props && child.props.value && (Math.ceil((""+child.props.value).length/30)) || 1;
        // console.log(`${child.props.label} ${p} points so far for a total of ${children.length}`)
        if (p>POINTS_PER_PAGE){
            const t=pages.length===0?title:undefined
            pages.push(
                <FactSheet title={t} theme={theme}>
                    {page}
                </FactSheet>
            );
            page=[];
            p=0;
        }
        page.push(child);
    });
    if (page.length>0){
        const t=pages.length===0?title:undefined
        pages.push(
            <FactSheet title={t} theme={theme}>
                {page}
            </FactSheet>
        );
    }

    // console.log(`${pages.length} pages`)
    return (
        <div ref={anchor}>
            {
                pages
            }
        </div>
    );
}