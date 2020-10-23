import React from "react";
import { Card, Pagination } from "react-bootstrap";


class NewsEdit extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }


  render() {
    return (<>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Header>Editar noticias</Card.Header>
          <Card.Text>

          </Card.Text>
        </Card.Body>
      </Card>
    </>
    );
  }
}

export default NewsEdit;
