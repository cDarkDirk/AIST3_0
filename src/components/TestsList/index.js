import React from 'react'
import TestBlock from '../TestBlock'
import './style.css'
import SearchBar from "../SearchBar";

class TestsList extends React.Component {
  componentDidMount() {
    this.props.fetchTests();
  }

  render() {
    const tests = this.props.tests || [];
    const selectedChainTemplateTests = this.props.selectedChainTemplate.tests || [];
    const filteredTests = tests.filter(t => {
      const testInChain = selectedChainTemplateTests.find((element) => {
        return element.id === t.test_id
      });
      return !testInChain
    });
    const options = filteredTests.map((test) => {
      return {label: test.test_name, value: test}
    });
    return [
      <ol>
        <SearchBar
          options={options}
          onOptionClick={this.props.testBlockClicked}
        />
        {filteredTests.map((test, idx) => {
          return (
            <div className='use-test-button' onClick={() => {
              this.props.testBlockClicked(test)
            }} key={idx}>
              <TestBlock id={test.test_id} name={test.test_name} description="" showArrow={false}/>
            </div>
          )
        })}
      </ol>
    ]
  }
}

export default TestsList
