import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TestBlock from '../TestBlock'

class ChainEditorBoard extends React.Component {
  render() {
    const {chain, testBlockMoved} = this.props
    return (
      <div>
        {
          chain.tests.map((test, idx) => {
            return (<TestBlock key={idx} index={idx} name={`Block ${idx}`}/>)
          })
        }
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(ChainEditorBoard)
