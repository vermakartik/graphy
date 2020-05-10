import React from 'react'

let TitleText = ({text, styleInfo}) => (
    <div style={{
        textAlign: "center",
    }}>
        <p style={{
            display: "inline-block",
            text: "center",
            fontSize: styleInfo.textSize,
            padding: styleInfo.padding,
            backgroundColor: `${styleInfo.backgroundColor}`,
            borderRadius: styleInfo.borderRadius,
            fontFamily: styleInfo.fontFamily,
            color: `${styleInfo.textColor}`
        }}>
            {text}
        </p>
    </div>
) 

export default TitleText
    
