import React from "react";
import apiUser from "../../services/apiUser";
import "./Login.css";
import { withRouter } from "react-router-dom";


class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    // BUSCAR TOKEN
    // http://172.25.0.3:3000/sessions POST
    // body.json = { "username": "admin",	"password": "123456" }
    // retorna user e o token

    // BUSCAR USUARIO
    // http://172.25.0.3:3000/users/id POST
    // body.json = { "username": "admin" }
    // retorna user

    // CRIAR USUARIO
    // http://172.25.0.3:3000/users POST
    // body.json = { "username": "TESTE", 	"user_id": "4",	"name": "teste", "surname": "teste", "password": "123456" }
    // retorna user 

  handleChange(event){
    if(event.target.id === "username"){
      this.setState({username: event.target.value});
    }
    if(event.target.id === "password"){
      this.setState({password: event.target.value});
    }
  }

  async handleSubmit(event){
    event.preventDefault();

    const login = this.state;

    try{
      const response = await apiUser.post("sessions", login)

      const token = response.data.token;
      localStorage.setItem("auth",JSON.stringify({
        token,
        logged:true
      }))
      this.props.history.push("/Home");
    } catch (err) {
      console.log(err)
      alert( "Usuario/senha incorreto!");
    }

  }

  render(){
    return(
      <div className="login">
        <div className="login-form">
          <form onSubmit={this.handleSubmit}>
            <img src="logo_blue.png" alt="UnB" className = "logo"/>
            <input type="text" id="username" value={this.state.username} onChange={this.handleChange} className="form-control login-input" placeholder="Nome de Usuário" />
            <input type="password" id="password" value={this.state.password} onChange={this.handleChange} className="form-control login-input" placeholder="Senha" />
            <button className="btn btn-block button-next"  type="submit">Entrar</button>
          </form>
        </div>
      </div>
    );  
  }
}

export default withRouter(Login);
