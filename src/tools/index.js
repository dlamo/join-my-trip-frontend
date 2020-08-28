// getDates transforms the dates from the DB to a usefull format for the date-range component
export const getDates = (datesArr) => {
    const dayToMsec = 86400000 // 1 day === 86400000 ms
    return datesArr.map(dates => {
        let result = []
        for (let i = Date.parse(dates[0]); i <= Date.parse(dates[1]); i += dayToMsec) {
            result.push(i)
        }
        return result
    })
}