import React from "react";
import { Card } from "react-bootstrap";

class Option1 extends React.Component {

  render() {
    return (<>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Header>Option1</Card.Header>
          <Card.Text>
            Option1 Option1 Option1 Option1 Option1 Option1
          </Card.Text>
        </Card.Body>
      </Card>
    </>
    );
  }
}

export default Option1;
