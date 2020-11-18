import React from "react";
import { Card } from "react-bootstrap";
import "./RelatorioDeStatus.css";
import apiPostagem from "../../services/apiPostagem";

class RelatorioDeStatus extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      waiting: 0,
      current: 0,
      solved: 0,
      archived: 0
    }
    ;
}

  async componentDidMount(status) {
    const limit = 100;
    const page = 0;
    var {data} = await apiPostagem.get(`posts?limit=100&page=0`);
    // const filteredData = data.rows.filter(item=>item.status === status);

    const filteredData1 = data.rows.filter(item=>item.status === "Aguardando");
    const filteredData2 = data.rows.filter(item=>item.status === "Em andamento");
    const filteredData3 = data.rows.filter(item=>item.status === "Resolvido");
    const filteredData4 = data.rows.filter(item=>item.status === "Arquivado");

    this.setState({
      waiting : filteredData1.length,
      current : filteredData2.length,
      solved : filteredData3.length,
      archived : filteredData4.length
    });
    }

  render() {
    return (<>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          {/* <Card.Header className="titulo-relatorio">Relatório de Status</Card.Header> */}
          <Card.Text>

            <div class="row cards">
              {/* Card 1 */}
              <div class="col-sm-3">
                <div class="card card1Status">
                  <div class="card-body">
                    <h4 class="card-title">Publicações Aguardando</h4>
                    <p class="card-text">
                      <h5>{this.state.waiting}</h5>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div class="col-sm-3">
                <div class="card card2Status">
                  <div class="card-body">
                    <h4 class="card-title">Publicações em Andamento</h4>
                    <p class="card-text">
                      <h5>{this.state.current}</h5>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div class="col-sm-3">
                <div class="card card3Status">
                  <div class="card-body">
                    <h4 class="card-title">Publicações Resolvidas</h4>
                    <p class="card-text">
                      <h5>{this.state.solved}</h5>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Card 4 */}
              <div class="col-sm-3">
                <div class="card card4Status">
                  <div class="card-body">
                    <h4 class="card-title">Publicações Arquivadas</h4>
                    <p class="card-text">
                      <h5>{this.state.archived}</h5>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Fim dos cards */}

          </Card.Text>
        </Card.Body>
      </Card>
    </>
    );
  }
}

export default RelatorioDeStatus;
