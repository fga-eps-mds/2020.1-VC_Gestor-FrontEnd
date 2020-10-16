import React from "react";
import { Card } from "react-bootstrap";
import Forms from "../components/Forms";
import "./BeneficiosCriar.css";
import apiBeneficio from '../../services/apiBeneficio';

class BeneficiosGerenciar extends React.Component {
  constructor(props){
    super(props);
    this.benefits = {};
    this.getBenefits();
  }

  async getBenefits(){
    const response = await apiBeneficio.get("benefits");
    this.benefits = response.data;
  }

  render() {
    return (<>
      
    </>
    );
  }
}

export default BeneficiosGerenciar;