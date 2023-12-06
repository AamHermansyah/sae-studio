import moment from "moment"

export function convertDateFromMomentJs(format){
    let date = moment(format, "YYYYMMDD").fromNow()
    date = /^a\s/gi.test(date) ? date.replace(/^a\s/gi, '1 ') : date
    return date.replace(/\sago/gi, '')
}