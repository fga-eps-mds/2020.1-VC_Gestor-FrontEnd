import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import apiBeneficio from "../../services/apiBeneficio";
import { withRouter } from "react-router-dom";

class Forms extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
        description: "",
        price: "" ,
        redeem_way: "" ,
        quantity: 1
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
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
          var regex = /^[0-9]|[.,]?$/gm;
          if(event.target.value.match(regex)!=null){
            this.setState({price: event.target.value});  
          }else{
            this.setState({price: this.state.price});
          }
          regex = /^[0-9]+([,.][0-9]+)?$/gm;
          // if(event.target.value.match(regex)==null){

          // }
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
  
    async handleSubmit(event) {
      event.preventDefault();
      const benefit = this.state;

      try{
        await apiBeneficio.post("benefits",  benefit );
        this.props.history.push("/BeneficiosGerenciar");
        alert("Benefício criado com sucesso!");  
        // return <Redirect to="/BenficiosGerenciar" />;
      }catch(e){
        alert(e); 
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
                <Button id="button_" type="submit" size="lg" block>
                    Enviar
                </Button>
              </div>
            </div>
           
        </Form>

        
      );
    }
  }

  export default withRouter(Forms);
