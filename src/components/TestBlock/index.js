import React from 'react'
import {Button} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import './style.css'


export default ({idx, name, description, connectDragSource, isDragging, canClose, closeButtonClicked, showArrow = true}) => {

  return (
    <li className='test-block-container'>
      <div className='test-block-content'>
        {canClose ?
          <Button bsSize='small' onClick={() => closeButtonClicked(idx)} className='test-block-close'><FontAwesome
            name='times'/></Button>
          : <p/>}
        <p className='heading'>{name}</p>
        <p>{description}</p>
      </div>
      {showArrow ? <div className='arrow'>▼</div> : null}
    </li>
  )

}
