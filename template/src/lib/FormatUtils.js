import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'

const ffmd = (mdtext) => {
    return <ReactMarkdown source={mdtext} />
}

export {ffmd}