import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Row, Col, Navbar, NavDropdown } from "react-bootstrap";
import Sidebar from "./components/components/Sidebar";
import RelatorioDeDados from "./components/pages/RelatorioDeDados";
import RelatorioDeStatus from "./components/pages/RelatorioDeStatus";
import Option2 from "./components/pages/Option2";
import PostagemMenu from "./components/components/PostagemMenu";
import BeneficiosCriar from "./components/pages/BeneficiosCriar"
import Postagem from "./components/pages/Postagem";
import Tabela from "./components/pages/tabela";
import TabelaPosts from "./components/pages/TabelaPosts";
import Login from './components/login/Login'
import Home from './components/Home/home'
import p404 from './components/404/404'
import Registration from './components/login/Registration'
import loginHelper from './services/loginHelper'

const MyRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (<>
    {loginHelper.isLogged() ? <><Navbar style={{ backgroundColor: "#0F4C75", color: "white", borderBottom: "3px solid Silver", justifyContent: "center" }} >
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
    </Row> </>: <Login/>}
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
          <MyRoute exact path='/BeneficiosCriar' component={BeneficiosCriar} />
          <MyRoute exact path='/Option2' component={Option2} />
          <MyRoute exact path='/PostagemMenu' component={PostagemMenu} />
          <MyRoute exact path='/Postagem' component={Postagem} />
          <MyRoute exact path='/Login' component={Login} />
          <MyRoute exact path='/Registration' component={Registration} />
          <MyRoute exact path='/tabela' component={Tabela} />
          <MyRoute exact path='/TabelaPosts' component={TabelaPosts} />
          <MyRoute exact path='/Home' component={Home} />
          <MyRoute exact path='/' component={Home} />
          <MyRoute exact path='*' component={p404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
