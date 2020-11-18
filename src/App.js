import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Row, Col, Navbar, NavDropdown } from "react-bootstrap";
import Sidebar from "./components/components/Sidebar";
import RelatorioDeDados from "./components/pages/RelatorioDeDados";
import RelatorioDeStatus from "./components/pages/RelatorioDeStatus";
import CreateNews from "./components/pages/CreateNews";
import GerenciamentoNoticias from "./components/pages/GerenciamentoNoticias";
import BeneficiosCriar from "./components/pages/BeneficiosCriar";
import TabelaPosts from "./components/pages/TabelaPosts";
import BeneficiosGerenciar from "./components/pages/BeneficiosGerenciar";
import BeneficiosEditar from "./components/pages/BeneficiosEditar";
import NewsEdit from "./components/pages/NewsEdit";
import Anuncio from "./components/pages/Anuncio";
import Login from "./components/login/Login";
import Home from "./components/Home/home";
import Perfil from "./components/perfil/perfil";
import p404 from "./components/404/404";
import Registration from "./components/login/Registration";
import { isLogged, logout } from "./services/loginHelper";
import { LinkContainer } from "react-router-bootstrap";


const MyRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (<>
    { isLogged() ? <>
    <Navbar style={{ backgroundColor: "#0F4C75", color: "white", borderBottom: "3px solid Silver", justifyContent: "center" }} >
      <div style={{ width: "30%" }}>
      </div>
      <a href="/" style={{ width: "55%", textAlign: "center", fontWeight: "600", fontFamily: "Big Shoulders Display", fontSize: "calc(28px + 6 * ((100vw - 320px) / 680))", color: "white", textDecoration: "none" }}>
        <img src={process.env.PUBLIC_URL + "/img/logobranca.png"} alt=" " style={{ width: "68px", height: "59", marginRight: "10px" }} />
        Vamos Cuidar
      </a>
      <div style={{ width: "15%", textAlign: "right" }}>
        <div class="dropdown">
          <div class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img style={{ width: "auto", height: "40px", marginRight: "20px" }} id="changeOnHover"  alt="" src={process.env.PUBLIC_URL + "/img/Vector.png"} /></div>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <LinkContainer to="/Perfil">
              <NavDropdown.Item style={{ color: "black" }}>Perfil</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <NavDropdown.Item style={{ color: "black" }} onClick={logout}>Logout</NavDropdown.Item>
          </div>
        </div>        
      </div>
    </Navbar>
    <Row style={{ width: "100%" }}>
      <Col xs={2} style={{ minWidth: "170px", maxWidth:"250px", backgroundColor: "white", borderRight: "1px solid Silver", minHeight: "calc(100vh - 85px)", height: "calc(100% - 86px)" }}>
        <Sidebar />
      </Col>
      <Col id="page-content-wrapper" style={{ marginTop:"15px", marginBottom:"15px", width: "80vw!important", justifyContent:"center", display: "flex" }}>
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
          <MyRoute exact path='/CreateNews' component={CreateNews} />
          <MyRoute exact path='/BeneficiosGerenciar' component={BeneficiosGerenciar} />
          <MyRoute exact path='/BeneficiosEditar/:benefitId' component={BeneficiosEditar} />
          <MyRoute exact path='/GerenciamentoNoticias' component={GerenciamentoNoticias} />
          <MyRoute exact path='/NewsEdit/:newsId' component={NewsEdit} />
          <MyRoute exact path='/Login' component={Login} />
          <MyRoute exact path='/Registration' component={Registration} />
          <MyRoute exact path='/TabelaPosts' component={TabelaPosts} />
          <MyRoute exact path='/Anuncio/:post_id' component={Anuncio} />
          <MyRoute exact path='/Home' component={Home} />
          <MyRoute exact path='/Perfil' component={Perfil} />
          <MyRoute exact path='/' component={Home} />
          <MyRoute exact path='*' component={p404} />

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
