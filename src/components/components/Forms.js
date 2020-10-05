import React, { Component } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

class Forms extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Enviado' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <Form ref="form" onSubmit={this.handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" placeholder="Título do Benefício" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Descrição</Form.Label>
                <Form.Control as="textarea" placeholder="Descrição dos Benefícios"rows="3" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Preço</Form.Label>
                <Form.Control type="text" placeholder="Preço" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1" onChange={this.handleChange}>
                <Form.Label>Quantidade</Form.Label>
                <Form.Control type="text" placeholder="Quantidade" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1" onChange={this.handleChange}>
                <Form.Label>Meio de Resgate</Form.Label>
                <Form.Control type="text" placeholder="Meio de Resgate do Benefício" />
            </Form.Group>

            <Button type="submit" size="lg" block>
                Enviar
            </Button>
            
        </Form>

        
      );
    }
  }

  export default Forms