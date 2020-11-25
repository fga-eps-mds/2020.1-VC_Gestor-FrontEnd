import React from "react";
import { Row, Col } from "react-bootstrap";
import "./RelatorioDeStatus.css";
import apiPostagem from "../../services/apiPostagem";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class RelatorioDeStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      waiting: 0,
      current: 0,
      solved: 0,
      archived: 0,
      aguardando: 0,
      andamento: 0,
      resolvido: 0,
      arquivado: 0,
    };
    this.graphComponent = this.graphComponent.bind(this);
  }

  async componentDidMount(status) {
    let { data } = await apiPostagem.get(`posts?limit=100&page=0`);
    // const filteredData = data.rows.filter(item=>item.status === status);

    const filteredData1 = data.rows.filter(item => item.status === "Aguardando");
    const filteredData2 = data.rows.filter(item => item.status === "Em andamento");
    const filteredData3 = data.rows.filter(item => item.status === "Resolvido");
    const filteredData4 = data.rows.filter(item => item.status === "Arquivado");

    this.setState({
      waiting: filteredData1.length,
      current: filteredData2.length,
      solved: filteredData3.length,
      archived: filteredData4.length
    });
    let graph = await apiPostagem.post(`/posts/graphStatus/`);
    await console.log(graph.data.data)
    this.setState({ graph: graph.data });
  }

  graphComponent(id, nounce) {
    let that = this;
    let title = "Graph",
      data = [[0, 0]];
    if (this.state.graph !== undefined) {
      switch (id + nounce) {
        case 0:
          title = "Registro Anual - Aguardando"
          data = this.state.graph.aguardando.anual
          break;
        case 1:
          title = "Registro Mensal - Aguardando"
          data = this.state.graph.aguardando.mensal
          break;
        case 2:
          title = "Registro Semanal - Aguardando"
          data = this.state.graph.aguardando.semanal
          break;
        case 3:
          title = "Registro Diário - Aguardando"
          data = this.state.graph.aguardando.diario
          break;
        case 4:
          title = "Registro Anual - Em Andamento"
          data = this.state.graph.andamento.anual
          break;
        case 5:
          title = "Registro Mensal - Em Andamento"
          data = this.state.graph.andamento.mensal
          break;
        case 6:
          title = "Registro Semanal - Em Andamento"
          data = this.state.graph.andamento.semanal
          break;
        case 7:
          title = "Registro Diário - Em Andamento"
          data = this.state.graph.andamento.diario
          break;
        case 8:
          title = "Registro Anual - Resolvidas"
          data = this.state.graph.resolvido.anual
          break;
        case 9:
          title = "Registro Mensal - Resolvidas"
          data = this.state.graph.resolvido.mensal
          break;
        case 10:
          title = "Registro Semanal - Resolvidas"
          data = this.state.graph.resolvido.semanal
          break;
        case 11:
          title = "Registro Diário - Resolvidas"
          data = this.state.graph.resolvido.diario
          break;
        case 12:
          title = "Registro Anual - Arquivadas"
          data = this.state.graph.arquivados.anual
          break;
        case 13:
          title = "Registro Mensal - Arquivadas"
          data = this.state.graph.arquivados.mensal
          break;
        case 14:
          title = "Registro Semanal - Arquivadas"
          data = this.state.graph.arquivados.semanal
          break;
        case 15:
          title = "Registro Diário - Arquivadas"
          data = this.state.graph.arquivados.diario
          break;
        default:
          break;
      }
    }
    let changeGraph = (newState) => {
      if (id === 0) {
        this.setState({ aguardando: newState })
      }
      if (id === 4) {
        this.setState({ andamento: newState })
      }
      if (id === 8) {
        this.setState({ resolvido: newState })
      }
      if (id === 12) {
        this.setState({ arquivado: newState })
      }
    }
    return (<>
      <div class="card text-center" id="graph">
        <div style={{ marginBottom: "10px" }} class="card-header card-dates">
          <div id="title-header">{title}</div>
          <ul class="nav nav-pills card-header-tabs">
            <li class="nav-item" style={"hoje" === this.state.active ? { textDecoration: "underline" } : null}>
              <a class="nav-link" aria-current="true" href="#!"
                onClick={() => { changeGraph(3); }}>
                <span>Hoje</span>
              </a>
            </li>
            <li class="nav-item" style={"semanal" === this.state.active ? { textDecoration: "underline" } : null}>
              <a class="nav-link" href="#!" onClick={() => { changeGraph(2); }}>
                <span>Semanal</span>
              </a>
            </li>
            <li class="nav-item" style={"mensal" === this.state.active ? { textDecoration: "underline" } : null}>
              <a class="nav-link" href="#!" onClick={() => { changeGraph(1); }}>
                <span>Mensal</span>
              </a>
            </li>
            <li class="nav-item" style={"anual" === this.state.active ? { textDecoration: "underline" } : null}>
              <a class="nav-link" href="#!" onClick={() => { changeGraph(0); }}>
                <span>Anual</span>
              </a>
            </li>
          </ul>
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {  
              type: 'line',
              height: "282px",
              events: {
                load: function () {
                  that.graph = this;
                }
              }
            },
            xAxis: {
              type: 'datetime',
            },
            title: {
              text: ''
            },
            yAxis: {
              title: false
            },
            series: [{
              marker:{
                enabled:false
              },
              showInLegend: false,
              data: data
            }]
          }}
        />
      </div>
    </>)
  }

  render() {
    return (
      <div style={{ display: "inline", width: "98%" }}>
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
        <Row>
          <Col style={{ width: "10%" }}>
            {this.graphComponent(0, this.state.aguardando)}
          </Col>
          <Col style={{ width: "10%" }}>
            {this.graphComponent(4, this.state.andamento)}
          </Col>
        </Row>
        <Row>
          <Col style={{ width: "10%" }}>
            {this.graphComponent(8, this.state.resolvido)}
          </Col>
          <Col style={{ width: "10%" }}>
            {this.graphComponent(12, this.state.arquivado)}
          </Col>
        </Row>
      </div>
    );
  }
}

export default RelatorioDeStatus;
