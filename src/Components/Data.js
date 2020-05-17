import React, {useState} from 'react';

let DataRow = ({items, rIndex}) => {
    return <tr className="cell-row">
        {/* <td key={`row_${rIndex}`} className="cell-index">{rIndex}</td> */}
        {items.map((value, index) => <td className={`cell-data`} key={`${rIndex}_${index}`}>{value}</td>)}
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
        \_[&#x00ba;_&#x00ba;]_/<br />
        /  \<br />
        \  /<br />
        _ _<br />
        <span style={{fontSize: "24px"}}>No Data. Select a File.</span>
    </div>
)

let Data = ({currentData, onChangeFileName}) => {
  
    let fileReader;
    let [tempFileSelect, setTempFileSelect] = useState()
    let [columnSeperator, setColumnSeperator] = useState(",")

    let handleFileRead = (e) => {
        const content = fileReader.result;
        SplitData(content);
    }

    let SplitData = (data) => {
        console.log(`Column Seperator: ${columnSeperator}`)
        let lines = data.trim("\n").trim("\t").split("\n").
                        map(item => item.trim("\n").trim('\t').split(columnSeperator).
                        map(i => i.trim(columnSeperator).trim(" ").trim("\t")).
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
                <span className="label">Column Seperator</span>
                <input className="input_opt" type="text" value={columnSeperator} onChange={(e) => {
                    setColumnSeperator(e.target.value)
                }} />
            </div>
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

export default Data