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
        imgFile1 : null
      };
      // this.fileInput = React.createRef();
      this.id = this.props.match.params.newsId;

      // this.history = useHistory();
      this.changePostId = this.changePostId.bind(this);
      this.handleChange = this.handleChange.bind(this);
      // this.changePhoto = this.changePhoto.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getNews(){
      const response = await apiNoticias.get("news/"+this.id);
      const posts = await apiPostagem.get("postage/list_all");
      this.setState(response.data);
      this.setState({posts: posts.data, img: ["http://localhost:3004/img/120529.jpg",
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
      // await this.fileUpload(this.state.imgFile1);
      try{
        await apiNoticias.put("news/"+this.id,  news );     
        alert("Notícia alterada com sucesso!");
        this.props.history.push("/GerenciamentoNoticias");
      }catch(e){
        alert("Ocorreu um erro e não foi possível alterar a notícia"); 
      }
    }


    async deleteNews(newsId){
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

    changePostId(event){
      this.setState({post_id: event.target.value});
    }

    // changePhoto(event){
    //   // var newPhoto = [...this.state.img];
    //   var newPhoto = event.target.files[0];
    //   // newPhoto.push(event.target.files[0]);
    //   console.log(newPhoto);
    //   this.setState({imgFile1: newPhoto});
    //   console.log("foto nova");
    //   console.log(this.state.imgFile1);
    //   }

    // async fileUpload(file){
    //   const formData = new FormData();
    //   formData.append('file',file);
    //   console.log(formData);
    //   try{
    //     await apiNoticias.post("fileupload", formData);
    //     alert("Imagem!");
    //   }catch(e){
    //     alert("Ocorreu um erro e não foi possível alterar a notícia"); 
    //   }
    //   // return  post(url, formData,config)
    // }
  
    render() {
      return (
        <Form onSubmit={this.handleSubmit} className="newsForm" >
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
                      <select id="linkPost" className="form-control" value={this.state.post_id} onChange={this.changePostId}>
                        <option key="" value=""> ------------------ </option>
                        {this.state.posts.map((post) => (
                          <option key={post._id} value={post._id}>{post.post_title}</option>
                        ))}
                      </select>
                  </Form.Group>
                </div>
              </div>
              <div className="col-5">    
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img className="d-block w-100" src={this.state.img[0]} alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100" src={this.state.img[1]} alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100"src={this.state.img[2]} alt="Third slide"/>
                    </div>
                  </div>
                  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
                {/* <div>
                    <input type="file" ref={this.fileInput} name="filetoupload" onChange={this.changePhoto}/>
                </div> */}
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
