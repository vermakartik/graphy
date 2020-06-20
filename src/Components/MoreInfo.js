import React from 'react'
import { splitUp } from './Utils'

const MoreInfo = ({moreInfoText, styleInfo}) => {


    return (
        <div style={{
            background: styleInfo.background,
            textAlign: "center",
            position: "absolute",
            width: "100%",
            ...styleInfo
        }}>
            {
                splitUp(moreInfoText)
            }
        </div>
    )
}

export default MoreInfo