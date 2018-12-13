import React from 'react'
import './CaptureButton.css'

const CaptureButton = props => {
  return (
    <span
      onClick={ props.handleClick }
      className="capture-button">
      Capture
    </span>
  )
}

export default CaptureButton

