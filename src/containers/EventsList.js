import React, {useEffect} from 'react'
import Event from '../components/Event'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {List} from 'immutable'
import {fetchEvents} from '../redux/actions'

const EventsList = ({events, fetchEvents}) => {
    useEffect(()=>{
       fetchEvents()
    }, [fetchEvents])
    return (
      <div style={{display: 'flex', flexDirection: 'column',
      alignItems: 'space-evenly', width: window.innerWidth/2}}
      >
        {events.map((event, index) => <Event key={index} event={event} />)}
      </div>)
}

EventsList.propTypes= {
    fetchEvents: PropTypes.func,
    events: PropTypes.instanceOf(List)
}
export function mapStateToProps (state, props) {
    const events = state.getIn(['events', 'data'], List())
    return {
        events
    }
}

export default connect(mapStateToProps, {fetchEvents})(EventsList)
export {EventsList as PureEventsList}
