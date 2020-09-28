import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Row, Col, Navbar, NavDropdown } from "react-bootstrap";

import Sidebar from './components/components/Sidebar'
import RelatorioDeDados from "./components/pages/RelatorioDeDados"
import RelatorioDeStatus from "./components/pages/RelatorioDeStatus"
import Option1 from "./components/pages/Option1"
import Option2 from "./components/pages/Option2"
import PostagemMenu from './components/components/PostagemMenu';
import Postagem from './components/pages/Postagem'
import Login from './components/login/Login'
import Registration from './components/login/Registration'


const MyRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (<>
    <Navbar style={{ backgroundColor: "#0F4C75", color: "white", borderBottom: "3px solid Silver", justifyContent: "center" }} >
      <div style={{ width: "15%" }}>
      </div>
      <a href="/" style={{ width: "70%", textAlign: "center", fontWeight: "600", fontFamily: 'Big Shoulders Display', fontSize: "calc(28px + 6 * ((100vw - 320px) / 680))", color: "white", textDecoration: "none" }}>
        <img src={process.env.PUBLIC_URL + "/img/logobranca.png"} alt=" " style={{ width: "68px", height: "59", marginRight: "10px" }} />
        Vamos Cuidar
      </a>
      <div style={{ width: "15%", textAlign: "right" }}>
        <NavDropdown alignRight data-toggle="dropdown" title={
          <div className="pull-left"><img style={{ width: 'auto', height: '40px', marginRight: "10px" }} alt="" src={process.env.PUBLIC_URL + "/img/Vector.png"} /></div>}>
          <NavDropdown.Item style={{ color: "black" }}>Entrar</NavDropdown.Item>
          <NavDropdown.Item style={{ color: "black" }}>Anúncios</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item style={{ color: "#0F4C75" }}>Registrar</NavDropdown.Item>
        </NavDropdown>
      </div>
    </Navbar>
    <Row style={{ width: "100%" }}>
      <Col xs={2} style={{ minWidth: "170px", maxWidth:"250px", backgroundColor: "white", borderRight: "1px solid Silver", minHeight: "calc(100vh - 85px)", height: "calc(100% - 86px)" }}>
        <Sidebar />
      </Col>
      <Col id="page-content-wrapper" style={{ marginTop:"15px", marginBottom:"15px", width: "80vw!important", display:"flex", justifyContent:"center" }}>
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
          <MyRoute exact path='/RelatorioDeDados' component={RelatorioDeDados} />
          <MyRoute exact path='/RelatorioDeStatus' component={RelatorioDeStatus} />
          <MyRoute exact path='/Option1' component={Option1} />
          <MyRoute exact path='/Option2' component={Option2} />
          <MyRoute exact path='/PostagemMenu' component={PostagemMenu} />
          <MyRoute exact path='/Postagem' component={Postagem} />
          <Route path='/Login' ><Login /></Route>
          <Route path='/Registration'><Registration /></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
