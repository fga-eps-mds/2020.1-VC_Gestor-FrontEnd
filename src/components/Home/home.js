import React from "react";
import "./home.css";


class Login extends React.Component {
  render() {
    return (
      <div style={{display:"flex", width:"100%",height:"100%", justifyContent:"center",marginTop:"100px"}}>
        <div className="login">
          <div className="login-form">
            Bem vindo!
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
