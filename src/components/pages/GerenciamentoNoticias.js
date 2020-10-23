import React from "react";
import { Card, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt, faAngleDoubleRight , faAngleDoubleLeft} from "@fortawesome/free-solid-svg-icons";
import "./gerenciamentoNoticias.css";


class GerenciamentoNoticias extends React.Component {

  constructor(props){
    super(props)
    this.state = [{ 
      id: "01",
      titulo: "Novo Predio",
      corpo: "Criação de um novo prédio. O prédio será para os professores e alguns laboratorios."
    },{

      id: "02",
      titulo: "Novo Predio",
      corpo: "Criação de um novo prédio. O prédio será para os professores e alguns laboratorios."
    },{

      id: "03",
      titulo: "Novo Predio",
      corpo: "Criação de um novo prédio. O prédio será para os professores e alguns laboratorios."
    },{

      id: "04",
      titulo: "Novo Predio",
      corpo: "Criação de um novo prédio. O prédio será para os professores e alguns laboratorios."
    },{

      id: "05",
      titulo: "Novo Predio",
      corpo: "Criação de um novo prédio. O prédio será para os professores e alguns laboratorios."
    },{

      id: "06",
      titulo: "Novo Predio",
      corpo: "Criação de um novo prédio. O prédio será para os professores e alguns laboratorios."
    },{

      id: "07",
      titulo: "Novo Predio",
      corpo: "Criação de um novo prédio. O prédio será para os professores e alguns laboratorios."
    },{

      id: "08",
      titulo: "Novo Predio",
      corpo: "Criação de um novo prédio. O prédio será para os professores e alguns laboratorios."
    }
  ]
  }


  render() {
    return (<>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Header>GerenciamentoNoticias</Card.Header>
          <Card.Text>
            {console.log(this.state)}
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
                  
                  {this.state.map(news => (
                    <>
                    <tr key={news.id}>
                      <td >{news.id}</td>
                      <td >{news.titulo}</td>
                      <td >{news.corpo}</td>
                      <td>
                        <FontAwesomeIcon icon={faPen} style={{ width: "20px", marginRight: "10px", color: "#438ABB"}} />
                        <FontAwesomeIcon icon={faTrashAlt} style={{ width: "20px", marginRight: "10px", color: "#438ABB"}}/>
                      </td>
                    </tr>
                    </>))}
                </tbody>
                  {/* <Pagination className='pagination'>
                    <Pagination.First/>
                    <Pagination.Prev/>
                    <Pagination.Item style={{backgroundColor: "#438ABB"}}>1</Pagination.Item>
                    <Pagination.Item>2</Pagination.Item>
                    <Pagination.Next/>
                    <Pagination.Last/>
                  </Pagination> */}
                  <nav>
                    <ul class="pagination" style={{backgroundColor: "#438ABB"}}>
                      <li class="page-item page-link pagination-button">
                        <FontAwesomeIcon icon={faAngleDoubleLeft} style={{ width: "20px", marginRight: "5px"}}/>
                        </li>
                      <li class="page-item page-link pagination-button">1</li>
                      <li class="page-item page-link pagination-button">2</li>
                      <li class="page-item page-link pagination-button">3</li>
                      <li class="page-item page-link pagination-button">
                        <FontAwesomeIcon icon={faAngleDoubleRight} style={{ width: "20px", marginRight: "5px"}}/>
                        </li>
                    </ul>
                  </nav>
            </table>

          </Card.Text>
        </Card.Body>
      </Card>
    </>
    );
  }
}

export default GerenciamentoNoticias;
