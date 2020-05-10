import { DATE_FORMATS } from "./Constants";
import { asString } from "./Utils"

const today = () => {
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

const sinceEpoch = (data) => parseInt(new Date(data).getTime() / (1000 * 60 * 60 * 24))
const forToday = (data) => sinceEpoch(today()) - sinceEpoch(data)

const DatetoNum = (data, config) => {
    console.log("date data: " + data)
    return forToday(data)
}

const DateDisplayFormatter = (data, config) => {
    let value = config.applyFormat == 'true' ? asString(DatetoNum(data, config)) : data
    return value
}

const Evaluators = {
    date: {
        displayFormat: (data, config) => DateDisplayFormatter(data, config),
        compareFormat: (data, config) => DatetoNum(data, config)
    },
    number: {
        displayFormat: (data, config) => config.prefix + " " + data + " " + config.suffix,
        compareFormat: (data, config) => data
    },
    string: {
        displayFormat: (data, config) => config.prefix + " " + data + " " + config.suffix,
        compareFormat: (data, config) => data.length
    }
} 

export {
    Evaluators
}