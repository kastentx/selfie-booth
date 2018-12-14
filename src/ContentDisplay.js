import React from 'react'
import { Button } from 'react-bootstrap'
import KonvaDisplay from './KonvaDisplay'
import './ContentDisplay.css'

const ContentDisplay = props => {
  const { selectedBG, peopleData, captureData } = props
  return (
    <div>
      {
        peopleData ? 
        <KonvaDisplay
          handleReset={ props.handleReset }     
          handleDownload={ props.handleDownload }
          BG={ selectedBG }
          front={ peopleData } />
      :
        <div>
          <img 
            alt='a webcam capture'
            className='image-display'
            src={ peopleData ? peopleData : captureData } />
          <div>
            <Button 
              className='loading-button'>
              processing image...
            </Button>
          </div>
        </div>
      }
      
    </div>
  )
}

export default ContentDisplay
