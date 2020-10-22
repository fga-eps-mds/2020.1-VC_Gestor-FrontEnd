import React from "react";
import { Card } from "react-bootstrap";
import EditBenefitForm from "../components/EditBenefitForm";
import "./Beneficios.css";
import { useParams } from "react-router-dom";

class BeneficiosEditar extends React.Component {

  render() {
    const { benefitId } = this.props.match.params;
    return (<>
      <Card className="card">
      <Card.Header className="card-header_"><h3>Edição de Benefícios</h3></Card.Header>
        <Card.Text className="text">
          <EditBenefitForm className="forms" />
        </Card.Text>
      </Card>
    </>
    );
  }
}

export default BeneficiosEditar;
