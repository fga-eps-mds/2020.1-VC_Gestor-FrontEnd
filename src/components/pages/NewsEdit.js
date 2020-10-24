import React from "react";
import { Card } from "react-bootstrap";
import EditNewsForm from "../components/EditNewsForm";
import "../components/editNewsForm.css";

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
          <Card.Header style={{backgroundColor: "#226D9F", color: "white", textAlign : "center", fontSize: "2rem"}}>Editar noticias</Card.Header>
          <Card.Text>
            <EditNewsForm />
          </Card.Text>
        </Card.Body>
      </Card>
    </>
    );
  }
}

export default NewsEdit;
