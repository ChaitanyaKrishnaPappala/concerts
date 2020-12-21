import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

 // ReactModal.setAppElement('#root')

 const Modal  = ({children, title = '', overlayStyle = {}, contentStyle = {}, showModal, onHandleClose}) => {
    let overlay = {
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        ...overlayStyle
    }

    let content = {
        width: '50%',
        height: 'auto',
        left: '25%',
        right: '25%',
        top: '25%',
        bottom: 'auto',
        ...contentStyle
    }

    const style = {
        overlay,
        content
    }

    return (
      <ReactModal
        isOpen={showModal}
        onRequestClose={onHandleClose}
        contentLabel={title}
        style={style}
      >
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {title && <h3 style={{paddingRight: 40}}>{title}</h3>}
          <div
            style={{cursor: 'pointer', marginTop: 10}} onClick={()=>onHandleClose()}
          >X
          </div>
        </div>
        {children}
      </ReactModal>
    )
}

Modal.propTypes = {
    children: PropTypes.object,
    title: PropTypes.string,
    overlayStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    showModal: PropTypes.bool,
    onHandleClose: PropTypes.func
}

export default Modal

