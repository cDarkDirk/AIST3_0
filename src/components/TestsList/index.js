import React from 'react'
import TestBlock from '../TestBlock'

import './style.css'
import {selectChainTemplate} from "../../actions";
import chainTemplateReducer from "../../reducers/chainTemplates";

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
            })
            return !testInChain
        } )
        /// filter this.props.tests to only have the tests that are not in this.props.selectedChainTemplate.tests
        return (
            <ol>
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
        )
    }
}

export default TestsList
