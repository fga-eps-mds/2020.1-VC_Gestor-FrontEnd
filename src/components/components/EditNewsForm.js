import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import apiBeneficio from "../../services/apiBeneficio";
import { withRouter } from "react-router-dom";
import "./editNewsForm.css";



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

    async getBenefits(){
      const response = await apiBeneficio.get("benefits/"+this.id);
      this.setState(response.data);
    }

    componentDidMount(){
      this.getBenefits();
    }
  
    handleChange(event){
      switch(event.target.id){
        case  "title":
          if(event.target.value.length<=20){
            this.setState({title: event.target.value});
          }
          break;
        case "description":
          if(event.target.value.length<=20){
            this.setState({description: event.target.value});
          }
          break;
        case "price":
          const regex = /^[0-9]|[.,]?$/gm;
          if(event.target.value.match(regex)!=null){
            this.setState({price: event.target.value});  
          }else{
            this.setState({price: this.state.price});
          }
          break;
        case "redeem_way":
          if(event.target.value.length<=25){
            this.setState({redeem_way: event.target.value});
          }
          break;
        case "quantity":
          this.setState({quantity: event.target.value});
          break;
        default: break;
      }
    }
  
    async handleSubmit(event){
      event.preventDefault();
      const benefit = this.state;
      
      try{
        await apiBeneficio.put("benefits/"+this.id,  benefit );
        alert("Benefício foi alterado com sucesso!");
        this.props.history.push("/BeneficiosGerenciar");
      }catch(e){
        alert("Ocorreu um erro e não foi possível criar o benefício"); 
      }
    }


    deleteBenefits = async (benefitId) => {
      if(window.confirm("Tem certeza que quer excluir o benefício?")){
        try{
          await apiBeneficio.delete(`/benefits/${benefitId}`);
          this.props.history.push("/BeneficiosGerenciar");
        }
        catch(error){
          alert("Ocorreu um erro e não conseguimos excluir o benefício");
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
                    <Form.Control type="text" placeholder="Linkar Postagem" value={this.state.subtitle} onChange={this.handleChange} />
                </Form.Group>
            </div>
            <div className="row">
              <Form.Group controlId="text" className="text-news">
                  <Form.Label>Corpo</Form.Label>
                  <Form.Control as="textarea" placeholder="Corpo" rows="5" cols="6" value={this.state.description} onChange={this.handleChange} />
              </Form.Group>
            </div>
            <div className="row">
              <div className="col-3">
                <Button id="delete" type="button" onClick={() => this.deleteBenefits(this.id)} size="lg" block>
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
