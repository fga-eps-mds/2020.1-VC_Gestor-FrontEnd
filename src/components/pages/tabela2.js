import React from "react";
import { Card } from "react-bootstrap";

class Tabela2 extends React.Component {
constructor(props){
  super(props)
  this.state = [
    {
      id: 1,
      titulo: "Computador quebrado na sala s10",
      anunciante: "Jairo",
      departamento: "Manuntencao",
      status: "Em Aberto"
    },
    {
        id: 2,
        titulo: "Elevador nao funciona predio tal",
        anunciante: "Luiza",
        departamento: "Engenharia",
        status: "Em Aberto"
    },{
        id: 3,
        titulo: "Goteira sala i3",
        anunciante: "Joao",
        departamento: "Manuntencao",
        status: "Fechado"
    },{
        id: 4,
        titulo: "Problema 4",
        anunciante: "Pedro",
        departamento: "Limpeza",
        status: "Concluido",
    },    {
        id: 5,
        titulo: "Problema 5",
        anunciante: "Carlos",
        departamento: "Segunraca",
        status: "Em Aberto"
      },
      {
          id: 6,
          titulo: "Problema 6",
          anunciante: "Mateus",
          departamento: "Manuntencao",
          status: "Concluido"
      },{
          id: 7,
          titulo: "Problema 7",
          anunciante: "Jairo",
          departamento: "Engenharia",
          status: "Em Aberto"
      },{
          id: 8,
          titulo: "Problema 8",
          anunciante: "Jairo",
          departamento: "Limpeza",
          status: "Em Aberto"
      }
  ];
}


exibiLinhaFuncionando(){
  this.state.map(row =>( 
    <tr>
      <td>{row.id}</td>
      <td>{row.titulo}</td>
      <td>{row.anunciante}</td>
      <td>{row.departamento}</td>
      <td>{row.status}</td>
    </tr>
  ))
  };

  criarLinha2(item){
    const conteudoLinha = `
    <td>${item.id}</td>
    <td>${item.titulo}</td>
    <td>${item.anunciante}</td>
    <td>${item.departamento}</td>
    <td>${item.status}</td>
    `;
    return {conteudoLinha};
    };

    exibeLista2(){
      const ListaDesejada = (linhaRegistro, indice) => {
      return (
        <tr key={indice}>
          <td>{linhaRegistro.id}</td>
          <td>{linhaRegistro.titulo}</td>
          <td>{linhaRegistro.anunciante}</td>
          <td>{linhaRegistro.departamento}</td>
          <td>{linhaRegistro.status}</td>
        </tr>)
      }
      return ListaDesejada;
      }

  render() {
    return (<>
      <Card style={{ width: '100%' }}>
        <Card.Body>
            {/* aqi vem o titulo */}
          <Card.Header>
              <h2>Tabela</h2>
            </Card.Header>
            {/* aqui o corpo da tabela */}
          <Card.Text>
            <table class="table">
                <thead>
                    <tr>
                      <th scope="col">#Id</th>
                      <th scope="col">Titulo</th>
                      <th scope="col">Anunciante</th>
                      <th scope="col">Departamento</th>
                      <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody className = 'conteudo-tabela'>
                  {this.state.map(this.exibeLista2())
                  }
                </tbody>
            </table>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
    );
  }
}
export default Tabela2;