import React, {useState, useCallback, memo, useEffect} from 'react'
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {List} from "immutable";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const containerStyle = {
    width: '400px',
    height: '400px'
}

const center = {
    lat: 25.2744,
    lng: -133.7751
}

const Map = ({events}) => {
    const [map, setMap] = useState(null)

    useEffect(()=>{
        if(map){
            let bounds = new  window.google.maps.LatLngBounds()
            events.forEach((event)=>{
                if(event){
                    bounds.extend({lat: event.get('lat'), lng: event.get('lng')})
                }
            })
            map.fitBounds(bounds)
            setMap(map)
        }
    }, [events, map])


    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {events.map(event =>
            event &&  typeof event.get === 'function' && <Marker
              key={event.get('Title')}
              position={{lat: event.get('lat'), lng: event.get('lng')}}
              draggable
                                                         />)}
        </GoogleMap>
      </LoadScript>
    )
}

export function mapStateToProps (state) {
    const events = state.getIn(['events', 'data'], List())
    return {
        events
    }
}

Map.propTypes= {
    events: PropTypes.instanceOf(List)
}

export default connect(mapStateToProps, {})(Map)
export {Map as PureMap}
