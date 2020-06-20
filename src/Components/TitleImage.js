import React from 'react'

let TitleImage = ({imageURL, styleInfo}) => 
  <div style={{
    position: 'relative',
    margin: "auto",
    ...styleInfo,
    overflow: "hidden"
  }}>
    <img 
      src={imageURL} 
      className="title_image_string"
      />
  </div> 

export default TitleImage