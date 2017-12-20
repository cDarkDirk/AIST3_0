import React from 'react'
import TestBlock from '../TestBlock'

import './style.css'

class TestsList extends React.Component {
    componentDidMount() {
        this.props.fetchTests();
    }

    render() {
        const tests = this.props.tests || []
        return (
            <ol>
                {tests.map((test, idx) => {
                    return (
                        <div className='use-test-button' onClick={() => {this.props.testBlockClicked(test)}} key={idx}>
                            <TestBlock id={test.test_id} name={test.test_name} description="" showArrow={false}/>
                        </div>
                    )
                })}
            </ol>
        )
    }
}

export default TestsList
