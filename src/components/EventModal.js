import React from 'react'
import Modal from './Modal'
import {Map} from 'immutable'
import PropTypes from 'prop-types'
const EventModal = ({event, isModalOpen, toggleModalOpen}) => {
    return (
      <Modal
        showModal={isModalOpen}
        title={`${event ? event.get('Title') : '' } Details`}
        onHandleClose={()=> {
            toggleModalOpen(t=>!t)
        }}
      >
        {event &&
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', marginBottom: 10}}>
              <div style={{marginRight: 10}}><b>Title</b></div> {`${event.get('Title')}`}
            </div>
            <div style={{display: 'flex', marginBottom: 10}}>
              <div style={{marginRight: 10}}><b>Time</b></div> {`${event.get('Time')}`}
            </div>
            <div style={{display: 'flex', marginBottom: 10}}>
              <div style={{marginRight: 10}}><b>Location</b></div>
              {`${event.getIn(['Location', 'City'], '')}, 
              ${event.getIn(['Location', 'State'], '')}, ${event.getIn(['Location', 'Country'], '')}`}
            </div>
            {event.get('AvailableSeats') &&
              <div style={{display: 'flex', marginBottom: 10}}>
                <div style={{marginRight: 10}}><b>Available Seats</b></div>
                {(event.get('AvailableSeats').map((seat)=>seat && seat.get('id')) || []).join(', ')}
              </div>}
          </div>}
      </Modal>)
}

EventModal.propTypes = {
    isModalOpen: PropTypes.bool,
    toggleModalOpen: PropTypes.func,
    event: PropTypes.instanceOf(Map)
}


export default EventModal
