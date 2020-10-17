import React from "react";
import apiBeneficio from "../../services/apiBeneficio";
import CardBenefit from "../components/CardBenefit";

class BeneficiosGerenciar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      benefits: null
    };
  }

  async getBenefits(){
    
    //console.log(this.benefits[0]);
  }

  componentWillMount(){
    const response = apiBeneficio.get("benefits").then(
        response => {
          this. = null;
          this.setState({externalData});
        }
      );
    this.state.benefits = response.data;
    this.setState(this.state.benefits);
    console.log(this.state.benefits)
  }

  render() {
    return (<div>
      < CardBenefit title=""/>
    </div>
    );
  }
}

export default BeneficiosGerenciar;