import React from "react";
import { Card, Modal, Pagination } from "react-bootstrap";
import api from '../../services/api';
import "./tabela.css"
import { faUserCircle, faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



class TabelaPosts extends React.Component {
  
  constructor(props){
    super(props)
    this.state = { 
      posts: [],
      tableData: [],
      perPage:5,
      totalPages: [],
      paginaAtual: 0,
      slice: 0,
      offset: 0,
      numRows: 0,
      modalInf: 0,
      showModal: false,
      handleClose: false,
      handleShow: true,
      status: 'Aguardando'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}



  async componentDidMount() {
    const limit = 100;
    const page = 0;
    //  const response2 = await api.put(`posts/${id}`, { status: `${newStatus}` });
    var response = await api.get(`posts?limit=${limit}&page=${page}`);
    // var slice = response.data.rows.slice(this.state.offset, this.state.offset + this.state.perPage)
    const total = Math.ceil(response.data.count/this.state.perPage)
    const numRows = response.data.count;
    console.log( response.data);
    const arrayPages = [];
    for (let i = 0; i < total; i++){
      arrayPages.push(i);
    }

    this.setState({ 
      posts: response.data.rows,
      pageCount: Math.ceil(response.length / this.state.perPage),
      tableData:response.data.rows.slice(0, this.state.perPage),
      totalPages: arrayPages,
      numRows: numRows
    });
  }

  currentPage(e){
      this.setState({
        paginaAtual: e,
        offset: e * this.state.perPage
      }, () => {
        this.loadMoreData()
    });
  }

  loadMoreData() {
		const data = this.state.posts;
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
    })
    return this.forceUpdate();
    }

    handleClose = () => this.setState({showModal: false})
    handleSubmit = (e) => {
       alert('O estado do post foi alterado para: ' + this.state.status);
       api.put(`posts/${this.state.modalInf.post_id}`, { status: `${this.state.status}` });
     }
    handleChange = (event) => {
      event.preventDefault()
      this.setState({status: event.target.value});
      }


    modelContent = () => {
      return (
          <Modal.Dialog className="modal">
            <Modal.Header>
              <Modal.Title>
                <FontAwesomeIcon icon={faUserCircle} style={{ width: "40px", marginRight: "10px" }} />
                {this.state.modalInf.user.name} {this.state.modalInf.user.surname}<br/>
                <h6>{this.state.modalInf.dt_creation}</h6>
                <h6>Estado da postem: {this.state.modalInf.status}</h6>
              </Modal.Title>
            </Modal.Header>
              <Modal.Body>
                <h4>{this.state.modalInf.title}
                <FontAwesomeIcon icon={faThumbsUp} style={{ width: "15px", marginLeft: "50px", marginRight: "10px"}}/>
                {this.state.modalInf.likes}</h4>
                <h5 style={{fontSize: "14px"}}>{this.state.modalInf.place.place_name}</h5>
                <p>{this.state.modalInf.description}</p>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Alterar estado para:<br/>
                <select select={this.state.modalInf.status} onChange={this.handleChange}>
                    <option value="Aguardando">Aguardando</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Resolvido">Resolvido</option>
                    <option value="Arquivado">Arquivado</option>
                  </select>
                  </label>
                  <div className="modal-footer">
                    <button className="close-button" onClick={this.handleClose}>Cancelar</button>
                    <input className="salve-button" variant="primary" type="submit" value="Salvar"/>
                  </div>
                </form>
              </Modal.Body>
        </Modal.Dialog>
      )
    }

    mostrarModal(e){
      // console.log(e)
      this.setState({
        showModal: true,
        modalInf: e
      });
    }


  render() {
    const { tableData } = this.state;


    return (<>


      <Card style={{ width: '100%' }} className="corpo">
        <Card.Body>
            {/* aqi vem o titulo */}
          <Card.Header>
            </Card.Header>
            {/* aqui o corpo da tabela */}
          <Card.Text>

            <table class="table">
                <thead>
                    <tr className="table-cab">
                        <th scope="col">#Id</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Anunciante</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Status</th>
                        <th scope="col">Likes</th>

                    </tr>
                </thead>
                <tbody>
                  
                  {tableData.map(post => (
                    <>
                    <tr key={post.id} onClick={() => this.mostrarModal(post)}>
                    <td >{post.post_id}</td>
                    <td >{post.title}</td>
                    <td >{post.description}</td>
                    <td >{post.user.name} {post.user.surname}</td>
                    <td >{post.place.place_name}</td>
                    <td >{post.status}</td>
                    <td >{post.likes}</td>
                    </tr>
                  <h2>{post.id}</h2>
                    </>))}
                </tbody>
            </table>
                  <Pagination className='pagination'>
                    <Pagination.First onClick={() => this.currentPage(0)}/>
                    <Pagination.Prev onClick={() => (this.state.paginaAtual !== 0) ?
                       this.currentPage(this.state.paginaAtual - 1) : null}/>
                    {this.state.totalPages.map(page => (
                      <Pagination.Item key={page} on={page}
                        onClick={() => this.currentPage(page)}>{page}</Pagination.Item>
                    ))}
                    <Pagination.Next />
                    <Pagination.Last onClick={() => this.currentPage(this.state.totalPages.length - 1)}/>
                  </Pagination>
                  {this.state.showModal ? this.modelContent() : null}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
    );
  }
}

export default TabelaPosts;
