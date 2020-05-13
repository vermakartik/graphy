import React from 'react'

let TitleImage = ({imageURL, styleInfo}) => 
  <div style={{
    padding: styleInfo.padding,
    height: styleInfo.height,
    width: styleInfo.height,
    margin: "auto",
    borderRadius: styleInfo.borderRadius,
    overflow: "hidden"
  }}>
    <img 
      src={imageURL} 
      className="title_image_string"
      />
  </div> 

export default TitleImage