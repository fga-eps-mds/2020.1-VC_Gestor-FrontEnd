import React, { Component } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Forms extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        description: '',
        price: 1000000 ,
        redeemWay: '' ,
        quantity: 10
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({title: event.target.value});
      this.setState({description: event.target.value});
      this.setState({price: event.target.value});
      this.setState({redeemWay: event.target.value});
      this.setState({quantity: event.target.value});
    }
  
    async handleSubmit(event) {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(this.state)
      };
      const response = await fetch('https://localhost:3003/benefits', requestOptions);
    }
  
    render() {
      return (
        <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" placeholder="Título do Benefício" />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Preço</Form.Label>
              <Form.Control type="text" placeholder="Preço" />
            </Form.Group>


            <Form.Group controlId="quantity">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control as="select" custom>
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

            <Form.Group controlId="redeemWay">
                <Form.Label>Meio de Resgate</Form.Label>
                <Form.Control type="text" placeholder="Meio de Resgate do Benefício" />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Descrição</Form.Label>
                <Form.Control as="textarea" placeholder="Descrição dos Benefícios"rows="3" />
            </Form.Group>

            <Button type="submit" size="lg" block>
                Enviar
            </Button>
            
        </Form>

        
      );
    }
  }

  export default Forms
