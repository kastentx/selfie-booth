import React from 'react'
import './StatusBar.css'

const StatusBar = props => {
  const { timerStatus, time, peopleData } = props
  return (
    <div className='timer-row'>
      <p>
        { timerStatus === 'stopped' && !peopleData ? `Press 'Capture' to Snap a Selfie` : null }
        { timerStatus === 'stopped' && peopleData ? 'Position Your Photo on a Holiday Background' : null }
        { timerStatus === 'active' && time ? time : null }
        { timerStatus === 'active' && !time ? 'Smile!' : null }
      </p>
    </div>
  )
}

export default StatusBar
