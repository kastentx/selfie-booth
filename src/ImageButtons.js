import React from 'react'
import { Button } from 'react-bootstrap'
import './ImageButtons.css'

const ImageButtons = props => {
  return (
    <div>
      <Button
        onClick={ props.handleDownload }
        className="download-button">
        Download
      </Button>
      <Button
        onClick={ props.handleReset }
        className="reset-button">
        Go Again
      </Button>
    </div>
  )
}

export default ImageButtons

