import React from 'react'
import { Transition } from 'react-transition-group';

let Bar = ({currentHeight, styleInfo, animateInfo, dummyBar = false}) => 
  dummyBar ? 
  <div style={{
      width: styleInfo.barWidth,
      margin: "auto",
      background: `${styleInfo.backgroundColor}`,
      borderTopLeftRadius: styleInfo.borderRadius,
      borderTopRightRadius: styleInfo.borderRadius,
      height: currentHeight
    }} />:
  <Transition
      in={animateInfo.in}
      timeout={animateInfo.timeout}
      onEntered={() => animateInfo.ExitAnimation()}
      exit={false}  
    >{
      (state) => {

        console.log(state)
        console.log(animateInfo)

        return <div style={{
                ...animateInfo.cDefs,
                ...animateInfo.cStyles[state],
                width: styleInfo.barWidth,
                margin: "auto",
                background: `${styleInfo.backgroundColor}`,
                borderTopLeftRadius: styleInfo.borderRadius,
                borderTopRightRadius: styleInfo.borderRadius,
              }} />
      }
    }
      
  </Transition>

export default Bar