import React from 'react'

let TitleImage = ({imageURL, styleInfo}) => 
  <div style={{
    padding: styleInfo.padding,
    height: styleInfo.height,
    width: styleInfo.height,
    margin: "auto"
  }}>
    <img 
      src={imageURL} 
      style={{width: "100%", position: "relative", display: "block"}}
      />
  </div> 

export default TitleImage