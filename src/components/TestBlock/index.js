import React from 'react'

import './style.css'

 export default ({name, description, connectDragSource, isDragging}) => {
    return (
      <li className='test-block-container'>
        <p className='heading'>{name}</p>
        <p>{description}</p>
      </li>
    )
  }
