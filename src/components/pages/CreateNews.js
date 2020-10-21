import React from "react";
import { Card } from "react-bootstrap";
import NewsForm from "../components/NewsForm";
import "./CreateNews.css";

class CreateNews extends React.Component {

  render() {
    return (<>
            
      <Card className="cardNews">
      <Card.Header className="cardHeaderNews">
        <h3>Criação de Notícias</h3>
      </Card.Header>
        <Card.Text className="textNews">
          <NewsForm className="newsforms" />
        </Card.Text>

      </Card>
    </>
    );
  }
}

export default CreateNews;
