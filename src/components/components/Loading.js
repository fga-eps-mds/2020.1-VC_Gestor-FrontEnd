import React from "react"
import { Spinner } from 'react-bootstrap'

class Loading extends React.Component {

    render() {
        if (this.props.show) {
            return (<div id="overlay" className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="primary" />
            </div>)
        } else {
            return (<div></div>)
        }
    }
}

export default Loading
