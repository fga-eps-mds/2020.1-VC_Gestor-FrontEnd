import React from "react";
import "./Anuncio.css";
import apiPostagem from "../../services/apiPostagem";
import { Modal} from "react-bootstrap";
import { faUserCircle, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import unb1 from "../../assets/unb1.jpeg";
import unb2 from "../../assets/unb2.jpeg";
import unb3 from "../../assets/unb3.jpeg";


class Anuncio extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
          posts: [],
          place: [],
          category: [],
          user: [],
          status: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Alterar requisao por url 
    async componentDidMount() {
        //  const response2 = await apiPostagem.put(`posts/${id}`, { status: `${newStatus}` });
        var response = await apiPostagem.get(`posts/${this.props.match.params.post_id}`);

        this.setState({ 
          posts: response.data,
          place: response.data.place,
          category: response.data.category,
          user: response.data.user
            
          });
    }

    handleSubmit = async (e) => {
      if(this.state.posts.status === this.state.status || this.state.status === null) {
        alert("O estadado atual não foi alterado.");
      } else {
       alert("O estado do post foi alterado para: " + this.state.status);
       await apiPostagem.put(`posts/${this.props.match.params.post_id}`, { status: `${this.state.status}` });
     }
    }

   handleChange = (event) => {
     event.preventDefault();
     this.setState({status: event.target.value});
     }
    
  render() {
    const { posts, place, category, user } = this.state;
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
                <FontAwesomeIcon icon={faThumbsUp} style={{ width: "40px", marginLeft: "75%", marginRight: "10px" }}/>
                {posts.likes}</h4>
                <h5 style={{fontSize: "14px"}}>{category.category_name}</h5>
                <h5 style={{fontSize: "14px"}}>{place.place_name}</h5>
                <p>{posts.description}</p>
                <div className="fotos">
                  <img className="foto1" src={unb1} alt="Unb1" style={ {marginRight: "10px"}} />
                  <img className="foto1" src={unb2} alt="Unb2" style={ {marginRight: "10px"}} />
                  <img className="foto1" src={unb3} alt="Unb3" style={ {marginRight: "10px"}} />
                </div><br/>
                <form onSubmit={this.handleSubmit}>
                  <label style={{marginLeft: "80%", marginRight: "10px" }}>
                    Alterar estado para:<br/>
                    <select onChange={this.handleChange} select={posts.status}>
                      <option value="Aguardando">Aguardando</option>
                      <option value="Em andamento">Em andamento</option>
                      <option value="Resolvido">Resolvido</option>
                      <option value="Arquivado">Arquivado</option>
                    </select>
                  </label>
                  <div className="modal-footer">
                  <button className="close-button"><Link  style={{color: "white"}} to={{pathname: "/TabelaPosts"}}>Voltar</Link></button>
                  <input className="salve-button" type="submit" value="Salvar"/>
                  </div>
                </form>
              </Modal.Body>
      </Modal.Dialog>
    </>
    );
  }
}

export default Anuncio;