import React from "react";
import "./Login.css";

class Registration extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      surname: "",
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    if(event.target.id === "name"){
      this.setState({name: event.target.value});
    }
    if(event.target.id === "surname"){
      this.setState({surname: event.target.value});
    }
    if(event.target.id === "username"){
      this.setState({username: event.target.value});
    }
    if(event.target.id === "password"){
      this.setState({password: event.target.value});
    }
  }

  handleSubmit(event){
    event.preventDefault();

    //const registration_form = this.state;

  }

  render(){
    return(
      <div className="login">
        <div className="login-form">
          <form onSubmit={this.handleSubmit} >
            <img src="logo_blue.png" alt="UnB" className = "logo"/>
            <input type="text" id="name" value={this.state.name} onChange={this.handleChange} className="form-control login-input" placeholder="Nome" />
            <input type="text" id="surname" value={this.state.surname} onChange={this.handleChange} className="form-control login-input" placeholder="Sobrenome" />
            <input type="text" id="username" value={this.state.username} onChange={this.handleChange} className="form-control login-input" placeholder="Nome de Usuário" />
            <input type="password" id="password" value={this.state.password} onChange={this.handleChange} className="form-control login-input" placeholder="Senha" />
            <button className="btn btn-block button-next" type="submit">Criar</button>
            <p className="registration-text">Já possui conta? <a href="#1">Entre</a> agora</p>
          </form>
        </div>
      </div>

    );
  }
}

export default Registration;
