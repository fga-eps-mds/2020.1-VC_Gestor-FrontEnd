import React from "react";
import { Card, Modal, Pagination } from "react-bootstrap";
import { faUserCircle, faThumbsUp} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apiPostagem from "../../services/apiPostagem";
import "../components/estiloPostagem.css";
import { Redirect } from "react-router-dom";

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
      showPagination: false,
      postsShow: [],
      postsClosed: [],
      ordem: ["asc"],
      check: null,
      filters: ["categoria","Registrados", "Anônimos"]
    };
}

  async componentDidMount() {
    const limit = 100;
    const page = 0;
    //  const response2 = await apiPostagem.put(`posts/${id}`, { status: `${newStatus}` });
    var response = await apiPostagem.get(`postage/list_all`);
    // var slice = response.data.rows.slice(this.state.offset, this.state.offset + this.state.perPage)
    const total = Math.ceil(response.data.length/this.state.perPage)
    const numRows = response.data.length;
    // console.log( response.data);
    const arrayPages = [];
    for (let i = 0; i < total; i++){
      arrayPages.push(i);
    }

    this.setState({ 
      posts: response.data,
      pageCount: Math.ceil(response.length / this.state.perPage),
      tableData:response.data.slice(0, this.state.perPage),
      totalPages: arrayPages,
      numRows: numRows,
      postsShow:response.data
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
		const data = this.state.postsShow;
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData: slice
    })
    return this.forceUpdate();
    }

    handleClose = () => this.setState({showModal: false})
    handleSubmit = (e) => {
       if(this.state.modalInf.status === this.state.status) {
         alert('O estadado atual continua o mesmo');
       } else {
        alert('O estado do post foi alterado para: ' + this.state.status);
        apiPostagem.put(`posts/${this.state.modalInf.post_id}`, { status: `${this.state.status}` });
      }
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
      const array = this.state.filters;
      const index = array.indexOf(type);
      if (e.target.checked === true){
        array.push(type);
        this.setState({
          tableData: this.state.posts.filter((e) => {return e.status === type;}),
          filters: array
        });
      } else {
        if ( index > -1){
          this.state.filters.slice(index, 1);
        }
        array.splice(array.indexOf(type),1);
        this.setState({
          tableData: this.state.posts.filter((e) => {return e.status === type;})
        });
      }
      this.filtrar();
    }

    checkFilter(e, type){
      if(this.state.check === null || this.state.check === e.target){
        this.setState({check: e.target});
      } else {
        if (e.targe !== this.state.check){
          var a =  this.state.check;
          a.checked = false;
          this.setState({check: e.target});
        }
      }
      this.filterCategory(e, type);
    }

    filterCategory(e, type){
        // if(this.state.check === null || this.state.check === e.target){
        //   this.setState({check: e.target});
        // } else {
        //   if (e.targe !== this.state.check){
        //     var a =  this.state.check;
        //     a.checked = false;
        //     this.setState({check: e.target});
        //   }
        // }
      if (e.target.checked === true){
        const array = this.state.filters;
        array[0] = type;
        this.setState({
          tableData: this.state.posts.filter((e) => {return e.category.category_name === type;}),
          filters: array
        });
      } else {
        const array = this.state.filters;
        array[0] = "categoria";
        this.setState({
          tableData: this.state.posts,
          filters: array
        });
      }
      this.filtrar();
    }

    filtrar(){
      this.setState({paginaAtual: 0});
      this.currentPage(0);
      var conjuntoUniverso = [];
      var filtragens = [...this.state.filters];
      // eslint-disable-next-line array-callback-return
      this.state.filters.map((quem) => {if(quem === "Anônimos"){
        const conjuntoUser = this.state.posts.filter((e) => {return e.user.name === null;});
        // eslint-disable-next-line array-callback-return
        conjuntoUser.map((posts) => {if(posts.length !== 0){
          conjuntoUniverso.push(posts);
        }});
        filtragens.splice(filtragens.indexOf("Anônimos"), 1);
        // conjuntoUniverso.push(conjuntoUser);
      } else {
        if (quem === "Registrados") {
          const conjuntoUserB = this.state.posts.filter((e) => {return e.user.name !== null;});
          // eslint-disable-next-line array-callback-return
          conjuntoUserB.map((posts) => {if(posts.length !== 0){conjuntoUniverso.push(posts);}});
          filtragens.splice(filtragens.indexOf("Registrados"), 1);
      } else {
          this.setState({
            tableData: []
          });
        }
      }});
      const conjuntoStatus = [];
      // eslint-disable-next-line array-callback-return
      if (filtragens.length !== 1) {
          // eslint-disable-next-line array-callback-return
          filtragens.map((status) => {if(status === "Aguardando"){
            const process = conjuntoUniverso.filter((e) => {return e.status === "Aguardando";});
            // eslint-disable-next-line array-callback-return
            process.map((e) => {if(e.length !== 0){conjuntoStatus.push(e);}});
          } else if (status === "Em andamento"){
            // eslint-disable-next-line array-callback-return
            const processAwait = conjuntoUniverso.filter((e) => {return e.status === "Em andamento";});
            // eslint-disable-next-line array-callback-return
            processAwait.map((e) => {if(e.length !== 0){conjuntoStatus.push(e);}});
            // eslint-disable-next-line array-callback-return
          } else if (status === "Resolvido"){
            // eslint-disable-next-line array-callback-return
            const processfinished = conjuntoUniverso.filter((e) => {return e.status === "Resolvido";});
            // eslint-disable-next-line array-callback-return
            processfinished.map((e) => {if(e.length !== 0){conjuntoStatus.push(e);}});
            // eslint-disable-next-line array-callback-return
          } else {
            const processFiled = conjuntoUniverso.filter((e) => {return e.status === "Arquivados";});
            // eslint-disable-next-line array-callback-return
            processFiled.map((e) => {if(e.length !== 0){conjuntoStatus.push(e);}});
          }
        })
        conjuntoUniverso = conjuntoStatus;
      }
      if (this.state.filters[0] !== "categoria") {
        const maxPage = conjuntoUniverso.filter((e) => {return e.category.category_name === this.state.filters[0];});
        const corte = maxPage.slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({
          tableData: corte,
          postsShow: conjuntoUniverso.filter((e) => {return e.category.category_name === this.state.filters[0];})
        }); 
      } else {
        const corte2 = conjuntoUniverso.slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({
          tableData: corte2,
          postsShow: conjuntoUniverso
        });
      }
    }

    ordenar(type) {
      if(this.state.ordem === 'asc'){
        this.setState({
          tableData: this.state.postsShow.sort((a, b) => {
            return a[type] > b[type] ? 1 : -1
          }),
          ordem: 'desc'
        });
      } else {
        this.setState({
          tableData: this.state.postsShow.sort((a, b) => {
            return a[type] < b[type] ? 1 : -1
          }),
          ordem: 'asc'
        });
      }
      return this.loadMoreData();
    }

    showPagination(){
      return (
        <Pagination className='pagination'>
          <Pagination.First onClick={() => this.currentPage(0)}/>
          <Pagination.Prev onClick={() => (this.state.paginaAtual !== 0) ?
            this.currentPage(this.state.paginaAtual - 1) : null}/>
          {this.state.totalPages.map(page => (
            <Pagination.Item key={page} on={page}
              onClick={() => this.currentPage(page)}>{page}</Pagination.Item>
          ))}
          <Pagination.Next onClick={() => (this.state.paginaAtual !== this.state.totalPages) ?
            this.currentPage(this.state.paginaAtual + 1) : null}/>
          <Pagination.Last onClick={() => this.currentPage(this.state.totalPages.length - 1)}/>
        </Pagination>
      )
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
                  onClick={(e) => this.filterStatus(e, "Registrados")}/>
                <label className="label-txt" for="Registrados">Registrados</label> 
              </div>
              <div className="menu-txt-fim">
                <input id="Anônimos" type="checkbox" defaultChecked={true}  style={{ margin: "8px" }}
                  onClick={(e) => this.filterStatus(e, "Anônimos")}/>
                <label className="label-txt" for="Anônimos">Anônimos</label>
              </div>
              <div className='button-anuncio'>Status</div>
              <div className="menu-txt">
                <input id="Aguardando" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                  onClick={(e) => this.filterStatus(e, "Aguardando")}/>
                <label className="label-txt" for="Aguardando">Aguardando</label>
                </div>
              <div className="menu-txt">
                <input id="Em andamento" type="checkbox" defaultChecked={false} style={{ margin: "8px" }} 
                  onClick={(e) => this.filterStatus(e, "Em andamento")}/>
                <label className="label-txt" for="Em andamento">Em andamento</label>
              </div>
              <div className="menu-txt">
                <input id="Resolvido" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                  onClick={(e) => this.filterStatus(e, "Resolvido")}/>
                <label className="label-txt" for="Resolvido">Resolvido</label>
              </div>
              <div className="menu-txt">
                <input id="Arquivados" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                  onClick={(e) => this.filterStatus(e, "Arquivados")}/>
                <label className="label-txt" for="Arquivados">Arquivados</label>
              </div>
              <div className='button-anuncio'>Categoria</div>
              <div className="menu-txt">
                <input id="Limpeza" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.checkFilter(e, "Limpeza")}/>
                <label className="label-txt" for="Limpeza" key={1}>Limpeza</label>
              </div>
              <div className="menu-txt">
                <input id="Segurança" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.checkFilter(e, "Segurança")}/>
                <label className="label-txt" for="Segurança" id="2">Segurança</label>
              </div>
              <div className="menu-txt">
                <input id="Infraestrutura" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.checkFilter(e, "Infraestrutura")}/>
                <label className="label-txt" for="Infraestrutura" id="3">Infraestrutura</label>
              </div>
              <div className="menu-txt">
                <input id="Transportes" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.checkFilter(e, "Transportes")}/>
                <label className="label-txt" for="Transportes" id="4">Transportes</label>
              </div>
              <div className="menu-txt">
                <input id="Serviços Tercerizados" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.checkFilter(e, "Serviços Tercerizados")}/>
                <label className="label-txt" for="Serviços Tercerizados" id="5">Serviços Tercerizados</label>
              </div>
              <div className="menu-txt">
                <input id="Meio Ambiente" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.checkFilter(e, "Meio Ambiente")}/>
                <label className="label-txt" for="Meio Ambiente" id="6">Meio Ambiente</label>
              </div>
              <div className="menu-txt">
                <input id="Jardinagem" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.checkFilter(e, "Jardinagem")}/>
                <label className="label-txt" for="Jardinagem" id="7">Jardinagem</label>
              </div>
              <div className="menu-txt">
                <input id="Alimentação nos Campi" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.checkFilter(e, "Alimentação nos Campi")}/>
                <label className="label-txt" for="Alimentação nos Campi" id="8">Alimentação nos Campi</label>
              </div>
              <div className="menu-txt">
                <input id="Saúde e Seguridade" type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.checkFilter(e, "Saúde e Seguridade")}/>
                <label className="label-txt" for="Saúde e Seguridade" id="9">Saúde e Seguridade</label>
              </div>
              <div className="menu-txt">
                <input id="Outros" type="checkbox" defaultChecked={false}  style={{ margin: "8px" }}
                onClick={(e) => this.checkFilter(e, "Outros")}/>
                <label className="label-txt" for="Outros" id="10">Outros</label>
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
                    <tr key={post._id} onClick={() => this.mostrarModal(post)}>
                  <td >{/*post._id*/}</td>
                      <td >{post.post_title}</td>
                      <td >{post.post_description}</td>
                      <td >{post.author}</td>
                      <td >{post.post_place}</td>
                      <td >{post.post_status}</td>
                      <td >{post.__v}</td>
                    </tr>
                  <h2>{/*post._id*/}</h2>
                    </>))}
                </tbody>
                {this.state.postsShow.length > this.state.perPage || this.state.paginaAtual === this.state.totalPages ?
                this.showPagination() : null}
                {}
            </table> 
            {this.state.showModal ? <Redirect to={{
                      pathname: `/Anuncio/${this.state.modalInf._id}`,
                      state: {
                      id: this.state.modalInf._id}}}/> : null}
                  {/* {tableData.length >= this.state.perPage ? this.showPagination() : null} */}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
    );
  }
}

export default TabelaPosts;
