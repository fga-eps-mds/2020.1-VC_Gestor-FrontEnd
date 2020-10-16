import React from "react";
import { Card, Pagination } from "react-bootstrap";
import apiPostagem from "../../services/apiPostagem";
import "./tabela.css";
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
      postsNew: [],
      postsClosed: [],
      ordem: ['asc']
    };
}

  async componentDidMount() {
    const limit = 100;
    const page = 0;
    //  const response2 = await apiPostagem.put(`posts/${id}`, { status: `${newStatus}` });
    var response = await apiPostagem.get(`posts?limit=${limit}&page=${page}`);
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

    mostrarModal(e){
      this.setState({
        showModal: true,
        modalInf: e
      });
    }

    finalizados(){
      this.setState({
        tableData: this.state.posts.filter((e)=>{return e.status === 'Revisado'})
      });
    }

    emAndamento(){
      this.setState({
        tableData: this.state.posts.filter((e)=>{return e.status === 'Em andamento'})
      });
    }

    Aguardando(){
      this.setState({
        tableData: this.state.posts.filter((e)=>{return e.status === 'Não revisado'})
      });
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
              <div inputMode className='button-anuncio'key="Aba1">Anunciantes</div>
              <div key="Aba2" className="menu-txt">
              <input type="checkbox"defaultChecked={true}  style={{ margin: "8px" }}/>
              Registrados
              </div>
              <div key="Aba3" className="menu-txt-fim">
              <input type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}/>
                Anônimos</div>
              <div className='button-anuncio'key="Aba1">Categoria</div>
              <div key="Aba2" className="menu-txt">
              <input type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}/>
                Limpeza</div>
              <div key="Aba3" className="menu-txt">
                <input type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}/>
                Segurança</div>
              <div key="Aba2" className="menu-txt">
                <input type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}/>
                  Infraestrutura</div>
              <div key="Aba3" className="menu-txt">
                <input type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}/>
                  Transportes</div>
              <div key="Aba2" className="menu-txt">
                <input type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}/>
                Serviços Tercerizados</div>
              <div key="Aba2" className="menu-txt">
                <input type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}/>
                Meio Ambiente</div>
              <div key="Aba3" className="menu-txt">
                <input type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}/>
                Jardinagem</div>
              <div key="Aba2" className="menu-txt">
                <input type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}/>
                Alimentação nos Campi</div>
              <div key="Aba3" className="menu-txt">
                <input type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}/>
                Saúde e Seguridade</div>
              <div key="Aba2" className="menu-txt">
                <input type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}/>
                Outros</div>
              <div key="Aba3" className="menu-txt-fim">
                <input type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}/>
                Anônimos</div>
              <div className='button-anuncio'key="Aba1">Status</div>
              <div key="Aba3" className="menu-txt">
                <input type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}/>
                Aguardando</div>
              <div key="Aba2" className="menu-txt">
                <input type="checkbox"defaultChecked={false} style={{ margin: "8px" }} onClick={() => this.finalizados()}/>
                Em andamento</div>
              <div key="Aba3" className="menu-txt">
                <input type="checkbox"defaultChecked={false}  style={{ margin: "8px" }}/>
                Resolvido</div>
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
                  {this.state.showModal ? <Redirect to={{
                      pathname: `/Anuncio/${this.state.modalInf.post_id}`,
                      state: {
                      id: this.state.modalInf.post_id}}}/> : null}
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
