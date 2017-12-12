import React from 'react'
import TestBlock from '../TestBlock'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'


const SortableTestBlock = SortableElement(({index, test}) =>
  <TestBlock index={index} name={test.name} />
)

const TestList = SortableContainer(({tests}) => {
  return (
    <ul>
      {tests.map((test, index) => (
        <SortableTestBlock key={index} index={index} test={test} />
      ))}
    </ul>
  )
})

export default ({chain, testBlockMoved}) => {
    return (
      <ul>
        <TestList tests={chain.tests} onSortEnd={testBlockMoved}/>
      </ul>
    )
  }
