import  React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt, faAngleDoubleRight , faAngleDoubleLeft} from "@fortawesome/free-solid-svg-icons";
import "./gerenciamentoNoticias.css";
import apiNoticias from "../../services/apiNoticias";
import { Redirect } from "react-router-dom";

class GerenciamentoNoticias extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showNewsEdit: false,
      news: [],
      showNews: [],
      idNews: null,
      perPage : 10,
      totalPages: [],
      paginaAtual: 0,
      offset: 0
    }
  }

  async getNews(){
    const response = await apiNoticias.get("news");
    
    const total = Math.ceil(response.data.length/this.state.perPage)
    // const numRows = response.data.length;
    // console.log( response.data);
    const arrayPages = [];
    for (let i = 0; i < total; i++){
      arrayPages.push(i);
    }
    
    this.setState({
       news: response.data,
       totalPages: arrayPages,
       showNews: response.data.slice(0, this.state.perPage),
      });
    // console.log(this.state.showNews)
  }

  componentDidMount(){
    this.getNews();
  }

  showNews(event){
    this.setState({
      showNewsEdit: true,
      idNews: event.news_id
    });
  }

  currentPage(event){
    this.setState({
      paginaAtual: event,
      offset: event * this.state.perPage
    }, () => {
      this.loadMoreData()
  });
  }

  loadMoreData(){
    const data = this.state.news;
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			showNews: slice
    })
    return this.forceUpdate();
  }

  render() {
    return (<>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Header className="titulo-card" >Gerenciamento de Notícias</Card.Header>
          <Card.Text>
            <table className="tabela-noticias">
                <thead>
                    <tr className="tabela-noticias-cab">
                        <th scope="col">#Id</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Descrição</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                  
                  {this.state.showNews.map(news => (
                    <>
                    <tr key={news.id}>
                      <td>{news.news_id}</td>
                      <td>{news.title}</td>
                      <td>{news.text}</td>
                      <td style={{textAlign: "end"}}>
                        <FontAwesomeIcon icon={faPen} style={{ width: "20px", marginRight: "10px", color: "#438ABB", cursor: "pointer"}} 
                         onClick={() => this.showNews(news)}/>
                        <FontAwesomeIcon icon={faTrashAlt} style={{ width: "20px", marginRight: "10px", color: "#438ABB"}}/>
                      </td>
                    </tr>
                    </>))}
                </tbody>
                  <nav>
                    <ul class="pagination" style={{backgroundColor: "#438ABB"}}>
                      <li class="page-item page-link pagination-button">
                        <FontAwesomeIcon icon={faAngleDoubleLeft} style={{ width: "20px", marginRight: "5px"}}
                          onClick={() => (this.state.paginaAtual !== 0) ?
                            this.currentPage(this.state.paginaAtual - 1) : null}/>
                        </li>
                        {this.state.totalPages.map(page => (
                          <li class="page-item page-link pagination-button" style={page === this.state.paginaAtual ? {backgroundColor: "#E2E2E2", color: "#438ABB"} : null}
                          onClick={() => this.currentPage(page)}>{page+1}</li>  
                        ))}
                        <li class="page-item page-link pagination-button">
                          <FontAwesomeIcon icon={faAngleDoubleRight} style={{ width: "20px", marginRight: "5px"}}
                            onClick={() => (this.state.paginaAtual !== this.state.totalPages.length - 1) ?
                              this.currentPage(this.state.paginaAtual + 1) : null}/>
                        </li>
                    </ul>
                  </nav>
            </table>
            {this.state.showNewsEdit ? <Redirect to={{pathname: `/NewsEdit/${this.state.idNews}`}}/> : null}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
    );
  }
}

export default GerenciamentoNoticias;
