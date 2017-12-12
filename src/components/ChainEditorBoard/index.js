import React from 'react'
import TestBlock from '../TestBlock'

export default ({chain, testBlockMoved}) => {
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
