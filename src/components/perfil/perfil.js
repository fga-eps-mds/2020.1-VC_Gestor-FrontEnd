import React from "react";
import "./perfil.css";
import apiUser from "../../services/apiUser";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      surname: "",
      name: "",
      email: "",
      stateSwitch:0,
    };
    this.getUser = this.getUser.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEditUser = this.handleEditUser.bind(this)

  }

  componentDidMount() {
    this.getUser()
  }

  handleChange(event) {
    if (event.target.id === "username") {
      this.setState({ username: event.target.value });
    } else if (event.target.id === "name") {
      this.setState({ name: event.target.value });
    } else if (event.target.id === "surname") {
      this.setState({ surname: event.target.value });
    } else if (event.target.id === "email") {
      this.setState({ email: event.target.value });
    }
  }

  async getUser() {
    apiUser.post("users/user/getUser/", { token: JSON.parse(localStorage.getItem("auth")).token })
      .then((response) => {
        this.setState(response.data);
        this.setState({stateSwitch:1});
      })
      .catch((error) => {
        try {
          alert(error.response.data.error);
        } catch (error) {
          alert("Servidor indisponível");
        }
        this.setState({stateSwitch:1});
      });
  }

  async handleEditUser(){
    this.setState({stateSwitch:0})
    await apiUser.post("users/user/edit/", {
      token: JSON.parse(localStorage.getItem("auth")).token,
      username: this.state.username,
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
    })
      .then((response) => {
        localStorage.setItem("auth", JSON.stringify({
          token: response.data.newToken,
          logged: true
        }));
      })
      .catch((error) => {
        try {
          alert(error.response.data.error);
        } catch (error) {
          alert("Servidor indisponível");
        }
      });
    this.setState({stateSwitch:1})
  }

  loading = () => {
    return (<>
      <img src="loading.gif" alt="loading1" />
    </>);
  }

  editUser = () => {
    return (<>
      <div style={{marginTop:"1em"}} id="labels-User"><label for="username">Nome de Usuário:</label></div>
      <input type="text" id="username" value={this.state.username} onChange={this.handleChange} className="form-control login-input" placeholder="Nome de Usuário" />
      <div id="labels-User"><label for="name">Primeiro Nome:</label></div>
      <input type="text" id="name" value={this.state.name} onChange={this.handleChange} className="form-control login-input" placeholder="Primeiro nome" />
      <div id="labels-User"><label for="surname">Sobrenome:</label></div>
      <input type="text" id="surname" value={this.state.surname} onChange={this.handleChange} className="form-control login-input" placeholder="Sobrenome" />
      <div id="labels-User"><label for="email">Email:</label></div>
      <input type="text" id="email" value={this.state.email} onChange={this.handleChange} className="form-control login-input" placeholder="Email" />
      <button className="btn btn-block button-next" onClick={this.handleEditUser}>Enviar Alterações</button>
    </>);
  }

  switchRender = () => {
    switch (this.state.stateSwitch) {
      case 0:
        return this.loading();
      default:
        return this.editUser();
    }
  }

  render() {
    return (
      <div className="login">
        <div className="login-form">
          {this.switchRender()}
        </div>
      </div>
    );
  }
}

export default Login;
