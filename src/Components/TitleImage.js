import React from 'react'

let TitleImage = ({imageURL, styleInfo}) => 
  <div style={{
    position: 'relative',
    padding: styleInfo.padding,
    height: styleInfo.height,
    width: styleInfo.width,
    margin: "auto",
    marginBottom: styleInfo.marginBottom,
    background: styleInfo.backgroundColor,
    borderRadius: styleInfo.borderRadius,
    overflow: "hidden"
  }}>
    <img 
      src={imageURL} 
      className="title_image_string"
      />
  </div> 

export default TitleImage