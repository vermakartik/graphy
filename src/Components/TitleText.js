import React from 'react'
import { splitUp } from './Utils'

let TitleText = ({text, styleInfo}) => (
    <div style={{
        textAlign: "center",
    }}>
        <p style={{
            display: "inline-block",
            text: "center",
            ...styleInfo
        }}>
            {splitUp(text)}
        </p>
    </div>
) 

export default TitleText
    
