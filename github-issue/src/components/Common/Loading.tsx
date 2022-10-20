import React from 'react'
import ReactLoading from 'react-loading'
function Loading() {
  return (
    <div className='my-5 flex justify-center'>
      <ReactLoading type='spinningBubbles' color='#848482' />
    </div>
  )
}

export default Loading
