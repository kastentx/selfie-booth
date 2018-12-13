import React from 'react'
import { Button } from 'react-bootstrap'
import './CaptureButton.css'

const CaptureButton = props => {
  return (
    <Button
      onClick={ props.handleClick }
      className="capture-button">
      Capture
    </Button>
  )
}

export default CaptureButton

