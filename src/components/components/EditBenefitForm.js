import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import apiBeneficio from "../../services/apiBeneficio";
import { withRouter , Redirect } from "react-router-dom";
//import {} from "react-router"
import { Row } from "react-bootstrap";



class EditBenefitForm extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        title: "",
        description: "",
        price:  null,
        redeem_way: "" ,
        quantity: null
      };

      this.id = this.props.match.params.benefitId;

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
        const response = await apiBeneficio.put("benefits/"+this.id,  benefit );
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
       
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="row">
              <Form.Group controlId="title" id="title_">
                  <Form.Label>Título</Form.Label>
                  <Form.Control style={{ width:"100%" }}  type="text" placeholder="Título do Benefício" value={this.state.title} onChange={this.handleChange} />
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group controlId="price" id="price_">
              <Form.Label>Preço</Form.Label>
              <Form.Control type="text" placeholder="Preço" value={this.state.price} onChange={this.handleChange} />
            </Form.Group>

              <Form.Group controlId="quantity" id="quantity_">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control  as="select" value={this.state.quantity} onChange={this.handleChange} custom>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Control>
            </Form.Group>

              <Form.Group controlId="redeem_way" id="redeem_way_">
                <Form.Label>Meio de Resgate</Form.Label>
                <Form.Control type="text" placeholder="Meio de Resgate do Benefício" value={this.state.redeem_way} onChange={this.handleChange} />
            </Form.Group>
            </div>
            <div className="row">
              <Form.Group controlId="description" id="description_">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control as="textarea" placeholder="Descrição dos Benefícios"rows="3" cols="6" value={this.state.description} onChange={this.handleChange} />
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

  export default withRouter(EditBenefitForm);
