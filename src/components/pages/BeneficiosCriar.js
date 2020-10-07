import React from "react";
import { Card } from "react-bootstrap";
import Forms from "../components/Forms";

class CriarBeneficios extends React.Component {

  render() {
    return (<>
      <Card style={{ width: '100%' , display: "flex", justifyContent: 'center', alignItems: 'center' }}>
        <Card.Body style={{width: '70%'}}> 
          <Card.Header>Criação de Benefícios</Card.Header>
          <Card.Text>
            <Forms></Forms>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
    );
  }
}

export default CriarBeneficios;
