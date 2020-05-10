import React from "react"
import '../App.css'

let BeginPoint = ({rPosition, styleInfo, textInfo, ballSize, barWidth, show}) => 
  <div className='PointContainer' style={{
    height: (parseInt(styleInfo.height.trim('px')) + 24 + 24),
    display: `${show == "true" ? "block" : "none"}`,
    position: 'absolute',
    right: rPosition,
    bottom: '0',
    padding: "0px 8px"
  }}>
    <div style={{padding: "0px", margin: "0px", fontSize: styleInfo.fontFamily, fontFamily: styleInfo.fontFamily, color: styleInfo.color, fontWeight: "bold" }}>{textInfo}</div>
    <div className="startFlag" style={{
      backgroundColor: styleInfo.backgroundColor,
      width: "24px",
      height: "24px",
      borderRadius: `${ballSize}px`,
      margin: "auto" 
    }} />
    <div style={{
      height: styleInfo.height,
      width: `${barWidth}px`,
      margin: 'auto',
      background: styleInfo.backgroundColor,
    }} />
  </div>

export default BeginPoint