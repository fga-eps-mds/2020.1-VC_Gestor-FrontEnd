import React from "react";
import { Card } from "react-bootstrap";
import "./RelatorioDeDados.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faThumbsUp, faCommentAlt, faUserSecret} from "@fortawesome/free-solid-svg-icons";

class RelatorioDeDados extends React.Component {

  render() {
    return (<>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Header>Relatorio De Dados</Card.Header>
          <Card.Text>

            <div class="row cards">
              {/* Card 1 */}
              <div class="col-sm-3">
                <div class="card card-1">
                  <div class="card-body">
                    <FontAwesomeIcon icon={faCommentAlt} style={{ width: "60px", height: "40px", float: "right", marginTop: "20px", color: "#226D9F", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"}} />
                    <h4 class="card-title">Novas Postagens</h4>
                    <p class="card-text">
                      With supporting.
                    </p>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div class="col-sm-3">
                <div class="card card-2">
                  <div class="card-body">
                    <FontAwesomeIcon icon={faUserSecret} style={{ width: "60px", height: "40px", float: "right", marginTop: "20px", color: "#35a2eb", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"}} />
                    <h4 class="card-title">Novas Postagens Anônimas</h4>
                    <p class="card-text">
                      With supporting text below as a natural lead-in to additional content.
                    </p>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div class="col-sm-3">
                <div class="card card-3">
                  <div class="card-body">
                    <FontAwesomeIcon icon={faThumbsUp} style={{ width: "60px", height: "40px", float: "right", marginTop: "20px", color: "#35a2eb", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"}} />
                    <h4 class="card-title">Novos Votos de Apoio</h4>
                    <p class="card-text">
                      With supporting text below as a natural lead-in to additional content.
                    </p>
                  </div>
                </div>
              </div>
              {/* Card 4 */}
              <div class="col-sm-3">
                <div class="card card-4">
                  <div class="card-body">
                    <FontAwesomeIcon icon={faUsers} style={{ width: "60px", height: "40px", float: "right", marginTop: "20px", color: "#a7d8f9", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }} />
                    <h4 class="card-title">Total de Usuários</h4>
                    <p class="card-text">
                      With supporting text below as a natural lead-in to additional content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* parte do grafico */}

            <div class="row cards">
              {/* Card 1 */}
              <div class="col-8">
                              <div class="card text-center">
                    <div class="card-header">
                      <ul class="nav nav-pills card-header-tabs">
                        <li class="nav-item">
                          <a class="nav-link active" aria-current="true" href="#!">Active</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#!">Link</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link disabled" href="#!" tabindex="-1" aria-disabled="true"
                            >Disabled</a>
                        </li>
                      </ul>
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">Special title treatment</h5>
                      <p class="card-text">
                        With supporting text below as a natural lead-in to additional content.
                      </p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                  </div>
                  {/* rank */}
                  <div class="col-4 rank">
                    <h4>Registros com o maior apoio</h4>                     
                  <table className="table-rank">
                    <thead>
                      <tr className="rank-cab">
                        <th scope="col">ID</th>
                        <th scope="col">Apoiadores</th>
                        <th scope="col">Tag</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
            </div>

          </Card.Text>
        </Card.Body>
      </Card>
    </>
    );
  }
}

export default RelatorioDeDados;
