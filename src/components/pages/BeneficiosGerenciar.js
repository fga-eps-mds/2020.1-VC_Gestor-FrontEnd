import React from "react";
import apiBeneficio from "../../services/apiBeneficio";
import CardBenefit from "../components/CardBenefit";

class BeneficiosGerenciar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      benefits: null
    };
    //this.getBenefits();
    this.colors = ["#6FB1DE", "#438ABB", "#226D9F", "#0F4C75"];
  }

  async getBenefits(){
    const response = await apiBeneficio.get("benefits");
    this.setState({benefits: response.data});
  }

  componentDidMount(){
    this.getBenefits();
  }



  render() {
    if(this.state.benefits == null){
      return (<div> Loading </div>);
    }else{
      return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          {this.state.benefits.map((benefitItem, index) => {
            return (
              <div key={index} className="col">
                <CardBenefit  color={this.colors[index%4]} benefit_id={benefitItem.benefit_id} title={benefitItem.title} description={benefitItem.description}/>
              </div>
            );
          })}
      </div>);
    }
    
  }
}

export default BeneficiosGerenciar;