import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import './App.css';
import { Row, Col, Navbar } from "react-bootstrap";

import Sidebar from '../components/Sidebar'
import Error404 from "../components/Error404"
import Error405 from "../components/Error405"

const MyRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (<>
    <Navbar style={{backgroundColor:"black", color:"white",borderBottom:"3px solid Silver"}}>
      oi
    </Navbar>
      <Row >
        <Col xs={2} id="sidebar-wrapper" style={{ backgroundColor: "whitesmoke",borderRight:"1px solid Silver"}} class="sidebarcss">
          <Sidebar />
        </Col>
        <Col xs={10} id="page-content-wrapper">
          <Component {...props} />
        </Col>
      </Row>
  </>)
  } />
)

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <MyRoute exact path='/404' component={Error404} />
          <MyRoute exact path='*' component={Error405} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;