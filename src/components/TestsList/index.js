import React from 'react'
import TestBlock from '../TestBlock'

class TestsList extends React.Component {
    componentDidMount() {
        this.props.fetchTests();
    }

    render() {
        const tests = this.props.tests || []
        return (
            <ol>
                {tests.map(test => {
                    return (
                        <div key={test.test_id} onClick={() => {this.props.testBlockClicked(test)}}>
                            <TestBlock id={test.test_id} name={test.test_name} description=""/>
                        </div>
                    )
                })}
            </ol>
        )
    }
}

export default TestsList