import React from "react";
import "./Anuncio.css"
import apiPostagem from "../../services/apiPostagem";
import { Card, Modal} from "react-bootstrap";
import { faUserCircle, faThumbsUp} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class Anuncio extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
          posts: [],
          place: [],
          category: [],
          user: []
        };
    }

    // Alterar requisao por url 
    async componentDidMount() {
        //  const response2 = await apiPostagem.put(`posts/${id}`, { status: `${newStatus}` });
        var response = await apiPostagem.get(`posts/${this.props.location.state.id}`);

        this.setState({ 
          posts: response.data,
          place: response.data.place,
          category: response.data.category,
          user: response.data.user
            
          });
    }
    
  render() {
    const { posts, place, category, user } = this.state
    return (<>
              <Modal.Dialog className="modal">
            <Modal.Header>
              <Modal.Title>
                <FontAwesomeIcon icon={faUserCircle} style={{ width: "40px", marginRight: "10px" }} />
                {user.name} {user.surname}<br/>
                <h6>{posts.dt_creation}</h6>
                <h6>Estado da postem: {posts.status}</h6>
              </Modal.Title>
            </Modal.Header>
              <Modal.Body>
                <h4>{posts.title}
                <FontAwesomeIcon icon={faThumbsUp} style={{ width: "15px", marginLeft: "50px", marginRight: "10px"}}/>
                {posts.likes}</h4>
                <h5 style={{fontSize: "14px"}}>{category.category_name}</h5>
                <h5 style={{fontSize: "14px"}}>{place.place_name}</h5>
                <p>{posts.description}</p>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Alterar estado para:<br/>
                    <select onChange={this.handleChange}>
                    <option value="Aguardando">Aguardando</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Resolvido">Resolvido</option>
                    <option value="Arquivado">Arquivado</option>
                  </select>
                  </label>
                  <div className="modal-footer">
                    <button className="close-button" onClick={this.handleClose}>Voltar</button>
                    <input className="salve-button" variant="primary" type="submit" value="Salvar"/>
                  </div>
                </form>
              </Modal.Body>
        </Modal.Dialog>
    </>
    );
  }
}

export default Anuncio;