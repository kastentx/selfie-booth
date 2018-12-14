import React from 'react'

const StatusBar = props => {
  const { timerStatus, time, peopleData } = props
  return (
    <div className='timer-row'>
      { timerStatus === 'stopped' && !peopleData ? `Press 'Capture' to Snap a Selfie` : null }
      { timerStatus === 'stopped' && peopleData ? 'Position Your Photo on a Holiday Background' : null }
      { timerStatus === 'active' && time ? time : null }
      { timerStatus === 'active' && !time ? 'Smile!' : null }
    </div>
  )
}

export default StatusBar
