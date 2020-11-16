import React from "react";
import { Card } from "react-bootstrap";
import "./RelatorioDeStatus.css";
import apiPostagem from "../../services/apiPostagem";
import { Link, Redirect } from "react-router-dom";

class RelatorioDeStatus extends React.Component {

  constructor(props){
    super(props);
    this.today = new Date();
    this.dateShow = new Date(this.today.getFullYear(),0,1);
    this.state = {
      posts: [],
      newPosts: null,
      newPostsAnon: null,
      likes: null,
      totalUsers: null,
      tableRank: [],
      active: "anual",
      showPostId: false,
      idPost: null
    };
}

  async componentDidMount() {
    const limit = 100;
    const page = 0;
    var response = await apiPostagem.get(`posts?limit=${limit}&page=${page}`);
    const data = response.data.rows;
    var newPosts = data.filter((e) => {return e.dt_creation >= this.dateShow.toISOString();});
    var tableRank = newPosts.sort((a, b) => {return a["likes"] < b["likes"] ? 1 : -1;});
    var users = tableRank.map((user) => user.user.user_id);
    var soma = 0;
    tableRank.forEach((valor) => {return soma += parseInt(valor.likes, 10);});
    this.setState({
      posts: data,
      newPosts: newPosts.length,
      tableRank: tableRank.slice(0,10),
      likes: soma,
      totalUsers: users.filter((user, i) => users.indexOf(user) === i).length,
      date: new Date()
    });
    }

    changeDate(event, dia){
      if(event === "semana"){
        var week = new Date();
        week.setDate(week.getDate() - 7);
        event = week;
        this.dateShow = event;
      }
      this.dateShow = event;
      var newPostsCount = this.state.posts.filter((e) => {return e.dt_creation >= event.toISOString();});
      var newTableRank = newPostsCount.sort((a, b) => {return a["likes"] < b["likes"] ? 1 : -1;});
      var likesCount = 0;
      // newTableRank.map(valor => {return likesCount += parseInt(valor.likes, 10);});
      newTableRank.forEach((valor) => {return likesCount += parseInt(valor.likes, 10);});
      this.setState({
        newPosts: newPostsCount.length,
        tableRank: newTableRank.slice(0,10),
        likes: likesCount,
        active: dia
        // totalUsers: users.filter((user, i) => users.indexOf(user) === i).length,
        // date: new Date()
      });
    }


  render() {
    return (<>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          {/* <Card.Header className="titulo-relatorio">Relatório de Status</Card.Header> */}
          <Card.Text>

            <div class="row cards">
              {/* Card 1 */}
              <div class="col-sm-3">
                <div class="card card1Status">
                  <div class="card-body">
                    <h4 class="card-title">Publicações Aguardando</h4>
                    <p class="card-text">
                      <h5>{this.state.newPosts}</h5>
                      <h6>{this.dateShow.getDate()}/{this.dateShow.getMonth() + 1}/{this.dateShow.getFullYear()}</h6>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div class="col-sm-3">
                <div class="card card2Status">
                  <div class="card-body">
                    <h4 class="card-title">Publicações em Andamento</h4>
                    <p class="card-text">
                      <h5>0</h5>
                      <h6>{this.dateShow.getDate()}/{this.dateShow.getMonth() + 1}/{this.dateShow.getFullYear()}</h6>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div class="col-sm-3">
                <div class="card card3Status">
                  <div class="card-body">
                    <h4 class="card-title">Publicações Resolvidas</h4>
                    <p class="card-text">
                      <h5>{this.state.likes}</h5>
                      <h6>{this.dateShow.getDate()}/{this.dateShow.getMonth() + 1}/{this.dateShow.getFullYear()}</h6>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Card 4 */}
              <div class="col-sm-3">
                <div class="card card4Status">
                  <div class="card-body">
                    <h4 class="card-title">Publicações Arquivadas</h4>
                    <p class="card-text">
                      <h5>{this.state.totalUsers}</h5>
                      <h6 style={{color: "rgba(0, 0, 0, .0)"}}>{this.dateShow.getDate()}</h6>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Fim dos cards */}

          </Card.Text>
        </Card.Body>
      </Card>
    </>
    );
  }
}

export default RelatorioDeStatus;
