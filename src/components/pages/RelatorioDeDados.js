import React from "react";
import { Card } from "react-bootstrap";
import "./RelatorioDeDados.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faThumbsUp, faCommentAlt, faUserSecret} from "@fortawesome/free-solid-svg-icons";
import apiPostagem from "../../services/apiPostagem";

class RelatorioDeDados extends React.Component {

  constructor(props){
    super(props)
    this.state = { 
      newPosts: [],
      newPostsAnon: null,
      likes: null,
      totalUsers: null,
      tableRank: []
    };
}

  async componentDidMount() {
    const limit = 100;
    const page = 0;
    var response = await apiPostagem.get(`posts?limit=${limit}&page=${page}`);
    // console.log(response.data);
    // console.log(response.data.rows[response.data.count - 1].dt_creation);
    // console.log(response.data.rows.sort((a, b) => {
    //   return a["likes"] < b["likes"] ? 1 : -1}));
    var newPosts = [...this.state.newPosts]
    var tableRank = response.data.rows.sort((a, b) => {return a["likes"] < b["likes"] ? 1 : -1});
    var users = tableRank.map(e => e.user.user_id);
    newPosts.push(response.data.count);
    newPosts.push(response.data.rows[response.data.count - 1].dt_creation);
    var soma = 0;
    tableRank.map(valor => {return soma += parseInt(valor.likes, 10);});
    this.setState({
      newPosts: newPosts,
      tableRank: tableRank.slice(0,10),
      likes: soma,
      totalUsers: users.filter((user, i) => users.indexOf(user) === i).length
    });
    }

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
                      <h5>{this.state.newPosts[0]}</h5>
                      <h6>{this.state.newPosts[1]}</h6>
                    </p>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div class="col-sm-3">
                <div class="card card-2">
                  <div class="card-body">
                    <FontAwesomeIcon icon={faUserSecret} style={{ width: "40px", height: "40px", float: "right", marginTop: "20px", color: "#35a2eb", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"}} />
                    <h4 class="card-title">Novas Postagens Anônimas</h4>
                    <p class="card-text">
                      With supporting text
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
                      <h5>{this.state.likes}</h5>
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
                      <h5>{this.state.totalUsers}</h5>
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
                          <a class="nav-link active" aria-current="true" href="#!"> <span>Active</span></a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#!"> <span>Link</span>
                            </a>
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
                      <a href="#!" class="btn btn-primary"><span>Go somewhere</span></a>
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
                        <th scope="col">Likes</th>
                      </tr>
                    </thead>
                    <tbody>

                      {this.state.tableRank.map(post => (
                      <>
                      <tr key={post.id}>
                        <td >{post.post_id}</td>
                        <td >{post.description}</td>
                        <td >{post.likes}</td>
                      </tr>
                      </>))}


                      {/* <tr>
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
                      </tr> */}
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
