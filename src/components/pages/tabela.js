import React from "react";
import { Card } from "react-bootstrap";

// await api.port('posts', { post_id, title, description, status });

class Tabela extends React.Component {

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
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">#Id</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Anunciante</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Status</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Computador quebrado na sala s10</td>
                        <td>Joao</td>
                        <td>Manuntencao</td>
                        <td>Em Aberto</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Bebedouro nao funciona</td>
                        <td>Luiza</td>
                        <td>Manuntencao</td>
                        <td>Em Processo</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Elevador estragado</td>
                        <td>Pedro</td>
                        <td>Engenharia</td>
                        <td>Concluido</td>
                    </tr>
                </tbody>
            </table>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
    );
  }
}

export default Tabela;
