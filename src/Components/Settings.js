import React, { useState, useEffect, useRef } from 'react'
import '../App.css'
import InfoCard from './Info'
import {fontList, INP_TYPES, BORDER_STYLES, FONT_WEIGHTS} from './Constants'
import { builders, constructRGB } from './Utils'
import {ChromePicker} from 'react-color'
import { Evaluators } from './evaluator'


let SimpleInput = ({title, value, onChangeParams}) => {

  return (
    <div className="input_container row">
      <div className="col-md-3 col-12 label">{title}</div>
      <div className="input_o_container col-md-9 col-12">
        <input 
          className="simple-input-option"
          type="text"
          value={value}
          onChange={(e) => onChangeParams(e.target.value)} />
      </div>
    </div>
  )
}

let SelectorInput = ({title, value, keys, onChangeParams}) => {

  return (
    <div className="input_container row">
      <div className="col-md-3 col-12 label">{title}</div>
      <div className="col-md-9 col-12 input_o_container">
        <select
          value={value} onChange={(e) => onChangeParams(e.target.value)}
          className="simple-input-option" >
            { keys.map((item, index) => <option className="inp_select_option" key={index} value={item}>{item}</option>) }
        </select>
      </div>
    </div>
  )
}

let CheckBoxInput = ({title, value, onChangeParams}) => {


  console.log("CheckBox")
  console.log(title)
  console.log(value)

  return (
    <div className="input_container row">
      <div className="col-md-3 col-12 label">{title}</div>
      <div className="col-md-9 col-12 input_o_container">
        <input 
          type="checkbox"
          className="checkbox"
          checked={value == 'true' ? true : false} onChange={(e) => onChangeParams(value == 'true' ? 'false' : 'true')} />
      </div>
    </div>
  )
}

let ColorSelector = ({show, value, onClose, onChange}) => {

  return (
    <div className="color_container" style={{display: show ? "block": "none"}}>
      <button className="close_btn" onClick={() => onClose()}>x</button>
      <div className="chrome_picker">
        <ChromePicker color={value} onChange={(c, e) => onChange(constructRGB(c.rgb))} />
      </div>
    </div>
  )

}

let ColorInput = ({title, value, onChangeParams}) => {
  console.log(value)
  let [show, setShow] = useState(false)
  
  return (
    <div className="input_container row">
      <div className="col-md-3 col-12 label">{title}</div>
      <div className="col-md-9 col-12 input_o_container">
        <div className="selected_color" style={{
          backgroundColor: value
        }}
        onClick={() => setShow(true)} />
        <ColorSelector 
          show={show}
          onClose={() => setShow(false)}
          value={value}
          onChange={(hex) => onChangeParams(hex)} />
      </div>
    </div>
  )
}

let TileRender = ({type, config}) => {
  let TRender = null

  switch(type) {
    case INP_TYPES.SIMPLE_INPUT: TRender = <SimpleInput title={config.title} value={config.value} onChangeParams={(e) => config.onChange(config.k1, config.k2, e)} />; break;
    case INP_TYPES.SELECTPANEL: TRender = <SelectorInput title={config.title} value={config.value} keys={config.keys} onChangeParams={(e) => config.onChange(config.k1, config.k2, e)} />; break;
    case INP_TYPES.CHECKBOX: TRender = <CheckBoxInput title={config.title} value={config.value} onChangeParams={(e) => config.onChange(config.k1, config.k2, e)} />; break;
    case INP_TYPES.COLOR_INPUT: TRender = <ColorInput title={config.title} value={config.value} onChangeParams={(e) => config.onChange(config.k1, config.k2, e)}/>; break;
  }
  return TRender;
}

let RenderTitle = ({title, varInfo}) => {

  return (<div className="title_container">
            <div className="title">{title}</div>
            {
              varInfo.render ? 
                <input 
                  className="simple_input"
                  type="text"
                  value={varInfo.value}
                  onChange={(e) => varInfo.set(e.target.value)}/>: 
              <></>
            }
          </div>
        )
}

let RenderTileArray = (a) => {

  return a.map(
    (item, index) => <TileRender key={index} {...item} /> 
  )

}

let Settings = ({cs, onChangeSettings}) => {

    let [tempTitleText, setTempTitleText] = useState("Mario")
    let [tempUrlImage, setUrlImage] = useState("https://purepng.com/public/uploads/large/purepng.com-mariomariofictional-charactervideo-gamefranchisenintendodesigner-1701528634653vywuz.png")
    let [tempTimeText, setTempTimeText] = useState("12 Years Old")
    let [tempMoreInfoText, setTempMoreInfoText] = useState("More Info goes Here")
  
    let ChangeSimpleInputType = (key1, key2, e) => {
      onChangeSettings(key1, key2, e)
    }

    console.log(cs)
    console.log(cs.evalInfo.evaluator === 'date')
    console.log(cs.evalInfo.evaluator)
    console.log(cs.evalConfig.applyFormat)
  
    return (
      <div className="container-fluid" style={{width: "100%"}}>
        <div className="row">

          <div className="col-lg-6 col-12" style={{position: "relative", height: "80vh"}} >
            <div style={{position: "relative", display: "block", margin: "auto", paddingTop: "8px", margin: "16px 8px", borderRadius: "4px", height: "100%", width: "100%"}}>
              <div style={{position: "absolute", top: "75%", left: "50%"}}>
                <InfoCard
                  rPosition="50px"
                  infoStyleInfo={cs.infoStyleInfo} 
                  titleInfo={{
                    text: `${tempTitleText}`,
                    styleInfo: cs.titleTextStyleInfo
                  }}
                  imageInfo={{
                    imageURL: `${tempUrlImage}`,
                    styleInfo: cs.imageStyleInfo
                  }}
                  timeInfo={{
                    timeText:`${cs.evalConfig.prefix}${tempTimeText}${cs.evalConfig.suffix}`,
                    styleInfo: cs.timeStyleInfo 
                  }}
                  barInfo = {{
                    currentHeight: cs.barStyleInfo.height,
                    styleInfo: cs.barStyleInfo,
                    dummyBar: true
                  }}
                  moreInfo={{
                    moreInfoText: tempMoreInfoText,
                    styleInfo: cs.moreInfo
                  }}
                  renderMoreInfo={true}
                />
              </div>
            </div>
          </div>
          
          <div className="col-lg-6 col-12" style={{overflowY: "scroll", height: "80vh"}}>
            <div className="col-12" style={{margin: "0px", padding: "0px"}}>
              <RenderTitle title="title" varInfo={{render: true, set: setTempTitleText, value: tempTitleText}} />
              <div>
                <ul>

                  {
                      RenderTileArray([
                        builders.makeSimpleInput("Padding", cs.titleTextStyleInfo.padding, ChangeSimpleInputType, "titleTextStyleInfo", "padding"),
                        builders.makeSimpleInput("Border Radius", cs.titleTextStyleInfo.borderRadius, ChangeSimpleInputType, "titleTextStyleInfo", "borderRadius"),
                        builders.makeColorInput("Background Color", cs.titleTextStyleInfo.backgroundColor, ChangeSimpleInputType, "titleTextStyleInfo", "backgroundColor"),
                        builders.makeSelectPanel("Font Family", cs.titleTextStyleInfo.fontFamily, Object.keys(fontList), ChangeSimpleInputType, "titleTextStyleInfo", "fontFamily"),
                        builders.makeColorInput('Text Color', cs.titleTextStyleInfo.color, ChangeSimpleInputType, "titleTextStyleInfo", "color"),
                        builders.makeSimpleInput("Text Size", cs.titleTextStyleInfo.fontSize, ChangeSimpleInputType, "titleTextStyleInfo", "fontSize"),
                        builders.makeSelectPanel("Font Weight", cs.titleTextStyleInfo.fontWeight, FONT_WEIGHTS, ChangeSimpleInputType, "titleTextStyleInfo", "fontWeight")
                      ])
                  }
                  
                </ul>
              </div>
            </div>
  
            <div className="col-12" style={{margin: "0px", padding: "0px"}}>
              <RenderTitle title="Image Setting" varInfo={{render: true, set: setUrlImage, value: tempUrlImage}} />
              <div>
                <ul>
                  {
                    RenderTileArray([
                      builders.makeSimpleInput("Padding", cs.imageStyleInfo.padding, ChangeSimpleInputType, "imageStyleInfo", "padding"),
                      builders.makeSimpleInput("Height", cs.imageStyleInfo.height, ChangeSimpleInputType, "imageStyleInfo", "height"),
                      builders.makeSimpleInput("Width", cs.imageStyleInfo.width, ChangeSimpleInputType, "imageStyleInfo", "width"),
                      builders.makeSimpleInput("Border Radius", cs.imageStyleInfo.borderRadius, ChangeSimpleInputType, "imageStyleInfo", "borderRadius"),
                      builders.makeColorInput("Background Color", cs.imageStyleInfo.backgroundColor, ChangeSimpleInputType, "imageStyleInfo", "backgroundColor"),
                      builders.makeSimpleInput("Bottom Margin", cs.imageStyleInfo.marginBottom, ChangeSimpleInputType, "imageStyleInfo", "marginBottom")
                    ])
                  }
                </ul>
              </div>
            </div>
  
            <div className="col-12" style={{margin: "0px", padding: "0px"}}>
              <RenderTitle title="Time Settings" varInfo={{render: true, set: setTempTimeText, value: tempTimeText}} />
              <div>
                <ul>
                  {
                    RenderTileArray([
                      builders.makeSimpleInput("Bottom Margin", cs.timeStyleInfo.marginBottom, ChangeSimpleInputType, "timeStyleInfo", "marginBottom"),
                      builders.makeSimpleInput("Font Size", cs.timeStyleInfo.fontSize, ChangeSimpleInputType, "timeStyleInfo", "fontSize"), 
                      builders.makeSelectPanel("Font Family", cs.timeStyleInfo.fontFamily, Object.keys(fontList), ChangeSimpleInputType, "timeStyleInfo", "fontFamily"),
                      builders.makeColorInput("Text Color", cs.timeStyleInfo.color, ChangeSimpleInputType, "timeStyleInfo", "color"),
                      builders.makeSelectPanel("Font Weight", cs.timeStyleInfo.fontWeight, FONT_WEIGHTS, ChangeSimpleInputType, "timeStyleInfo", "fontWeight")
                    ])
                  }
                </ul>
              </div>
            </div>
  
            <div className="col-12" style={{margin: "0px", padding: "0px"}}>
              <RenderTitle title="Bar Settings" varInfo={{render: false}}/>
              <div>
                <ul>
                  {
                    RenderTileArray([
                      builders.makeSimpleInput("Border Radius", cs.barStyleInfo.borderRadius, ChangeSimpleInputType, "barStyleInfo", "borderRadius"),
                      builders.makeSimpleInput("Bar Width", cs.barStyleInfo.barWidth, ChangeSimpleInputType, "barStyleInfo", "barWidth"),
                      builders.makeColorInput("Background Color", cs.barStyleInfo.backgroundColor, ChangeSimpleInputType, "barStyleInfo", "backgroundColor"),
                      builders.makeSimpleInput("Bar Height", cs.barStyleInfo.height, ChangeSimpleInputType, "barStyleInfo", "height"),
                    ])
                  }
                </ul>
              </div>
            </div>
  
            <div className="col-12" style={{margin: "0px", padding: "0px"}}>
            <RenderTitle title="Card Settings" varInfo={{render: false}}/>
              <div>
                <ul>
                  {
                    RenderTileArray([
                      builders.makeSimpleInput("Card Width", cs.infoStyleInfo.width, ChangeSimpleInputType, "infoStyleInfo", "width")
                    ])
                  }
                </ul>
              </div>
            </div>
            
            <div className="col-12" style={{margin: "0px", padding: "0px"}}>
            <RenderTitle title="Begin Point Info" varInfo={{render: false}}/>
              <div>
                <ul>
                  {
                    RenderTileArray([
                      builders.makeSimpleInput("Ball Radius", cs.beginPointInfo.ballSize, ChangeSimpleInputType, "beginPointInfo", "ballSize"),
                      builders.makeCheckPanel("Show Begin Point", cs.beginPointInfo.show, ChangeSimpleInputType, "beginPointInfo", "show"),
                      builders.makeSimpleInput("Bar Width", cs.beginPointInfo.barWidth, ChangeSimpleInputType, "beginPointInfo", "barWidth")
                    ])
                  }
                </ul>
              </div>
            </div>

            <div className="col-12" style={{margin: "0px", padding: "0px"}}>
              <RenderTitle title="Evaluator Info" varInfo={{render: false}}/>
              <div>
                <ul>
                  {
                    cs.evalInfo.evaluator == "date" ?
                    RenderTileArray([
                      builders.makeSelectPanel("Evaluator", cs.evalInfo.evaluator, ['date', 'number', 'string'], ChangeSimpleInputType, "evalInfo", "evaluator"),
                      builders.makeSimpleInput("Prefix", cs.evalConfig.prefix, ChangeSimpleInputType, "evalConfig", "prefix"),
                      builders.makeSimpleInput("Suffix", cs.evalConfig.suffix, ChangeSimpleInputType, "evalConfig", "suffix"),
                      builders.makeCheckPanel("Apply Format", cs.evalConfig.applyFormat, ChangeSimpleInputType, "evalConfig", "applyFormat")
                    ]):
                    RenderTileArray([
                      builders.makeSelectPanel("Evaluator", cs.evalInfo.evaluator, ['date', 'number', 'string'], ChangeSimpleInputType, "evalInfo", "evaluator"),
                      builders.makeSimpleInput("Prefix", cs.evalConfig.prefix, ChangeSimpleInputType, "evalConfig", "prefix"),
                      builders.makeSimpleInput("Suffix", cs.evalConfig.suffix, ChangeSimpleInputType, "evalConfig", "suffix")
                    ])
                  }
                </ul>
              </div>
            </div>

            <div className="col-12" style={{margin: "0px", padding: "0px"}}>
              <RenderTitle title="More Info" varInfo={{render: false}}/>
              <div>
                <ul>
                  {
                    RenderTileArray([
                      builders.makeColorInput("Background Color", cs.moreInfo.background, ChangeSimpleInputType, "moreInfo", "background"),
                      builders.makeSimpleInput("Padding", cs.moreInfo.padding, ChangeSimpleInputType, "moreInfo", "padding"),
                      builders.makeSelectPanel("Font Family", cs.moreInfo.fontFamily, Object.keys(fontList), ChangeSimpleInputType, "moreInfo", "fontFamily"),
                      builders.makeSimpleInput("Bottom", cs.moreInfo.bottom, ChangeSimpleInputType, "moreInfo", "bottom"),
                      builders.makeSimpleInput("Border Radius", cs.moreInfo.borderRadius, ChangeSimpleInputType, "moreInfo", "borderRadius"),
                      builders.makeSimpleInput("Border Width", cs.moreInfo.borderWidth, ChangeSimpleInputType, "moreInfo", "borderWidth"),
                      builders.makeSelectPanel("Border Style", cs.moreInfo.borderStyle, BORDER_STYLES,ChangeSimpleInputType, "moreInfo", "borderStyle"),
                      builders.makeColorInput("Border Color", cs.moreInfo.borderColor, ChangeSimpleInputType, "moreInfo", "borderColor"),
                      builders.makeColorInput("Text Color", cs.moreInfo.color, ChangeSimpleInputType, "moreInfo", "color"),
                      builders.makeSimpleInput("Font Size", cs.moreInfo.fontSize, ChangeSimpleInputType, "moreInfo", "fontSize"),
                      builders.makeSelectPanel("Font Weight", cs.moreInfo.fontWeight, FONT_WEIGHTS, ChangeSimpleInputType, "moreInfo", "fontWeight")
                    ])
                  }
                </ul>
              </div>
            </div>

            <div className="col-12" style={{margin: "0px", padding: "0px"}}>
              <RenderTitle title="Player State" varInfo={{render: false}}/>
              <div>
                <ul>
                  {
                    RenderTileArray([
                      builders.makeColorInput("Background Color", cs.playerState.backgroundColor, ChangeSimpleInputType, "playerState", "backgroundColor"),
                      builders.makeSimpleInput("Max Count", cs.playerState.maxCount, ChangeSimpleInputType, "playerState", "maxCount"),
                      builders.makeSimpleInput("Spawn Interval", cs.playerState.delay, ChangeSimpleInputType, "playerState", "delay"),
                      builders.makeSimpleInput("Height Transition Time", cs.playerState.hTransitionTime, ChangeSimpleInputType, "playerState", "hTransitionTime")
                    ])
                  }
                </ul>
              </div>
            </div>

          </div>

        </div>
      </div>
    )
  }

export default Settings