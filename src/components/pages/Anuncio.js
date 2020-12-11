import React from "react";
import "./Anuncio.css";
import apiPostagem from "../../services/apiPostagem";
import { Modal} from "react-bootstrap";
import { faUserCircle, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import unb1 from "../../assets/unb1.jpeg";
import unb2 from "../../assets/unb2.jpeg";
import unb3 from "../../assets/unb3.jpeg";


class Anuncio extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
          posts: [],
          title: [],
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
      // console.log("oi");
      var response = await apiPostagem.get(`/postage/list_one/${this.props.match.params.post_id}`);
      // console.log(response);
      this.setState({ 
        posts: response.data,
        });
    }

    handleSubmit = async (e) => {
      e.preventDefault();
      if(this.state.posts.status === this.state.status || this.state.status === null) {
        alert("O estado atual não foi alterado.");
      } else {
          await apiPostagem.put(`/postage/update_status/${this.props.match.params.post_id}`, { post_status: `${this.state.status}` });
          alert("O estado do post foi alterado para: " + this.state.status);
     }
     window.location.reload(false);
    }

   handleChange = (event) => {
     event.preventDefault();
     this.setState({status: event.target.value});
     }
     
    
  render() {
    const { posts} = this.state;
    return (<>
      <Modal.Dialog className="modal">
        <Modal.Header>
          <Modal.Title>
            <FontAwesomeIcon icon={faUserCircle} style={{ width: "50px", height: "50px", marginRight: "10px" }} />
            {posts.post_author}<br/>
            <h6><strong>{posts.post_created_at}</strong></h6>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4><strong>{posts.post_title}</strong>{posts.title}
          <FontAwesomeIcon icon={faThumbsUp} style={{ width: "40px", height: "30px", marginLeft: "50%", marginRight: "10px" }}/>
          {posts.__v}</h4>
          <h5>{posts.post_category}</h5>
          <h6>{posts.post_place}</h6>
          <hr></hr>

          <p>{posts.post_description}</p>
          {/* <div className="fotos">
            <img className="foto1" src={unb1} alt="Unb1" style={ {marginRight: "10px"}} />
              <img className="foto1" src={unb2} alt="Unb2" style={ {marginRight: "10px"}} />
              <img className="foto1" src={unb3} alt="Unb3" style={ {marginRight: "10px"}} />
            </div><br/> */}

            <div className="col-5">    
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img className="d-block w-100" src={unb1} alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100" src={unb2} alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100"src={unb3} alt="Third slide"/>
                    </div>
                  </div>
                  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
                {/* <div>
                    <input type="file" ref={this.fileInput} name="filetoupload" onChange={this.changePhoto}/>
                </div> */}
            </div>

          <form onSubmit={this.handleSubmit}>
            <label style={{marginLeft: "80%", marginRight: "10px" }}>
              Alterar estado para:<br/>
                <select onChange={this.handleChange} select={posts.post_status}>
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