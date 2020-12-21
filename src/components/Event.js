import React, {useState} from 'react'
import PropTypes from 'prop-types'
import EventModal from './EventModal';
const Event = ({event}) => {
    const [isModalOpen, toggleModalOpen] = useState(false)
    return event ?  (
      <div
        style={{display: 'flex', padding: 20,
                border: '1px solid',
                margin: 40,
                boxShadow: '1px 1px gray', texAlign: 'center'}}
      >
        <div
          style={{color: 'skyblue', cursor: 'default'}}
          onClick={()=> toggleModalOpen(t=>!t)}
        ><h4>{event.get('Title')}</h4>
        </div>
        {isModalOpen &&
          <EventModal
            event={event} isModalOpen={isModalOpen}
            toggleModalOpen={()=> toggleModalOpen(t=>!t)}
          />}
      </div>) : <div />
}

Event.propTypes = {
    event: PropTypes.object
}

export default Event
