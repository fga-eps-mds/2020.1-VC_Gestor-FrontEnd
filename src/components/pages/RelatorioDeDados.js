import React from "react";
//import { Card } from "react-bootstrap";
import "./RelatorioDeDados.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faThumbsUp, faCommentAlt, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import apiPostagem from "../../services/apiPostagem";
import { Link, Redirect } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class RelatorioDeDados extends React.Component {

  constructor(props) {
    super(props);
    this.today = new Date();
    this.dateShow = new Date(this.today.getFullYear(), 0, 1);
    this.state = {
      posts: [],
      newPosts: null,
      newPostsAnon: null,
      likes: null,
      totalUsers: null,
      tableRank: [],
      active: "anual",
      showPostId: false,
      idPost: null,
      typeGraph: 0,
    };
  }

  async componentDidMount() {
  console.log("########################################################################################")
    // const limit = 100;
    // const page = 0;
    // var response = await apiPostagem.get(`posts?limit=${limit}&page=${page}`);
    let graph = await apiPostagem.get("postage/graphs/dados");
    console.log("########################################################################################")
    console.log("####################### ",graph)
    this.setState({ graph: graph.data.data });
    // const data = response.data.rows;
    // var newPosts = data.filter((e) => { return e.dt_creation >= this.dateShow.toISOString(); });
    // var tableRank = newPosts.sort((a, b) => { return a["likes"] < b["likes"] ? 1 : -1; });
    // var users = tableRank.map((user) => user.user.user_id);
    // var soma = 0;
    // tableRank.forEach((valor) => { return soma += parseInt(valor.likes, 10); });
    // this.setState({
    //   posts: data,
    //   newPosts: newPosts.length,
    //   tableRank: tableRank.slice(0, 10),
    //   likes: soma,
    //   totalUsers: users.filter((user, i) => users.indexOf(user) === i).length,
    //   date: new Date()
    // });
  }

  changeDate(event, dia, type) {
    this.dateShow = event;
    var newPostsCount = this.state.posts.filter((e) => { return e.dt_creation >= event.toISOString(); });
    var newTableRank = newPostsCount.sort((a, b) => { return a["likes"] < b["likes"] ? 1 : -1; });
    var likesCount = 0;
    // newTableRank.map(valor => {return likesCount += parseInt(valor.likes, 10);});
    newTableRank.forEach((valor) => { return likesCount += parseInt(valor.likes, 10); });
    this.setState({
      newPosts: newPostsCount.length,
      tableRank: newTableRank.slice(0, 10),
      likes: likesCount,
      active: dia,
      typeGraph: type 
    });
  }

  showPost(id) {
    this.setState({
      showPostId: true,
      idPost: id
    });
  }

  render() {
    let data = [[0, 0]];
    if (this.state.graph !== undefined) {
      switch (this.state.typeGraph) {
        case 0:
          data = this.state.graph.anual;
          break;
        case 1:
          data = this.state.graph.mensal;
          break;
        case 2:
          data = this.state.graph.semanal;
          break;
        case 3:
          data = this.state.graph.diario;
          break;
        default:
          break;
      }
    }
    let that = this;
    return (
      <div style={{ display: "inline", width: "98%" }}>
        <div class="row cards">
          {/* Card 1 */}
          <div class="col-sm-3">
            <div class="card card-1">
              <div class="card-body">
                <FontAwesomeIcon icon={faCommentAlt} style={{ width: "60px", height: "40px", float: "right", marginTop: "20px", color: "#226D9F", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }} />
                <h4 class="card-title">Novas Postagens</h4>
                <p class="card-text">
                  <h5>{this.state.newPosts}</h5>
                  <h6>{this.dateShow.getDate()}/{this.dateShow.getMonth() + 1}/{this.dateShow.getFullYear()}</h6>
                </p>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div class="col-sm-3">
            <div class="card card-2">
              <div class="card-body">
                <FontAwesomeIcon icon={faUserSecret} style={{ width: "40px", height: "40px", float: "right", marginTop: "20px", color: "#35a2eb", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }} />
                <h4 class="card-title">Novas Postagens Anônimas</h4>
                <p class="card-text">
                  <h5>0</h5>
                  <h6>{this.dateShow.getDate()}/{this.dateShow.getMonth() + 1}/{this.dateShow.getFullYear()}</h6>
                </p>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div class="col-sm-3">
            <div class="card card-3">
              <div class="card-body">
                <FontAwesomeIcon icon={faThumbsUp} style={{ width: "60px", height: "40px", float: "right", marginTop: "20px", color: "#35a2eb", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" }} />
                <h4 class="card-title">Novos Votos de Apoio</h4>
                <p class="card-text">
                  <h5>{this.state.likes}</h5>
                  <h6>{this.dateShow.getDate()}/{this.dateShow.getMonth() + 1}/{this.dateShow.getFullYear()}</h6>
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
                  <h6 style={{ color: "rgba(0, 0, 0, .0)" }}>{this.dateShow.getDate()}</h6>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* parte do grafico */}

        <div class="row cards" style={{height:"500px"}}>
          {/* Card 1 */}
          <div class="col-8" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div class="card text-center"  id="graph" >
              <div class="card-header card-dates">
                <div id="title-header">Gráfico de Registros</div>
                <ul class="nav nav-pills card-header-tabs">
                  <li class="nav-item" style={"hoje" === this.state.active ? { textDecoration: "underline" } : null}>
                    <a class="nav-link" aria-current="true" href="#!"
                      onClick={() => this.changeDate(new Date(this.today.getTime() - 1000 * 60 * 60 * 24), "hoje", 3)}>
                      <span>Hoje</span>
                    </a>
                  </li>
                  <li class="nav-item" style={"semanal" === this.state.active ? { textDecoration: "underline" } : null}>
                    <a class="nav-link" href="#!" onClick={() => this.changeDate(new Date(this.today.getTime() - 1000 * 60 * 60 * 24 * 7), "semanal", 2)}>
                      <span>Semanal</span>
                    </a>
                  </li>
                  <li class="nav-item" style={"mensal" === this.state.active ? { textDecoration: "underline" } : null}>
                    <a class="nav-link" href="#!" onClick={() => this.changeDate(new Date(new Date().setMonth(this.today.getMonth() - 1)), "mensal", 1)}>
                      <span>Mensal</span>
                    </a>
                  </li>
                  <li class="nav-item" style={"anual" === this.state.active ? { textDecoration: "underline" } : null}>
                    <a class="nav-link" href="#!" onClick={() => this.changeDate(new Date(new Date().setFullYear(this.today.getFullYear() - 1)), "anual", 0)}>
                      <span>Anual</span>
                    </a>
                  </li>
                </ul>
              </div>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                      chart: {
                        events: {
                          load: () => {
                            that.graph = this;
                          }
                        }
                      },
                      xAxis: {
                        type: "datetime",
                      },
                      title: {
                        text: ""
                      },
                      yAxis: {
                        title: false
                      },
                      series: [{
                        marker:{
                          enabled:false
                        },
                        showInLegend: false,
                        data
                      }]
                    }}
                  />
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

                {this.state.tableRank.slice(0,5).map((post) => (
                  <>
                    <tr key={post.id} onClick={() => this.showPost(post.post_id)}>
                      <td >{post.post_id}</td>
                      <td >{post.description}</td>
                      <td >{post.likes}</td>
                    </tr>
                  </>))}
              </tbody>
            </table>
            {this.state.showPostId ? <Redirect to={{ pathname: `/Anuncio/${this.state.idPost}` }} /> : null}
            <div style={{ float: "right", fontSize: "16px" }}>
              <Link to="/TabelaPosts">Visualizar todos</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RelatorioDeDados;
