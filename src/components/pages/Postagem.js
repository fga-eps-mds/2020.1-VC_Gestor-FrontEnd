import React, { Component } from "react";
import { Card } from "react-bootstrap";
import PostagemMenu from '../components/PostagemMenu'
import Tabela3 from './TabelaPosts'
import { faAngleDown} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Postagem extends Component {
constructor(props) {
  super(props);
  this.state = {
    active: 'aTab',
  };
}

  render() {
    const content = {
      Aba1: '',
      Aba2: <Tabela3/>,
      Aba3: 'Processos finalizados',
      Aba4: 'Processos concluidos',
    };

    return (<>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Header>
            
          </Card.Header>

          <Card.Text className="container">
          <nav className='menu-anuncio'>
            <PostagemMenu active={this.state.active}
              onChange={active => this.setState({active})}>
              <div className='button-anuncio'key="Aba1">Anúncio</div>
                <div key="Aba2">Caixa de Entrada</div>
              <div key="Aba3">Em Aberto</div>
              <div key="Aba4">Finalizados</div>
            </PostagemMenu>
          </nav>
            <Card.Body className="conteudo">
            <div>
              <p className="titulo-conteudo">
                Mais
                <FontAwesomeIcon icon={faAngleDown} style={{ width: "15px", marginLeft: "10px", marginRight: "5px"}}/></p>
              <p>{content[this.state.active]}</p>
            </div>
            </Card.Body>
          </Card.Text>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        </Card.Body>
      </Card>
    </>
    );
  }

}

export default Postagem;