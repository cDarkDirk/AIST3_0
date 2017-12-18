import React from 'react'

import './style.css'

 export default ({id, name, description, connectDragSource, isDragging}) => {
    return (
      <li className='test-block-container'>
        <div className='test-block-content'>
          <p className='heading'>{name}</p>
          <p className='heading'>id: {id}</p>
          <p>{description}</p>
        </div>
        <div className='arrow'>▼</div>
      </li>
    )
  }
