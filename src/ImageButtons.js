import React from 'react'
import './ImageButtons.css'

const ImageButtons = props => {
  return (
    <div>
      <span
        onClick={ props.handleDownload }
        className="download-button">
        Download
      </span>
      <span
        onClick={ props.handleReset }
        className="reset-button">
        Go Again
      </span>
    </div>
  )
}

export default ImageButtons

