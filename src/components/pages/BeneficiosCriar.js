import React from "react";
import { Card } from "react-bootstrap";
import Forms from "../components/Forms";
import "./Beneficios.css";

class CriarBeneficios extends React.Component {

  render() {
    return (<>
            
      <Card className="cardBenefits">
      <Card.Header className="cardHeaderBenefits"><h3>Criação de Benefícios</h3></Card.Header>
        <Card.Text className="cardTextBenefits">
          <Forms className="formsBenefits" />
        </Card.Text>

      </Card>
    </>
    );
  }
}

export default CriarBeneficios;
