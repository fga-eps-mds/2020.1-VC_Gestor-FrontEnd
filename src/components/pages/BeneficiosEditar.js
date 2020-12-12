import React from "react";
import { Card } from "react-bootstrap";
import EditBenefitForm from "../components/EditBenefitForm";
import "./Beneficios.css";

class BeneficiosEditar extends React.Component {

  render() {
    return (<>
      <Card className="cardEdit">
      <Card.Header className="card-header_">
          <h3>Edição de Benefícios</h3>
        </Card.Header>
        <Card.Text className="text">
          <EditBenefitForm className="forms" />
        </Card.Text>
      </Card>
    </>
    );
  }
}

export default BeneficiosEditar;
