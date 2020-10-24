import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import apiBeneficio from "../../services/apiBeneficio";
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
        image1: "" ,
        image2: "",
        image3: ""
      };

      this.id = this.props.match.params.newsId;

      // this.history = useHistory();
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getNews(){
      const response = await apiNoticias.get("news/"+this.id);
      this.setState(response.data);
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
  
    render() {
      return (
        <Form onSubmit={this.handleSubmit} >
          <div className="container-fluid form-news">
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
                    <Form.Control type="text" placeholder="Linkar Postagem" value={"Lembrar de arrumar"} onChange={this.handleChange} />
                </Form.Group>
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
