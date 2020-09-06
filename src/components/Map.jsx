import React from 'react'
import GoogleMapReact from 'google-map-react'

function Map(props) {
    const getMapOptions = () => {
        return {
            disableDefaultUI: false,
            mapTypeControl: true,
            styles: [{ featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }] }],
        }
    }
    const renderMarkers = (map, maps) => {
        props.homes.map(home => new maps.Marker({
            position: home.location.geometry.location,
            map,
            title: home.title
        }))
    }
    return (
        <GoogleMapReact 
            bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_KEY}}
            defaultCenter={props.homes[0].location.geometry.location}
            defaultZoom={11} 
            options={getMapOptions}
            style={{width: '100%', height: '100%', position: props.position}}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            />
    )
}

export default Map
