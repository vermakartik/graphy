import React, { useState, useEffect } from 'react'
import useInterval from './useInterval'
import { Evaluators } from './evaluator'
import BeginPoint from './BeginPoint'
import InfoCard from './Info'
import { effectEvaluate } from './Utils'


let MoverContainer = ({currentData, styleInfo}) => {

    const Eval = Evaluators[styleInfo.evalInfo.evaluator]
    console.log("Eval Begin....")
    console.log(Eval)
    console.log("Eval Ends")

    let [currentIndexToAdd, setCurrentIndexToAdd] = useState(0)
    let [maxCount, setMaxCount] = useState(styleInfo.playerState.maxCount)

    useEffect(() => {
        setMaxCount(styleInfo.playerState.maxCount)
    }, [styleInfo.playerState.maxCount])

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

            let aState = effectEvaluate(lFiles, maxHeight, addFadeIn, Eval, styleInfo.evalInfo.config, styleInfo.playerState)
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

    let {isRunning, cDelay, setRunning, setDelay} = useInterval(UpdatePosition, styleInfo.playerState.delay, false)

    useEffect(() => {
        setDelay(styleInfo.playerState.delay)
    }, [styleInfo.playerState.delay])

    return (
        <div className="overflow-hidden">
        <div className='overflow-hidden' style={{width: "100%", height:"100%", bottom: "0", overflow: "hidd "}}>
            <div className="overflow-hidden" style={{position: "absolute", width:"100%", height: "100%"}}>
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
                            textInfo={styleInfo.beginPointInfo.textInfo}
                            ballSize={styleInfo.beginPointInfo.ballSize}
                            show={styleInfo.beginPointInfo.show}
                            barWidth={styleInfo.beginPointInfo.barWidth}
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
                                    timeText: Eval.displayFormat(item.data[2], styleInfo.evalConfig),
                                    styleInfo: styleInfo.timeStyleInfo 
                                }}
                                barInfo = {{
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
                                moreInfo={item.data.length >= 4 ? {
                                    moreInfoText: item.data[3] ,
                                    styleInfo: styleInfo.moreInfo
                                } : {}}
                                renderMoreInfo={item.data.length >= 4}
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
        </div>
    )
}

export default MoverContainer