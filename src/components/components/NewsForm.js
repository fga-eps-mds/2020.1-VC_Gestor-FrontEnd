import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import apiNoticias from "../../services/apiNoticias";
import apiPostagem from "../../services/apiPostagem";
import CameraImg from "../../assets/camera.png";
import { Redirect } from "react-router-dom";




class NewsForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
        subtitle: "",
        text: "" ,
        image1: "" ,
        image2: "",
        image3: "",
        post_id: "",
        posts: [],
        changePage: false
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.ChangePostId = this.ChangePostId.bind(this);
    }

    async getPosts(){
      const posts = await apiPostagem.get("posts?limit=100&page=0");
      this.setState({posts: posts.data.rows});
    }

    componentDidMount(){
      this.getPosts();
    }

    ChangePostId(event){
      this.setState({post_id: event.target.value});
    }
  
    handleChange(event) {
      switch(event.target.id){
        case  "title":
          this.setState({title: event.target.value});
          break;
        case "subtitle":
          this.setState({subtitle: event.target.value});
          break;
        case "text":
          this.setState({text: event.target.value});
          break;
        case "image1":
          this.setState({image1: event.target.value});
          break;
        case "image2":
          this.setState({image2: event.target.value});
          break;
        case "image3":
          this.setState({image3: event.target.value});
          break;
        case "linkPost":
          this.setState({post_id: event.target.value});
          break;
        default: break;
      }
    }
    // TODO
    async handleSubmit(event) {
      event.preventDefault();

      const news = this.state;

      try{
        await apiNoticias.post("news",  news );

        alert("Notícia criada com sucesso!");
        // <Redirect to={{
        //   pathname: "/GerenciamentoNoticias/"}}/>
        this.setState({changePage: true});
      }catch(err){
        alert("Essa noticia já existe");
      }

    }

  
    render() {
      return (

      <Form onSubmit={this.handleSubmit} className="newsForm">
       
          <div className="row">

            <div class="col-8">
            <Form.Group controlId="title" id="titleNews">
              <Form.Control 
                type="text" placeholder="Título da Notícia" 
                value={this.state.title}
                onChange={this.handleChange} 
              />
            </Form.Group>

            <Form.Group controlId="subtitle" id="subtitleNews">
              <Form.Control 
                type="text" 
                placeholder="Subtítulo" 
                value={this.state.subtitle} 
                onChange={this.handleChange} 
              />
            </Form.Group>
           
            </div>

            <div class="col-4">
            <input 
                controlId="img"
                id="imgNews"
                type="image" 
                src={CameraImg}
                alt="imagemCamera"  
                >
            </input>
            </div>

            <div className="row">
                <Form.Group controlId="linkPost" id="linkPostNews">
                    <Form.Label>Atrelar Postagem</Form.Label>
                    {/* <Form.Control type="text" placeholder="Linkar Postagem" value={"Lembrar de arrumar"} onChange={this.handleChange} /> */}
                    <select class="form-control" value={this.state.post_id} onChange={this.ChangePostId}>
                    {/* <option>Nenhum</option> */}
                    {this.state.posts.map((post) => (
                      <option value={post.post_id}>{post.post_id} - {post.title}</option>
                      ))}
                    </select>
                </Form.Group>
              </div>

          </div>

        <div className="">
            <Form.Group controlId="text" id="textNews">
            <Form.Control as="textarea" placeholder="Corpo" rows="5" cols="6" value={this.state.text} onChange={this.handleChange} />
            </Form.Group>
          </div>

        <div className="row">
            <Button id="buttonNews" type="submit" size="lg" block>
              Enviar
            </Button>
          </div>
          {this.state.changePage ? <Redirect to={{pathname: "/GerenciamentoNoticias/"}}/> : null}
        </Form>  
      );
    }
  }

  export default NewsForm;
