import React from "react";
import apiUser from "../../services/apiUser";
import "./Login.css";
import { withRouter } from "react-router-dom";
const crypto = require("crypto");

function makeHash(Password) {
  return crypto.createHash("sha256").update(Password, "utf8").digest().toString("hex");
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      code: "",
      token: "",
      newPassword: "",
      newPasswordConfirm: "",
      stateSwitch: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleCode = this.handleCode.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
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

  handleChange(event) {
    if (event.target.id === "username") {
      this.setState({ username: event.target.value });
    } else if (event.target.id === "password") {
      this.setState({ password: event.target.value });
    } else if (event.target.id === "email") {
      this.setState({ email: event.target.value });
    } else if (event.target.id === "code") {
      this.setState({ code: event.target.value });
    } else if (event.target.id === "newPassword") {
      this.setState({ newPassword: event.target.value });
    } else if (event.target.id === "newPasswordConfirm") {
      this.setState({ newPasswordConfirm: event.target.value });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const login = {
      password: makeHash(this.state.password),
      username: this.state.username
    };

    try {
      const response = await apiUser.post("sessions", login);

      const token = response.data.token;
      localStorage.setItem("auth", JSON.stringify({
        token,
        logged: true
      }));
      this.props.history.push("/Home");
    } catch (err) {
      alert("Usuario/senha incorreto!");
    }

  }

  async handleEmail() {
    this.setState({ stateSwitch: -1 });
    apiUser.post("users/user/", { email: this.state.email })
      .then((response) => {
        this.setState({ stateSwitch: 2 });
      })
      .catch((error) => {
        try {
          this.setState({ stateSwitch: 1 });
          alert(error.response.data.error);
        } catch (error) {
          this.setState({ stateSwitch: 1 });
          alert("Servidor indisponível");
        }
      });
  }

  async handleCode() {
    this.setState({ stateSwitch: -1 });
    apiUser.post("users/user/code/", { email: this.state.email, code: this.state.code })
      .then((response) => {
        this.setState({ token: response.data.token, stateSwitch: 3 });
      })
      .catch((error) => {
        try {
          this.setState({ stateSwitch: 2 });
          alert(error.response.data.error);
        } catch (error) {
          this.setState({ stateSwitch: 2 });
          alert("Servidor indisponível");
        }
      });
  }

  async handleChangePassword() {
    if (this.state.newPassword !== this.state.newPasswordConfirm) {
      alert("Confirme a senha corretamente!");
      return;
    }
    if (this.state.newPassword.length < 6) {
      alert("A senha deve possuir pelo menos 6 caracteres!");
      return;
    }
    this.setState({ stateSwitch: -1 });
    apiUser.post("users/user/password/", { newPassword: makeHash(this.state.newPassword), token: this.state.token })
      .then((response) => {
        alert("Sucesso! Por favor, faça login com a nova senha!");
      })
      .catch((error) => {
        try {
          alert(error.response.data.error);
        } catch (error) {
          alert("Servidor indisponível");
        }
      });
    this.setState({ stateSwitch: 0 });
  }

  login = () => {
    return (<>
      <form onSubmit={this.handleSubmit}>
        <img src="logo_blue.png" alt="UnB" className="logo" />
        <input type="text" id="username" value={this.state.username} onChange={this.handleChange} className="form-control login-input" placeholder="Nome de Usuário" />
        <input type="password" id="password" value={this.state.password} onChange={this.handleChange} className="form-control login-input" placeholder="Senha" />
        <button className="btn btn-block button-next" type="submit">Entrar</button>
      </form>
      <div className="reset" onClick={() => { this.setState({ stateSwitch: 1 }); }}>Esqueceu a sua senha?</div>
    </>);
  }

  sendCode = () => {
    return (<>
      <img src="logo_blue.png" alt="UnB" className="logo" />
      <div style={{ color: "red", marginTop: "10px" }}>Digite seu email para trocar de senha</div>
      <input type="email" id="email" value={this.state.email} onChange={this.handleChange} className="form-control login-input" placeholder="Email" />
      <button className="btn btn-block button-next" onClick={this.handleEmail}>Enviar</button>
      <div className="reset" onClick={() => { this.setState({ stateSwitch: 0 }); }}>Voltar</div>
    </>);
  }

  confirmCode = () => {
    return (<>
      <img src="logo_blue.png" alt="UnB" className="logo" />
      <div style={{ color: "red", marginTop: "10px" }}>Digite o código que recebeu via email. O código expira em 15 minutos</div>
      <input type="text" id="code" value={this.state.code} onChange={this.handleChange} className="form-control login-input" placeholder="Código" />
      <button className="btn btn-block button-next" onClick={this.handleCode}>Enviar</button>
      <div className="reset" onClick={() => { this.setState({ stateSwitch: 0 }); }}>Voltar</div>
    </>);
  }

  loading = () => {
    return (<>
      <img src="loading.gif" alt="loading1" />
    </>);
  }

  changePassword = () => {
    return (<>
      <img src="logo_blue.png" alt="UnB" className="logo" />
      <div style={{ color: "red", marginTop: "10px" }}>Escolha sua nova senha</div>
      <input type="password" id="newPassword" value={this.state.newPassword} onChange={this.handleChange} className="form-control login-input" placeholder="Nova Senha" />
      <input type="password" id="newPasswordConfirm" value={this.state.newPasswordConfirm} onChange={this.handleChange} className="form-control login-input" placeholder="Confirmação da Nova Senha" />
      <button className="btn btn-block button-next" onClick={this.handleChangePassword}>Enviar</button>
      <div className="reset" onClick={() => { this.setState({ stateSwitch: 0 }); }}>Voltar</div>
    </>);
  }

  switchRender = () => {
    switch (this.state.stateSwitch) {
      case 0:
        return this.login();
      case 1:
        return this.sendCode();
      case 2:
        return this.confirmCode();
      case 3:
        return this.changePassword();
      default:
        return this.loading();
    }
  }

  render() {
    return (
      <div className="login" style={{width:"100vw",height:"80vh",display:"flex",justifyContent:"center", alignItems:"center"}}>
        <div className="login-form">
          {this.switchRender()}
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
