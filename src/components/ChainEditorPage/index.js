import React from 'react'
import TestBlock from '../TestBlock'
import ChainDisplay from '../../containers/ChainDisplay'

export default () => {
  return (
    <div className='container'>
      <h1>Chain Editor</h1>
      <ChainDisplay>
        <TestBlock name='Create User' description='This is the first block'/>
      </ChainDisplay>
    </div>
  )
}
