import React from 'react'

const StatusBar = props => {
  const { timerStatus, time } = props
  return (
    <div className='timer-row'>
      { timerStatus === 'stopped' ? 'Press Capture to Snap a Selfie' : null }
      { timerStatus === 'active' && time ? time : null }
      { timerStatus === 'active' && !time ? 'Smile!' : null }
    </div>
  )
}

export default StatusBar
