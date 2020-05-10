import React from 'react'

let TInfo = ({timeText, styleInfo}) => {

    return <div style={{
         textAlign: "center",
         fontFamily: styleInfo.fontFamily,
         fontSize: styleInfo.fontSize,
         color: `${styleInfo.textColor}`,
         fontWeight: "bold",
         marginBottom: styleInfo.marginBottom,
       }}>
       {timeText}
     </div>
   }

export default TInfo;