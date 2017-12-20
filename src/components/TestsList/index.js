import React from 'react'

class TestsList extends React.Component {
    componentDidMount() {
        this.props.fetchTests();
    }
    render() {
        const tests = this.props.tests || []
        return(
            <ol>
                {tests.map(test => {
                    return (
                        <li type="circle">{test.test_name}</li>
                    )
                })}
            </ol>
        )
    }
}
export default TestsList