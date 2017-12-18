import React from 'react'
import TestBlock from '../TestBlock'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'


const SortableTestBlock = SortableElement(({index, test}) =>
  <TestBlock index={index} name={test.name} id={test.id} />
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

export default ({chainTemplate, testBlockMoved}) => {
    const tests = (chainTemplate && chainTemplate.tests) || []
    return (
      <ul>
        <TestList tests={tests} onSortEnd={testBlockMoved}/>
      </ul>
    )
  }
