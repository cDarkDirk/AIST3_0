import React from 'react'

import './style.css'



 export default ({idx, name, description, connectDragSource, isDragging, canClose, closeButtonClicked}) => {

    return (
            <li className='test-block-container'>
                <div className='test-block-content'>
                    {canClose ? <p onClick={() => closeButtonClicked(idx)} className='test-block-close'>X</p>
                    : <p/>}
                    <p className='heading'>{name}</p>
                    <p>{description}</p>
                </div>
                <div className='arrow'>▼</div>
            </li>
    )

  }
