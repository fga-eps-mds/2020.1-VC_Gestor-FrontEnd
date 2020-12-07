import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import apiNoticias from "../../services/apiNoticias";
import apiPostagem from "../../services/apiPostagem";
import CameraImg from "../../assets/camera.png";


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
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.changePostId = this.changePostId.bind(this);
    }

    async getPosts(){
      var tamanho;
      const posts = await apiPostagem.get("posts?limit=100&page=0");

      if (posts.data.count !== 0) {
        tamanho = (posts.data.count);
        posts.data.rows[tamanho] = posts.data.rows[0];
  
        posts.data.rows[0] = 999; 
  
        this.setState({posts: posts.data.rows});
      } 
    }

    componentDidMount(){
      this.getPosts();
    }

    changePostId(event){
      this.setState({post_id: event.target.value});
    }

    createOptions = () =>
    this.state.posts.length
      ? this.state.posts.map(data => (
          <option key={data.post_id} value={data.post_id} defaultValue={""}>
            {data.post_id} - {data.title}
          </option>
        ))
      : "";
  
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
        // case "image1":
        //   this.setState({image1: event.target.value});
        //   break;
        // case "image2":
        //   this.setState({image2: event.target.value});
        //   break;
        // case "image3":
        //   this.setState({image3: event.target.value});
        //   break;
        // case "linkPost":
        //   this.setState({post_id: event.target.value});
        //   break;
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
      }catch(err){

        if(err.response.data.error === "Fill request.body correctly, cannot be an empty string or null value ") {
          alert("Preencha os valores corretamente, não é permitidos valores em branco");
        } else{
          if (err.response.data.error === "News already with this title") {
            alert(" Titulo de notícia já existe, escolha outro título.")
          }
          else {
            alert("Erro na criação da notícia.")
          }
        }

      }

    }
  
    render() {
      return (

      <Form onSubmit={this.handleSubmit} className="newsForm">
       
          <div className="row">

            <div className="col-8">
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

            <div className="col-4">
            <input 
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
                    <select className="form-control" value={this.state.post_id} onChange={this.changePostId}>
                      {this.createOptions()};
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
    
        </Form>

        
      );
    }
  }

  export default NewsForm;
  