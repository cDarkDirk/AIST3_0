import React from 'react'
import TestBlock from '../TestBlock'
import ChainEditorBoard from '../../containers/ChainEditorBoard'

export default () => {
  return (
    <div className='container'>
      <h1>Chain Editor</h1>
      <ChainEditorBoard>
        <TestBlock name='Create User' description='This is the first block'/>
      </ChainEditorBoard>
    </div>
  )
}
