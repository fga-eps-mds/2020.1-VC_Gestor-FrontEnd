import React from "react";
import { Card, Modal, Pagination } from "react-bootstrap";
import api from "../../services/api";
import "../components/estiloPostagem.css";
import { faUserCircle, faThumbsUp} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TabelaPosts extends React.Component {
  
  constructor(props){
    super(props)
    this.state = { 
      posts: [],
      tableData: [],
      perPage:10,
      totalPages: [],
      paginaAtual: 0,
      slice: 0,
      offset: 0,
      numRows: 0,
      modalInf: 0,
      showModal: false,
      handleClose: false,
      handleShow: true,
      postsNew: [],
      postsClosed: [],
      ordem: ['asc'],
      check: false,
      conjuntoA: []
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
    // console.log( response.data);
    const arrayPages = [];
    for (let i = 0; i < total; i++){
      arrayPages.push(i);
    }

    this.setState({ 
      posts: response.data.rows,
      pageCount: Math.ceil(response.length / this.state.perPage),
      tableData:response.data.rows.slice(0, this.state.perPage),
      totalPages: arrayPages,
      numRows: numRows,
      postsNew:response.data.rows.filter((e)=>{return e.status === 'Em andamento'})
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
       if(this.state.modalInf.status === this.state.status) {
         alert('O estadado atual continua o mesmo');
       } else {
        alert('O estado do post foi alterado para: ' + this.state.status);
        api.put(`posts/${this.state.modalInf.post_id}`, { status: `${this.state.status}` });
      }
     }
    handleChange = (event) => {
      event.preventDefault()
      // alert(event.target.value)
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
                <h6>Categoria {this.state.modalInf.category.category_name}</h6>
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
                    <select onChange={this.handleChange}>
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
      this.setState({
        showModal: true,
        modalInf: e
      });
    }

    filterStatus(e,type){
      if (e.target.checked === true){
        const conjB = this.state.posts.filter((e) => {return e.status === type});
        this.state.posts.map((item) => {if(conjB.indexOf(item) !== -1){this.state.conjuntoA.push(item)}})
        this.setState({
          tableData: this.state.conjuntoA
        });
      } else {
        const conjB = this.state.posts.filter((e) => {return e.status === type});
        this.state.posts.map((item) => {if(conjB.indexOf(item) !== -1){this.state.conjuntoA.splice(item, 1)}});
        this.setState({
          tableData: this.state.conjuntoA
        });
        if (this.state.conjuntoA.length === 0){
         this.loadMoreData();
        }
      }
    }

    filterPerson(e, type){
      const conjuntoB = this.state.posts;
      if (e.target.checked === true){
        const conjB = this.state.posts.filter((e) => {return e.user.name === type});
        this.state.posts.map((item) => {if(conjB.indexOf(item) !== -1){conjuntoB.splice(item, 1)}})
        this.setState({
          tableData: conjuntoB
        });
        this.loadMoreData();
      } else {
        if (type === null) {
          this.setState({
            tableData: this.state.posts.filter((e) => {return e.user.name !== type})
          });
        } else {
          this.setState({
            tableData: this.state.posts.filter((e) => {return e.user.name === null})
          });
        }
      }
    }

    filterCategory(e, type){
      if (e.target.checked === true){
        this.setState({
          tableData: this.state.tableData.filter((e) => {return e.category.category_name === type})
        });
      } else {
        this.setState({
          tableData: this.state.conjuntoA
        });
        if (this.state.conjuntoA.length === 0){
         this.loadMoreData();
        }
      }
    }

    ordenar(type) {
      if(this.state.ordem === 'asc'){
        this.setState({
          posts: this.state.posts.sort((a, b) => {
            return a[type] > b[type] ? 1 : -1
          }),
          ordem: 'desc'
        });
      } else {
        this.setState({
          posts: this.state.posts.sort((a, b) => {
            return a[type] < b[type] ? 1 : -1
          }),
          ordem: 'asc'
        });
      }
      return this.loadMoreData();
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
          <Card.Text style={{ width: '100%' }} className="Card-txt">



          <nav className='menu-anuncio'>
              <div inputMode className='button-anuncio'>Anunciantes</div>
              <div className="menu-txt">
                <input id="Registrados" name="Registrados" type="checkbox" defaultChecked={true}  style={{ margin: "8px" }}
                onClick={(e) => this.filterPerson(e, 'nome')}/>
                <label for="Registrados">Registrados</label>
              </div>
              <div className="menu-txt-fim">
                <input id="Anônimos" type="checkbox" defaultChecked={true}  style={{ margin: "8px" }}
                onClick={(e) => this.filterPerson(e, null)}/>
                <label for="Anônimos">Anônimos</label>
              </div>
              <div className='button-anuncio'>Status</div>
              <div className="menu-txt">
                <input id="Aguardando" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.filterStatus(e, "Aguardando")}/>
                <label for="Aguardando">Aguardando</label>
                </div>
              <div className="menu-txt">
                <input id="Em andamento" type="checkbox" defaultChecked={false} style={{ margin: "8px" }} 
                onClick={(e) => this.filterStatus(e, "Em andamento")}/>
                <label for="Em andamento">Em andamento</label>
              </div>
              <div className="menu-txt">
                <input id="Resolvido" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.filterStatus(e, "Resolvido")}/>
                <label for="Resolvido">Resolvido</label>
                </div>
              <div className='button-anuncio'>Categoria</div>
              <div className="menu-txt">
                <input id="Limpeza" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.filterCategory(e, "Limpeza")}/>
                <label for="Limpeza">Limpeza</label>
              </div>
              <div className="menu-txt">
                <input id="Segurança" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.filterCategory(e, "Segurança")}/>
                <label for="Segurança">Segurança</label>
              </div>
              <div className="menu-txt">
                <input id="Infraestrutura" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.filterCategory(e, "Infraestrutura")}/>
                <label for="Infraestrutura">Infraestrutura</label>
              </div>
              <div className="menu-txt">
                <input id="Transportes" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.filterCategory(e, "Transportes")}/>
                <label for="Transportes">Transportes</label>
              </div>
              <div className="menu-txt">
                <input id="Serviços Tercerizados" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.filterCategory(e, "Serviços Tercerizados")}/>
                <label for="Serviços Tercerizados">Serviços Tercerizados</label>
              </div>
              <div className="menu-txt">
                <input id="Meio Ambiente" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.filterCategory(e, "Meio Ambiente")}/>
                <label for="Meio Ambiente">Meio Ambiente</label>
              </div>
              <div className="menu-txt">
                <input id="Jardinagem" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.filterCategory(e, "Jardinagem")}/>
                <label for="Jardinagem">Jardinagem</label>
              </div>
              <div className="menu-txt">
                <input id="Alimentação nos Campi" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.filterCategory(e, "Alimentação nos Campi")}/>
                <label for="Alimentação nos Campi">Alimentação nos Campi</label>
              </div>
              <div className="menu-txt">
                <input id="Saúde e Seguridade" type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.filterCategory(e, "Saúde e Seguridade")}/>
                <label for="Saúde e Seguridade">Saúde e Seguridade</label>
              </div>
              <div className="menu-txt">
                <input id="Outros" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.filterCategory(e, "Outros")}/>
                <label for="Outros">Outros</label>
              </div>
          </nav>

            <table class="table">
                <thead>
                    <tr className="table-cab">
                        <th scope="col" className="a" onClick={() => this.ordenar('post_id')}>#Id</th>
                        <th scope="col" className="a" onClick={() => this.ordenar('title')}>Titulo</th>
                        <th scope="col" className="a" onClick={() => this.ordenar('description')}>Descrição</th>
                        <th scope="col">Anunciante</th>
                        <th scope="col">Departamento</th>
                        <th scope="col" className="a" onClick={() => this.ordenar('status')}>Status</th>
                        <th scope="col" className="a" onClick={() => this.ordenar('likes')}>Likes</th>
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
                  {this.state.showModal ? this.modelContent() : null}
                  {/* {tableData.length >= this.state.perPage ? this.showPagination() : null} */}
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
          </Card.Text>
        </Card.Body>
      </Card>
    </>
    );
  }
}

export default TabelaPosts;
