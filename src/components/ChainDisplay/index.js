import React from 'react'
import TestBlock from '../TestBlock'
import {
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc'


const SortableTestBlock = SortableElement(({index, idx, test, closeButtonClicked}) => {
    return (
        <TestBlock key={index}
                   closeButtonClicked={closeButtonClicked}
                   canClose={true}
                   idx={idx}
                   name={test.test_name}
                   description={`id: ${test.test_id}`}
        />)
});

const TestList = SortableContainer(({tests,closeButtonClicked}) => {
  return (
    <ul>
      {tests.map((test, idx) => (
          test ? <SortableTestBlock closeButtonClicked={closeButtonClicked} key={idx} index={idx} idx={idx} test={test} />: null
      ))}
    </ul>
  )
});

export default ({chainTemplate, tests = [], testBlockMoved, closeButtonClicked}) => {
    return (
        <ul>
            <TestList distance={1}
                      closeButtonClicked={closeButtonClicked}
                      tests={tests}
                      onSortEnd={testBlockMoved}/>
        </ul>
    )
}
