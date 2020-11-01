import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import apiPostagem from "../../services/apiPostagem";
import { withRouter } from "react-router-dom";
import "./editNewsForm.css";
import apiNoticias from "../../services/apiNoticias";



class EditNewsForm extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        title: "",
        subtitle: "",
        text:  "",
        image1: "",
        image2: "",
        image3: "",
        post_id: "",
        posts: [],
        img: [],
        imgFile1 : ""
      };
      // this.fileInput = React.createRef();
      this.id = this.props.match.params.newsId;

      // this.history = useHistory();
      this.ChangePostId = this.ChangePostId.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.changePhoto = this.changePhoto.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getNews(){
      const response = await apiNoticias.get("news/"+this.id);
      const posts = await apiPostagem.get(`posts?limit=100&page=0`);
      this.setState(response.data);
      this.setState({posts: posts.data.rows, img: ["http://localhost:3004/img/120529.jpg",
      "http://localhost:3004/img/120529.jpg","http://localhost:3004/img/120529.jpg"]});
    }

    componentDidMount(){
      this.getNews();
    }
  
    handleChange(event){
      switch(event.target.id){
        case  "title":
            if(event.target.value.length<=25){
            this.setState({title: event.target.value});
            }
            break;
        case "subtitle":
            if(event.target.value.length<=25){
            this.setState({subtitle: event.target.value});
            }
            break;
        case "text":
            if(event.target.value.length<=500){
                this.setState({text: event.target.value});
            }
            break;
        case "image1":
            if(event.target.value.length<=50){
                this.setState({image1: event.target.value});
            }
            break;
        case "image2":
            if(event.target.value.length<=50){
                this.setState({image2: event.target.value});
            }
            break;
        case "image3":
            if(event.target.value.length<=50){
                this.setState({image3: event.target.value});
            }
            break;
        default: break;
      }
    }
  
    async handleSubmit(event){
      event.preventDefault();
      const news = this.state;
      //await this.fileUpload(this.state.imgFile1);
      try{
        await apiNoticias.put("news/"+this.id,  news );
        alert("Notícia alterada com sucesso!");
        this.props.history.push("/GerenciamentoNoticias");
      }catch(e){
        alert("Ocorreu um erro e não foi possível alterar a notícia"); 
      }
    }


    deleteNews = async (newsId) => {
      if(window.confirm("Tem certeza que quer excluir esta notícia?")){
        try{
          await apiNoticias.delete(`/news/${newsId}`);
          this.props.history.push("/GerenciamentoNoticias");
        }
        catch(error){
          alert("Ocorreu um erro e não conseguimos excluir a notícia");
        }
      }

    }

    ChangePostId(event){
      this.setState({post_id: event.target.value});
    }

    changePhoto(event){
      this.setState({imgFile1: event.target.files[0]});
    }

    async fileUpload(file){
      const formData = new FormData();
      formData.append('file',file)

      try{
        await apiNoticias.post("img", formData);
        alert("Imagem!");
      }catch(e){
        alert("Ocorreu um erro e não foi possível alterar a notícia"); 
      }

      // return  post(url, formData,config)
    }
  
    render() {
      return (
        <Form onSubmit={this.handleSubmit} >
          <div className="container-fluid form-news">
            <div className="row">

            <div className="col-7">
              <div className="row">
                <Form.Group controlId="title" className="text-area-news">
                    <Form.Label>Título</Form.Label>
                    <Form.Control  type="text" placeholder="Título da Notícia" value={this.state.title} onChange={this.handleChange} />
                </Form.Group>
              </div>
              <div className="row">
                  <Form.Group controlId="subtitle" className="text-area-news">
                    <Form.Label>Subtítulo</Form.Label>
                    <Form.Control type="text" placeholder="Subtítulo" value={this.state.subtitle} onChange={this.handleChange} /> 
                  </Form.Group>
              </div>
              <div className="row">
                <Form.Group controlId="linkPost" className="text-area-news">
                    <Form.Label>Linkar Postagem</Form.Label>
                    {/* <Form.Control type="text" placeholder="Linkar Postagem" value={"Lembrar de arrumar"} onChange={this.handleChange} /> */}
                    <select class="form-control" value={this.state.post_id} onChange={this.ChangePostId}>
                    {/* <option>Nenhum</option> */}
                    {this.state.posts.map(post => (
                      <option value={post.post_id}>{post.post_id} - {post.title}</option>
                      ))}
                    </select>
                </Form.Group>
              </div>
            </div>
            <div className="col-5">    
              <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img class="d-block w-100" src={this.state.img[0]} alt="First slide"/>
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" src={this.state.img[1]} alt="Second slide"/>
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100"src={this.state.img[2]} alt="Third slide"/>
                  </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
              <div>
                  <input type="file" ref={this.fileInput} onChange={this.changePhoto}/>
              </div>
            </div>
          </div>
            
            <div className="row">
              <Form.Group controlId="text" className="text-news">
                  <Form.Label>Corpo</Form.Label>
                  <Form.Control as="textarea" placeholder="Corpo" rows="5" cols="6" value={this.state.text} onChange={this.handleChange} />
              </Form.Group>
            </div>
            <div className="row">
              <div className="col-3">
                <Button id="delete" type="button" onClick={() => this.deleteNews(this.id)} size="lg" block>
                  Excluir
                </Button>
              </div>
              <div className="col-6" />
              <div className="col-3">
                <Button id="submit" type="submit" size="lg"  block>
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        </Form>
      );
    }
  }

  export default withRouter(EditNewsForm);
