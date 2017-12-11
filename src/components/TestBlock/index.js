import React from 'react'
import { DragSource } from 'react-dnd'
import { DRAG_TEST_BLOCK } from '../../constants'

import './style.css'

class TestBlock extends React.Component {

  render() {
    const {name, description, connectDragSource, isDragging} = this.props
    return connectDragSource(
      <div className='test-block-container'>
        <p className='heading'>{name}</p>
        <p>{description}</p>
      </div>
    )
  }
}


const testBlockSource = {
  beginDrag: (props, monitor, component) => {
    console.log('Drag started')
    return {
      index: props.index
    }
  },
  endDrag: (props, monitor, component) => {
    console.log('Drag ended')
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export default DragSource(DRAG_TEST_BLOCK, testBlockSource, collect)(TestBlock)
