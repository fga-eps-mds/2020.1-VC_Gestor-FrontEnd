import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import api from "../../services/api";


class Forms extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
        description: "",
        price: 1000000 ,
        redeem_way: "" ,
        quantity: 10
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      switch(event.target.id){
        case  "title":
          this.setState({title: event.target.value});
          break;
        case "description":
          this.setState({description: event.target.value});
          break;
        case "price":
          this.setState({price: event.target.value});
          break;
        case "redeem_way":
          this.setState({redeem_way: event.target.value});
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

      const response = await api.post("benefits",  benefit );
    }
  
    render() {
      return (
        <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" placeholder="Título do Benefício" value={this.state.title} onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Preço</Form.Label>
              <Form.Control type="text" placeholder="Preço" value={this.state.price} onChange={this.handleChange} />
            </Form.Group>


            <Form.Group controlId="quantity">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control as="select" value={this.state.quantity} onChange={this.handleChange} custom>
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

            <Form.Group controlId="redeem_way">
                <Form.Label>Meio de Resgate</Form.Label>
                <Form.Control type="text" placeholder="Meio de Resgate do Benefício" value={this.state.redeem_way} onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Descrição</Form.Label>
                <Form.Control as="textarea" placeholder="Descrição dos Benefícios"rows="3" value={this.state.description} onChange={this.handleChange} />
            </Form.Group>

            <Button type="submit" size="lg" block>
                Enviar
            </Button>
            
        </Form>

        
      );
    }
  }

  export default Forms;
