import React from 'react'
import MoverContainer from './MoverContainer'

let Player = ({currentData, styleInfo}) => {

    return (
        <div style={{background: styleInfo.playerState.backgroundColor, height: "80vh", position: 'relative', overflowX: "hidden", overflowY: "hidden"}}>
            <MoverContainer currentData={currentData} styleInfo={styleInfo} />
        </div>
    )

}

export default Player