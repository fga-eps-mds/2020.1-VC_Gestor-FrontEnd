import React from "react";
import apiUser from "../../services/apiUser";
import "./Login.css";


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

    // http://172.25.0.3:3000/sessions POST
    // body.json = { "username": "admin",	"password": "123456" }
    // retorna user e o token

    // http://172.25.0.3:3000/users GET
    // body.json = { "username": "admin" }
    // retorna user

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

      console.log(token);
    } catch (err) {
      alert( "Usuario/senha incorreto!" );
      this.setState({username: ""});
      this.setState({password: ""});
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

export default Login;
