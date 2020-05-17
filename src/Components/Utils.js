import { INP_TYPES } from "./Constants"
import React from 'react'

let asString = (d) => {
    if(d < 365) return `${d} days old`
    let years = parseInt(d / 365)
    let dys = d % 365
    let dString = d > 0 ? `${dys} days old` : "old"
    return `${years} y ${dString}`
}

let evaluateRelativeStrength = (k1, k2, mx) => {
    let v = (k1 / k2) * mx
    console.log(`${k1} ${k2} ${mx} Val: ${v}`)
    return v;
}

const evaluateHeight = (cd, rd, mx, evaluator, config) => {

    console.log("Called Eval Height from")
    console.log(evaluator)

    return evaluateRelativeStrength(
      evaluator["compareFormat"](cd, config),
      evaluator['compareFormat'](rd, config),
      mx
    )
  }

const effectEvaluate = (data, refHeight, addFadeIn, evaluator, config, transitionInfo) => {
  console.log("Effect Evaluate")
  console.log(data)
  console.log(evaluator)
  let cRef = data[data.length - 1]

  let defs = data.map(
    (item, index) => { 
      if(item.type == 0) return item
      if(index == data.length -1 ) {
        return addFadeIn ? {
          transition: `opacity ${transitionInfo.hTransitionTime} ease-in`,
          height: `${0}px`, 
          opacity: 0
        } : {
          transition: `height ${transitionInfo.hTransitionTime} ease-in-out`,
          height: `${0}px` 
        } 
      } else if (index == data.length - 2) {

        return {
          transition: `height ${transitionInfo.hTransitionTime} ease-in-out`,
          height: `${refHeight}px`
        }

      } else {
        console.log("Called for Index " + index)
        return {
          transition: `height ${transitionInfo.hTransitionTime} ease-in-out`,
          height: `${evaluateHeight(item.data[2], cRef.data[2], refHeight, evaluator, config)}px`
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
      let h = evaluateHeight(item.data[2], cRef.data[2], refHeight, evaluator, config)
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

const builders = {

  makeSimpleInput: (t, v, ch, k1, k2) => {
    return {
      type: INP_TYPES.SIMPLE_INPUT,
      config: {
        title: t,
        value: v,
        onChange: ch,
        k1: k1,
        k2: k2
      }
    }
  },
  makeColorInput: (t, v, ch, k1, k2) => {
    return {
      type: INP_TYPES.COLOR_INPUT,
      config: {
        title: t,
        value: v,
        onChange: ch,
        k1: k1,
        k2: k2
      }
    }
  },
  makeSelectPanel: (t, v, k, ch, k1, k2) => {
    return {
      type: INP_TYPES.SELECTPANEL,
      config: {
        title: t,
        value: v,
        keys: k,
        onChange: ch,
        k1: k1,
        k2: k2
      }
    }
  },
  makeCheckPanel: (t, v, ch, k1, k2) => {
    return {
      type: INP_TYPES.CHECKBOX,
      config: {
        title: t,
        value: v,
        onChange: ch,
        k1: k1,
        k2: k2
      }
    } 
  }
} 

const constructRGB = (c) => {
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`
}

const splitUp = (l) => {

  return (
    <>
    {
      l.split("^").
        map(item => item.trim("\n").trim("\t").trim(" ")).
        filter(item => item.length > 0 || item !== "" || item != null || item != undefined).
        map((item, index) => <><span>{item}</span><br /></>)
    }
    </>
  )
} 

export {
    effectEvaluate,
    evaluateHeight,
    evaluateRelativeStrength,
    asString,
    splitUp,
    builders,
    constructRGB
}
