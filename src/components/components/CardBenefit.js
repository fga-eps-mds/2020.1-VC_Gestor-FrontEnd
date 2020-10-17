import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "./cardBenefit.css";


class CardBenefit extends React.Component {

  render() {
    return ( 
      <Card className="cardBenefit">
      <Card.Body>
        <div className="row">
          <div className="col-8">
            <Card.Title className="titleBenefit">Título</Card.Title>
          </div>
          <div className="iconsBenefit col-1">
            <FontAwesomeIcon icon={faPen} style={{ width: "20px", marginRight: "10px"}}/>
          </div>
          <div className="iconsBenefit col-1">
            <FontAwesomeIcon icon={faTrashAlt} style={{ width: "20px", marginRight: "10px"}}/>
          </div>
        </div>
        <Card.Text className="descriptionBenefit">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Card.Text>
      </Card.Body>
    </Card>
     );
  }
}

export default CardBenefit;