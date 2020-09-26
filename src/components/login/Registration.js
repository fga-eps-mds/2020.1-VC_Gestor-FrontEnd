import React from "react"
import ReactDOM from 'react-dom';
import './Login.css'

function Login(){
  return(
    <div class='login'>
      <div class="login-form">
        <form>
          <img src="logo_blue.png" alt="UnB" class = "logo"/>
          <input type="text" id="name" class="form-control login-input" placeholder="Nome" />
          <input type="email" id="email" class="form-control login-input" placeholder="Email" />
          <input type="password" id="password" class="form-control login-input" placeholder="Senha" />
          <button class="btn btn-block button-next" type="submit">Criar</button>
          <p class="registration-text">Já possui conta? <a href="#">Entre</a> agora</p>
        </form>
      </div>
    </div>

  );
}

export default Login;
