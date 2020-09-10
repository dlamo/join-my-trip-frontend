import React from 'react'
import GoogleMapReact from 'google-map-react'

function Map({homes, position}) {
    const getMapOptions = () => {
        return {
            disableDefaultUI: false,
            mapTypeControl: false,
            styles: [{ featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }] }],
        }
    }
    const renderMarkers = (map, maps) => {
        homes.map((home, i) => new maps.Marker({
            position: home.location.geometry.location,
            map,
            title: home.title,
            label: `${i + 1}`
        }))
    }
    return (
        <GoogleMapReact 
            bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_KEY}}
            defaultCenter={homes[0].location.geometry.location}
            defaultZoom={11} 
            options={getMapOptions}
            style={{width: '100%', height: '100%', position: position}}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            />
    )
}

export default Map
