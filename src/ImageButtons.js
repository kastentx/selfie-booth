import React from 'react'
import { Button } from 'react-bootstrap'
import './ImageButtons.css'

const ImageButtons = props => {
  return (
    <div className='image-button-bar'>
      <Button
        onClick={ props.handleDownload }
        className="download-button">
        <span aria-label="gift" role="img">🎁 </span> Download
      </Button>
      <Button
        onClick={ props.handleReset }
        className="reset-button">
        <span aria-label="reset" role="img">🔄</span> Start Over
      </Button>
    </div>
  )
}

export default ImageButtons

