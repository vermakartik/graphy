import React, { useState, useEffect, useRef } from 'react';
import LogoImage from './assets/logo.png';
import './App.css';
import Instructions from './Instructions'
import { Transition } from 'react-transition-group';

const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();

const fontList = {
    "digit":"digit",
    "Alfa Slab One":"Alfa Slab One",
    "arcadeclassic":"arcade Classic",
    "AudioWide":"AudioWide",
    "Bangers":"Bangers",
    "Black Ops One":"Black Ops One",
    "bubblebath":"bubblebath",
    "Cabin Sketch":"Cabin Sketch",
    "Caveat":"Caveat",
    "Disposable Droid":"Disposable Droid",
    "Dotty":"Dotty",
    "Gochi Hand":"Gochi Hand",
    "joystix":"joystix",
    "luckiest guy":"luckiest guy",
    "monoton":"monoton",
    "Oxanium":"Oxanium",
    "Pacifio":"Pacifio",
    "pix-pixel":"pix-pixel",
    "pixel":"pixel",
    "Press Start":"Press Start",
    "Righteous": "Righteous",
    "Comfortaa": "Comfortaa",
    "Sayso chich":"Sayso chich",
    "Sfpixelate":"Sfpixelate", 
    "Subway Ticker":"Subway Ticker",
}

let TitleText = ({text, styleInfo}) => 
  <div style={{
      textAlign: "center",
  }}>
    <p style={{
      display: "inline-block",
      text: "center",
      padding: styleInfo.padding,
      backgroundColor: `${styleInfo.backgroundColor}`,
      borderRadius: styleInfo.borderRadius,
      fontFamily: styleInfo.fontFamily,
      color: `${styleInfo.textColor}`
    }}>
      {text}
    </p>
  </div>

let TitleImage = ({imageURL, styleInfo}) => 
  <div style={{
    padding: styleInfo.padding,
  }}>
    <img 
      src={imageURL} 
      style={{width: "100%", position: "relative", display: "block"}}
      />
  </div> 

let TimeInfo = ({timeText, styleInfo}) => {

 return <div style={{
      textAlign: "center",
      fontFamily: styleInfo.fontFamily,
      fontSize: styleInfo.fontSize,
      color: `${styleInfo.textColor}`,
      fontWeight: "bold",
      marginBottom: styleInfo.marginBottom,
    }}>
    {timeText}
  </div>
}

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

let InfoCard = ({
  infoStyleInfo,
  titleInfo,
  imageInfo, 
  timeInfo,
  barInfo,
  rPosition
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
    <TimeInfo {...timeInfo} />
    <Bar {...barInfo} />
  </div> 

let BeginPoint = ({rPosition, styleInfo}) => 
  <div className='PointContainer' style={{
    height: (parseInt(styleInfo.height.trim('px')) + 24 + 24),
    display: 'block',
    position: 'absolute',
    right: rPosition,
    bottom: '0',
    padding: "0px 8px"
  }}>
    <div style={{padding: "0px", margin: "0px", fontSize: styleInfo.fontFamily, fontFamily: styleInfo.fontFamily, color: styleInfo.color, fontWeight: "bold" }}>Today</div>
    <div className="startFlag" style={{
      backgroundColor: styleInfo.backgroundColor,
      width: "24px",
      height: "24px",
      borderRadius: '12px',
      margin: "auto" 
    }} />
    <div style={{
      height: styleInfo.height,
      width: '4px',
      margin: 'auto',
      background: styleInfo.backgroundColor,
    }} />
  </div>

function useInterval(callback, delay, srs) {
  const savedCallback = useRef();
  const [isRunning, setRunning] = useState(srs)
  const [currentInterval, setCurrentInterval] = useState(null)
  const [cDelay, setDelay] = useState(delay)
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if(isRunning == false) {
      if(currentInterval != null) {
        clearInterval(currentInterval)
        setCurrentInterval(null)
      }
    } else {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, cDelay);
        setCurrentInterval(id)
        return () => clearInterval(id);
      }
    }
  }, [cDelay])
  
  useEffect(() => {
    if(isRunning == false) {
      if(currentInterval != null) {
        clearInterval(currentInterval)
        setCurrentInterval(null)
      }
    } else {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, cDelay);
        setCurrentInterval(id)
        return () => clearInterval(id);
      }
    }
  }, [isRunning])
  
  return {isRunning, cDelay, setRunning, setDelay}

}

let inDays = (ct) => {
  return parseInt(ct / (1000 * 60 * 60 * 24))
} 

let asString = (d) => {
  if(d < 365) return `${d} days old`
  let years = parseInt(d / 365)
  let dys = d % 365
  let dString = d > 0 ? `${dys} days old` : "old"
  return `${years} y ${dString}`
}

let evaluateRelativeStrength = (k1, k2, bs, mx) => {
  let v = ((k2 - k1) / (k2 - bs)) * mx
  console.log(`${k1} ${k2} ${bs} ${mx} Val: ${v}`)
  return v;
}

let toTimeText = (cd) => {
  return asString(inDays(today) - inDays(new Date(cd.data[2]).getTime()))
}

let evaluateHeight = (cd, rd, mx) => {
  console.log(cd + " " + rd + " " + mx)
  return evaluateRelativeStrength(
    inDays(new Date(cd.data[2]).getTime()),
    inDays(today),
    inDays(new Date(rd.data[2]).getTime()),
    mx
  )
}

let effectEvaluate = (data, refHeight, addFadeIn) => {
  console.log("Effect Evaluate")
  console.log(data)
  let cRef = data[data.length - 1]

  let defs = data.map(
    (item, index) => { 
      if(item.type == 0) return item
      if(index == data.length -1 ) {
        return addFadeIn ? {
          transition: `height 0.5s ease-in-out, opacity 2s ease-in`,
          height: `${0}px`, 
          opacity: 0
        } : {
          transition: `height 0.5s ease-in-out`,
          height: `${0}px` 
        } 
      } else if (index == data.length - 2) {

        return {
          transition: `height 0.5s ease-in-out`,
          height: `${refHeight}px`
        }

      } else {
        return {
          transition: `height 0.5s ease-in-out`,
          height: `${evaluateHeight(item, cRef, refHeight)}px`
        }
      }
    }
  )

  let cstyles = data.map(
  (item, index) => {
    if(item.type == 0) return item
    if(index == data.length - 1)  
    {
      return addFadeIn ? {
                entering: { height: `${refHeight}px`, opacity: 1 },
                entered: { height: `${refHeight}px`, opacity: 1 },
                exiting: { height: `${refHeight}px`, opacity: 1 },
                exited: { height: `${refHeight}px`, opacity: 1 }
              } : {
                entering: { height: `${refHeight}px` },
                entered: { height: `${refHeight}px` },
                exiting: { height: `${refHeight}px` },
                exited: { height: `${refHeight}px` }
              }
    } 
    else{
      let h = evaluateHeight(item, cRef, refHeight)
      return ({
          entering: { height: `${h}px` },
          entered: { height: `${h}px` },
          exiting: { height: `${h}px` },
          exited: { height: `${h}px` }
        })
      }
    }
  )

  return {
    defs,
    cstyles 
  }
}

let MoverContainer = ({currentData, styleInfo}) => {

  let [currentIndexToAdd, setCurrentIndexToAdd] = useState(0)
  let [maxCount, setMaxCount] = useState(6)

  let {innerWidth: wwidth, innerHeight: wheight} = window
  let wdth = (parseInt(styleInfo.infoStyleInfo.width.trim('px')) + 24)
  let maxHeight = parseFloat(styleInfo.barStyleInfo.height.trim('px'))

  let inBwMargin = parseInt((wwidth - wdth * maxCount) / maxCount)

  let [currentState, setCurrentState] = useState({
    files: [{index: 0, type: 0}],
    pos: [0],
    animateInfo: {
      defs: [null],
      cstyles: [null]
    }
  }) 
  let [animateHeights, setAnimateHeights] = useState(false)

  useEffect(() => {
    inBwMargin = parseInt((wwidth - wdth * maxCount) / maxCount)
  }, [maxCount])

  const UpdatePosition = () => {
    let nPositionData = currentState.pos.map(it => it + 1)
    let lFiles = currentState.files.map(i => i) 
    let shouldUpdateAnimateInfo = false
    let addFadeIn = false

    console.log(`Width Is: ${wdth} | nPositions: ${nPositionData} | nPositions Length: ${nPositionData[nPositionData.length-1]}`)
    
    if(nPositionData[0] >= wwidth - wdth) {       
        lFiles.shift()
        nPositionData.shift()
        shouldUpdateAnimateInfo = true
    } 
    if(nPositionData[nPositionData.length-1] > wdth + inBwMargin) {
      console.log("Statement True");
      if(currentData != null) {
        if(currentIndexToAdd < currentData.length) {
          nPositionData.push(0)
          lFiles.push({type: 1, index: currentIndexToAdd + 1, data: currentData[currentIndexToAdd]})
          setCurrentIndexToAdd(currentIndexToAdd + 1) 
          shouldUpdateAnimateInfo = true
          addFadeIn = true
        } 
      }
    } 

    if(shouldUpdateAnimateInfo) {

      let aState = effectEvaluate(lFiles, maxHeight, addFadeIn)
      console.log("Update nPositionInfo")
      console.log(nPositionData)
      console.log(lFiles)
      console.log(aState)

      setCurrentState({
        pos: nPositionData,
        files: lFiles,
        animateInfo: aState
      })
      setAnimateHeights(true)
    } else {
      setCurrentState({
        pos: nPositionData,
        files: lFiles,
        animateInfo: currentState.animateInfo
      }) 
    }
    
  }

  let handleRunChangeRequest = (nState) => {
    if(currentData == null) return
    if(currentData != null) {
      setRunning(nState)
    }
  }

  let handleReset = () => {
    setCurrentState({
      files: [{index: "row_1", type: 0}],
      pos: [0] 
    })
    setCurrentIndexToAdd(0)
  }

  let {isRunning, cDelay, setRunning, setDelay} = useInterval(UpdatePosition, 50, false)

  return (
    <div>
      <div style={{width: "100%", height:"100%", bottom: "0"}}>
        <div style={{position: "absolute", width:"100%", height: "100%"}}>
          {
            currentState.pos.length > 0 ?
            currentState.files.map((item, index) => {
              
              console.log("----Begin---")
              console.log(currentState)
              console.log("----End----")

              switch(item.type){
                case 0:
                  return <BeginPoint 
                          key={item.index}
                          rPosition={`${currentState.pos[index]}px`}
                          styleInfo={{...styleInfo.barStyleInfo, fontFamily: styleInfo.timeStyleInfo.fontFamily, color: styleInfo.timeStyleInfo.textColor, fontSize: styleInfo.timeStyleInfo.fontSize}}
                        />
                case 1:
                  return <InfoCard
                            key={item.index} 
                            rPosition={`${currentState.pos[index]}px`}
                            infoStyleInfo={styleInfo.infoStyleInfo}
                            titleInfo={{
                              text: item.data[0],
                              styleInfo: styleInfo.titleTextStyleInfo
                            }}
                            imageInfo={{
                              imageURL: item.data[1],
                              styleInfo: styleInfo.imageStyleInfo
                            }}
                            timeInfo={{
                              timeText: toTimeText(item),
                              styleInfo: styleInfo.timeStyleInfo 
                            }}
                            barInfo = {{
                              currentHeight: `${evaluateHeight(item, currentState.files[currentState.files.length - 1], maxHeight)}px`,
                              styleInfo: styleInfo.barStyleInfo,
                              animateInfo: {
                                in: animateHeights,
                                timeout: 300,
                                ExitAnimation: () => {
                                  console.log("Exiting Animation!")
                                  setAnimateHeights(false)
                                },
                                cDefs: currentState.animateInfo.defs[index],
                                cStyles: currentState.animateInfo.cstyles[index]
                              }
                            }}
                          />
              }
            }) : ""
          }
        </div>
        <div style={{position: "absolute", display: 'block', top: "8px", left: '8px'}}>
          <button className="button-play" onClick={(e) => handleRunChangeRequest(!isRunning)}>{isRunning == true ? <i class="fas fa-pause"></i> : <i class="fas fa-play"></i>}</button> 
          <button className="reset-btn" onClick={(e) => handleReset()}>Reset</button>
        </div>
      </div>
      <div style={{position: "absolute", right: "8px", top: "8px"}}>
          <div className="controller">
            <div style={{display: "inline-block", marginRight: "4px"}}><span className="label">Max Count </span><input className="simple-input-option" value={maxCount} onChange={(e) => setMaxCount(e.target.value)}/></div>
            <div style={{display: "inline-block"}}><span className="label">Spawn Interval </span><input className="simple-input-option" value={cDelay} onChange={(e) => setDelay(e.target.value)}/></div>
          </div>
      </div>
    </div>
  )
}

let Player = ({currentData, styleInfo}) => {

  return (
    <div style={{background: "#1212121f", height: "80vh", position: 'relative'}}>
      <MoverContainer currentData={currentData} styleInfo={styleInfo} />
    </div>
  )
  
}

let Tabbed = ({tabs, currentTab, args, OnChangeTab}) => {

  return (
    <div className="container-fluid">
      <div className="row tab-container">
        {
          tabs.map((v, i) => {
            return <div className={`tab-normal ${currentTab == i ? "tab-selected": "tab"}`} key={i} onClick={(e) => OnChangeTab(i)}>{v}</div>
          }) 
        }   
      </div>
    </div>
  )

}

let DataRow = ({items, rIndex}) => {
  return <tr className="cell-row">
    <td key={`row_${rIndex}`} className="cell-index">{rIndex}</td>
    {items.map((value, index) => <td className="cell-data" key={`${rIndex}_${index}`}>{value}</td>)}
  </tr>
}

let DataToTable = ({rows}) => (
  <div className="table-container">
    <table style={{width: "100%", height: "96vh"}}>
      {rows.map((r, index) => <DataRow items={r} rIndex={index} />)}
    </table>
  </div>
)

let DataArt = () => (
  <div className="data-art">
    \_(-_-)_/<br />
    <span style={{fontSize: "24px"}}>No Data. Select a File.</span>
  </div>
)

let Data = ({currentData, onChangeFileName}) => {

  let fileReader;
  let [tempFileSelect, setTempFileSelect] = useState()

  let handleFileRead = (e) => {
    const content = fileReader.result;
    SplitData(content);
  }

  let SplitData = (data) => {
    let lines = data.trim("\n").trim("\t").split("\n").
                    map(item => item.trim("\n").trim('\t').split(",").
                      map(i => i.trim(",").trim(" ").trim("\t")).
                      filter(il => il != undefined && il != "" && il.length > 0 && il != null)
                    ).filter(r => r != null && r != undefined && r != "" && r.length > 0)
    onChangeFileName(lines)                 
  }
  
  let handleTempFileSelect = (e) => {
    if(e.target.value == null || e.target.value == '' || e.target.value == undefined) return
    tempFileSelect = e.target.value;
    setTempFileSelect(e.target.value)
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(e.target.files[0])
  }

  let fPTemp = ""
  if(tempFileSelect != null && tempFileSelect.length > 0) {
    let p = tempFileSelect.split('\\');
    fPTemp = p[p.length - 1]; 
  } 

  return (
    <div>
      <div style={{padding: "8px", fontFamily: "Comfortaa"}}> 
        <input type="file" className="cfi" value={tempFileSelect} onChange={(e) => {
          handleTempFileSelect(e)
        }} />
        <span className={`${tempFileSelect != null && tempFileSelect.length > 0 ? "file-name" : ""}`}>
          {fPTemp}
        </span>
      </div>
      <div>
        {
          currentData != null ? <DataToTable rows={currentData} /> : <DataArt />
        }
      </div>
    </div>
  )
}

let Settings = ({currentSettings, onChangeSettings}) => {

  let [tempTitleText, setTempTitleText] = useState("Mario")
  let [tempUrlImage, setUrlImage] = useState("https://purepng.com/public/uploads/large/purepng.com-mariomariofictional-charactervideo-gamefranchisenintendodesigner-1701528634653vywuz.png")
  let [tempTimeText, setTempTimeText] = useState("12 Years Old")

  let ChangeSimpleInputType = (e, key1, key2) => {
    onChangeSettings(key1, key2, e.target.value)
  }

  return (
    <div className="container-fluid" style={{width: "100%"}}>
      <div className="row" style={{background: "#adadad22"}}>
        <div className="col-lg-6 col-12" style={{position: "relative", height: "80vh"}} >
          <div style={{position: "relative", display: "block", margin: "auto", paddingTop: "8px", margin: "16px 8px", borderRadius: "4px", height: "100%", width: "100%"}}>
            <div style={{position: "absolute", top: "75%", left: "50%"}}>
              <InfoCard
                rPosition="50px"
                infoStyleInfo={currentSettings.infoStyleInfo} 
                titleInfo={{
                  text: `${tempTitleText}`,
                  styleInfo: currentSettings.titleTextStyleInfo
                }}
                imageInfo={{
                  imageURL: `${tempUrlImage}`,
                  styleInfo: currentSettings.imageStyleInfo
                }}
                timeInfo={{
                  timeText:`${tempTimeText}`,
                  styleInfo: currentSettings.timeStyleInfo 
                }}
                barInfo = {{
                  currentHeight: currentSettings.barStyleInfo.height,
                  styleInfo: currentSettings.barStyleInfo,
                  dummyBar: true
                }}
              />
            </div>
          </div>
        </div>
        
        
        <div className="col-lg-6 col-12 props-panel" style={{overflowY: "scroll", height: "80vh"}}>
          <div className="col-12 " style={{background: "#adadad22", margin: "0px", padding: "0px"}}>
            <div className="title_container"><div className="title">Title Settings - </div> <input className="simple_input" type="text" value={tempTitleText} onChange={(e) => setTempTitleText(e.target.value)}/></div>
            <div>
              <ul>
                <li><div className="label" >Padding</div><div><input className="simple-input-option" type="text" value={currentSettings.titleTextStyleInfo.padding} onChange={(e) => ChangeSimpleInputType(e, "titleTextStyleInfo", "padding")} /></div></li>
                <li><div className="label">Border Radius</div><div><input className="simple-input-option" type="text" value={currentSettings.titleTextStyleInfo.borderRadius} onChange={(e) => ChangeSimpleInputType(e, "titleTextStyleInfo", "borderRadius")}/></div></li>
                <li><div className="label">Background Color</div><div><input className="simple-input-option" type="color" value={currentSettings.titleTextStyleInfo.backgroundColor} onChange={(e) => ChangeSimpleInputType(e, "titleTextStyleInfo", "backgroundColor")}/></div></li>
                <li><div className="label">Font-Family</div><div>
                  <select value={currentSettings.titleTextStyleInfo.fontFamily} onChange={(e) => ChangeSimpleInputType(e, "titleTextStyleInfo", "fontFamily")} className="simple-input-option" >
                    {
                      Object.keys(fontList).map((item, index) => <option value={item}>{item}</option>)
                    }
                  </select>
                </div></li>
                <li><div className="label">Text Color</div><div><input type="color" className="simple-input-option" value={currentSettings.titleTextStyleInfo.textColor} onChange={(e) => ChangeSimpleInputType(e, "titleTextStyleInfo", "textColor")}/></div></li>
              </ul>
            </div>
          </div>

          
          <div className="col-12" style={{margin: "0px", padding: "0px"}}>
            <div className="title_container"><div className="title">Image Settings - </div> <input style={{textOverflow: "ellipsis"}} className="simple_input" type="text" value={tempUrlImage} onChange={(e) => setUrlImage(e.target.value)}/></div>
            <div>
              <ul>
                <li><div className="label" >Padding</div><div><input className="simple-input-option" type="text" value={currentSettings.imageStyleInfo.padding} onChange={(e) => ChangeSimpleInputType(e, "imageStyleInfo", "padding")} /></div></li>
              </ul>
            </div>
          </div>

          
          <div className="col-12" style={{background: "#adadad22", margin: "0px", padding: "0px"}}>
            <div className="title_container"><div className="title">Time Settings - </div> <input className="simple_input" type="text" value={tempTimeText} onChange={(e) => setTempTimeText(e.target.value)}/></div>
            <div>
              <ul>
                <li><div className="label" >Bottom Margin</div><div><input className="simple-input-option" type="text" value={currentSettings.timeStyleInfo.marginBottom} onChange={(e) => ChangeSimpleInputType(e, "timeStyleInfo", "marginBottom")} /></div></li>
                <li><div className="label">Font Size</div><div><input className="simple-input-option" type="text" value={currentSettings.timeStyleInfo.fontSize} onChange={(e) => ChangeSimpleInputType(e, "timeStyleInfo", "fontSize")}/></div></li>
                <li><div className="label">Font-Family</div><div>
                  <select value={currentSettings.titleTextStyleInfo.fontFamily} onChange={(e) => ChangeSimpleInputType(e, "timeStyleInfo", "fontFamily")} className="simple-input-option" >
                    {
                      Object.keys(fontList).map((item, index) => <option value={item}>{item}</option>)
                    }
                  </select>
                </div></li>
                <li><div className="label">Text Color</div><div><input type="color" className="simple-input-option" value={currentSettings.timeStyleInfo.textColor} onChange={(e) => ChangeSimpleInputType(e, "timeStyleInfo", "textColor")} /></div></li>
              </ul>
            </div>
          </div>


          <div className="col-12" style={{margin: "0px", padding: "0px"}}>
            <div className="title_container"><div className="title">Bar Settings</div></div>
            <div>
              <ul>
                <li><div className="label" >Border Radius</div><div><input className="simple-input-option" type="text" value={currentSettings.barStyleInfo.borderRadius} onChange={(e) => ChangeSimpleInputType(e, "barStyleInfo", "borderRadius")} /></div></li>
                <li><div className="label">Bar Width</div><div><input className="simple-input-option" type="text" value={currentSettings.barStyleInfo.barWidth} onChange={(e) => ChangeSimpleInputType(e, "barStyleInfo", "barWidth")}/></div></li>
                <li><div className="label">Background Color</div><div><input type="color" className="simple-input-option" value={currentSettings.barStyleInfo.backgroundColor} onChange={(e) => ChangeSimpleInputType(e, "barStyleInfo", "backgroundColor")}/></div></li>
                <li><div className="label">Bar Height</div><div><input type="text" className="simple-input-option" value={currentSettings.barStyleInfo.height} onChange={(e) => ChangeSimpleInputType(e, "barStyleInfo", "height")}/></div></li>
              </ul>
            </div>
          </div>

          <div className="col-12" style={{margin: "0px", padding: "0px"}}>
            <div className="title_container"><div className="title">Card Settings</div></div>
            <div>
              <ul>
                <li><div className="label" >Card Width</div><div><input className="simple-input-option" type="text" value={currentSettings.infoStyleInfo.width} onChange={(e) => ChangeSimpleInputType(e, "infoStyleInfo", "width")} /></div></li>
              </ul>
            </div>
          </div>
        </div>
        

      </div>
    </div>
  )
}

let Footer = () => {

 return <div className="footer-container">
    <p className="footer-text">CopyRight &copy; Talex Studios. All Right Reserved - 2020.</p><br />
    <p className="footer-text">
      Follow Us On. 
      <a href="https://twitter.com/kvs1297" className="link-icon"><i class="fab fa-twitter"></i></a>
      <a href="https://github.com/vermakartik" className="link-icon"><i class="fab fa-github"></i></a>
      <a href="https://vermakartik.github.io/profile/#/posts" className="link-icon">Blog</a>
      <a href="https://www.instagram.com/me.kartik.verma/" className="link-icon"><i class="fab fa-instagram"></i></a>
      <a href="https://www.linkedin.com/in/kartik-verma/" className="link-icon"><i class="fab fa-linkedin"></i></a>
    </p>
  </div>
}

let App = () => {

  let [currentTab, setCurrentTab] = useState(0)
  let [currentSettings, setCurrentSettings] = useState({
    infoStyleInfo: {
      width: '128px'
    },
    titleTextStyleInfo: {
      padding: "10px",
      backgroundColor: "#444444",
      borderRadius: "4px",
      fontFamily: "Comfortaa",
      textColor: "#ffffff",
    },
    imageStyleInfo: {
      padding: "10px",
      height: "128px"
    },
    timeStyleInfo:{
      textAlign: "center",
      fontFamily: "Comfortaa",
      fontSize: "24px",
      textColor: "#4287f5",
      marginBottom: "12px"
    },
    barStyleInfo: {
      borderRadius: "8px",         
      barWidth: "32px",
      backgroundColor: "#4287f5",
      height: "128px"
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
    case 2: ToRender = <Settings currentSettings={currentSettings} onChangeSettings={handleChangeSettings}/>; break;
    case 3: ToRender = <Instructions />
  }

  return (
    <div>
      <div style={{display: "flex", alignItems: "stretch"}}>
        <span style={{fontFamily: "Righteous", background: "#309c3f", color: "#0000007f", fontWeight: "bold", alignSelf: "middle", padding: "1px 12px", fontSize: "28px"}}> Graphy
        </span>
        <Tabbed 
          tabs={["Play", "Data", "Settings", "Instructions"]}
          currentTab={currentTab}
          OnChangeTab={(index) => setCurrentTab(index)}
        />
      </div>
      {ToRender}
      <Footer />
    </div>
  )
}
  
export default App;
