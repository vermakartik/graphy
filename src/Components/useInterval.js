import React, {useState, useRef, useEffect} from 'react'

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

export default useInterval