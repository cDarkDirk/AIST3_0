import React from 'react'

import './style.css'

export default ({name, description}) => {
  return (
    <div className='test-block-container'>
      <p className='heading'>{name}</p>
      <p>{description}</p>
    </div>
  )
}
