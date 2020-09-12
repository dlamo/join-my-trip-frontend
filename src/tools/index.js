import moment from 'moment'

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

// getDatesTrip returns formatted start and end dates from a trip
export const getDatesTrip = dates => {
    const startDate = new Date(parseInt(dates[0]))
    const lastDate = new Date(parseInt(dates[dates.length - 1]))
    return [startDate, lastDate]
}

// Use moment.js to format date
export const formatDate = date => {
    return moment(date).format('MMM Do')
}

// Get region and country from a candidate from Google Places API
export const getLocationData = locations => {
    // Get the 1st candidate as location
    const [homeLocation] = locations
    // Extract country as the last element of the address and region as second to last element
    const locationData = homeLocation.formatted_address.split(",")
    homeLocation.country = locationData[locationData.length - 1].trim()
    const regionName = locationData[locationData.length - 2].trim().split(" ")
    if (regionName.length > 1) {
        homeLocation.region = regionName[regionName.length - 1]
    } else {
        homeLocation.region = regionName[0]
    }
    return homeLocation
}