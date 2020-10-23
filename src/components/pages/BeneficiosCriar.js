import React from "react";
import { Card } from "react-bootstrap";
import Forms from "../components/Forms";
import "./Beneficios.css";

class CriarBeneficios extends React.Component {

  render() {
    return (<>
            
      <Card className="card">
      <Card.Header className="card-header_"><h3>Criação de Benefícios</h3></Card.Header>
        <Card.Text className="text">
          <Forms className="forms" />
        </Card.Text>

      </Card>
    </>
    );
  }
}

export default CriarBeneficios;
