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
                        <div onClick={() => {this.props.testBlockClicked(test)}}>
                            <TestBlock id={test.id} name={test.name} description=""/>
                        </div>
                    )
                })}
            </ol>
        )
    }
}

export default TestsList