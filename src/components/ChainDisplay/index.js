import React from 'react'
import TestBlock from '../TestBlock'
import {
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc'
import Alert from "react-bootstrap/es/Alert";


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

const StandAlert = () => <Alert bsStyle="danger"><div>Общие контуры отсуствуют</div></Alert>

const StandPanel = ({tests, checkStands}) => {
  let uniqueStands = [];
  tests.map((test)=> test ? test.stands.map(
    (stand) => uniqueStands.indexOf(stand) === -1 ? uniqueStands.push(stand) : null
  ) : null);
  const stands = uniqueStands.filter((stand) => tests.every((test) => test? test.stands.indexOf(stand) !== -1 : false));
  const isAvailable = !(stands.length === 0 && tests.length > 0)
  checkStands(isAvailable);
  return !isAvailable ? <StandAlert/> : null;

};

export default ({chainTemplate, checkStands, tests = [], testBlockMoved, closeButtonClicked}) => {
    return (
        <ul>
          <StandPanel tests={tests} checkStands={checkStands}/>
            <TestList distance={1}
                      closeButtonClicked={closeButtonClicked}
                      tests={tests}
                      onSortEnd={testBlockMoved}/>
        </ul>
    )
}
