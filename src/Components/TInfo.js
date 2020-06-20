import React from 'react'

let TInfo = ({timeText, styleInfo}) => {

    return (<div style={{
        textAlign: "center",
        ...styleInfo
      }}>
      {timeText}
    </div>)
  }

export default TInfo;