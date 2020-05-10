import React from 'react'
import TitleText from './TitleText'
import TitleImage from './TitleImage'
import TInfo from './TInfo'
import Bar from './Bar'
import MoreInfo from './MoreInfo'

let InfoCard = ({
    infoStyleInfo,
    titleInfo,
    imageInfo, 
    timeInfo,
    barInfo,
    rPosition,
    moreInfo,
    renderMoreInfo
  }) => 
    <div style={{
      display: "block",
      width:`${infoStyleInfo.width}`,
      position: "absolute",
      right: rPosition,
      bottom: '0px'
    }}>
      <TitleText {...titleInfo}/>
      <TitleImage {...imageInfo} />
      <TInfo {...timeInfo} />
      <Bar {...barInfo} />
      {renderMoreInfo ? <MoreInfo {...moreInfo} /> : <></>}
    </div> 

export default InfoCard