import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Instructions from './Components/Instructions'
import Player from './Components/Player'
import Settings from './Components/Settings'
import Data from './Components/Data'
import Footer from './Components/Footer'

let Tabbed = ({tabs, currentTab, OnChangeTab}) => {

  return (
    <div className="container-fluid" style={{zIndex: 10}}>
      <div className="row">
        {
          tabs.map((v, i) => {
            return <div className={`tab-normal ${currentTab == i ? "tab-selected": "tab"}`} key={i} onClick={(e) => OnChangeTab(i)}>{v}</div>
          }) 
        }   
      </div>
    </div>
  )
  
}

let App = () => {

  let [currentTab, setCurrentTab] = useState(2)
  let [currentSettings, setCurrentSettings] = useState({
    infoStyleInfo: {
      width: '128px',
      prefix: "years old",
      evaluator: 'date_evaluator_since_today'
    },
    titleTextStyleInfo: {
      padding: "2px 10px",
      backgroundColor: "#7d6e4f8a",
      borderRadius: "4px",
      fontWeight: "100",
      fontFamily: "Space Mono",
      color: "#ffc670",
      fontSize: "12px"
    },
    imageStyleInfo: {
      padding: "10px",
      width: '96px',
      height: "96px",
      borderRadius: "4px",
      backgroundColor: "#0000002f",
      marginBottom: "12px"
    },
    timeStyleInfo:{
      textAlign: "center",
      fontFamily: "Space Mono",
      fontSize: "14px",
      fontWeight: "100",
      color: "#4287f5",
      marginBottom: "12px"
    },
    barStyleInfo: {
      borderRadius: "0px",         
      barWidth: "24px",
      backgroundColor: "#4287f5",
      height: "128px"
    },
    beginPointInfo: {
      textInfo: "Today",
      ballSize: "12",
      barWidth: "4",
      show: "true"
    },
    moreInfo: {
      backgroundColor: "#ffc670",
      padding: "0px 0px",
      fontFamily: "Space Mono",
      fontSize: "12px",
      bottom: "12px",
      borderRadius: "4px",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "#e9b362",
      color: "#000000cf",
      fontWeight: "bold"
    },
    evalInfo: {
      evaluator: "date",
    },
    evalConfig: {
      prefix: "",
      suffix: "",
      applyFormat: "true"
    },
    playerState: {
      maxCount: 6,
      delay: 50,
      backgroundColor: "#00000000",
      hTransitionTime: "500ms" 
    }
  })

  let [currentData, setCurrentData] = useState(null)

  let handleChangeSettings = (k1, k2, v) => {
    console.log(`Called Handle Change with : ${k1} | ${k2} | ${v}`);
    setCurrentSettings({
      ...currentSettings,
      [k1]: {
        ...currentSettings[k1],
        [k2]: `${v}`
      }
    })
    console.log(`Current Settings: ${currentSettings}`)
  }

  let ToRender = null

  switch(currentTab) {
    case 0: ToRender = <Player currentData={currentData} styleInfo={currentSettings} />; break;
    case 1: ToRender = <Data currentData={currentData} onChangeFileName={(d) => setCurrentData(d)} />; break;
    case 2: ToRender = <Settings cs={currentSettings} onChangeSettings={handleChangeSettings}/>; break;
    case 3: ToRender = <Instructions />
  }

  return (
    <>
        <div style={{display: "flex", alignItems: "stretch"}} className="tab-container">
            <span className="graphy-title"> Graphy<sup className="adv_title">&#x03B1;</sup></span>
            <Tabbed 
              tabs={["Play", "Data", "Settings", "Instructions"]}
              currentTab={currentTab}
              OnChangeTab={(index) => setCurrentTab(index)}
            />
            {/* <div className="tab-container-blur" /> */}
        </div>
      {ToRender}
      <Footer />
    </>
  )
}
  
export default App;
