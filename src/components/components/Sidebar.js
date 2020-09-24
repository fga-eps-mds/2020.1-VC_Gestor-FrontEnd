import React from "react"
import { Nav } from 'react-bootstrap'



class Sidebar extends React.Component {

    render() {
        return (<>
            <Nav className="col-md-12 d-md-block sidebar" >
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link href="/404">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/405">Link</Nav.Link>
                </Nav.Item>
            </Nav>
        </>)
    }
}

export default Sidebar
