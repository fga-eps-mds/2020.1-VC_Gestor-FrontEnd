import React from "react";
import ReactDOM from "react-dom";
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

  handleChange(event){
    if(event.target.id === "username"){
      this.setState({username: event.target.value});
    }
    if(event.target.id === "password"){
      this.setState({password: event.target.value});
    }
  }

  handleSubmit(event){
    event.preventDefault();

    const login = this.state;

    console.log(login);

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
            <p className="registration-text">Não possui conta? <a href="#">Crie</a> agora</p>
          </form>
        </div>
      </div>
    );  
  }
}

export default Login;
