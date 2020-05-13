import React from 'react'
import { splitUp } from './Utils'

const MoreInfo = ({moreInfoText, styleInfo}) => {


    return (
        <div style={{
            background: styleInfo.background,
            textAlign: "center",
            padding: styleInfo.padding,
            borderRadius: styleInfo.borderRadius,
            position: "absolute",
            width: "100%",
            bottom: styleInfo.bottom,
            fontFamily: styleInfo.fontFamily,
            fontSize: styleInfo.fontSize,
            color: styleInfo.color,
            borderWidth: styleInfo.borderWidth,
            borderStyle: styleInfo.borderStyle,
            borderColor: styleInfo.borderColor,
            fontWeight: styleInfo.fontWeight
        }}>
            {
                splitUp(moreInfoText)
            }
        </div>
    )
}

export default MoreInfo