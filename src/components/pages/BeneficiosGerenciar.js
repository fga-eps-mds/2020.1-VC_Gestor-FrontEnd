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
    this.colors = ["#00a6eb", "#0068b4", "#104e7b", "#003366"];
  }

  async getBenefits(){
    const response = await apiBeneficio.get("benefits");
    this.setState({benefits: response.data});
  }

  componentDidMount(){
    this.getBenefits();
  }

  async deleteBenefits(benefitId){
    if(window.confirm("Tem certeza que quer excluir o benefício?")){
      try{
        await apiBeneficio.delete(`/benefits/${benefitId}`);
        const beneficios = this.state.benefits.filter((benefit) => benefit.benefit_id !== benefitId);
        await this.setState({benefits: beneficios});
      }
      catch(error){
        alert("Ocorreu um erro e não conseguimos excluir o benefício");
      }  
    }
  }


  render() {
    if(this.state.benefits == null){
      return (<div> Loading </div>);
    }else{
      return (
        <div className="container-fluid">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            {this.state.benefits.map((benefitItem, index) => {
              return (
                <div key={index} className="col" >
                  <CardBenefit deleteBenefits={this.deleteBenefits} color={this.colors[index%4]} benefitId={benefitItem.benefit_id} title={benefitItem.title} description={benefitItem.description}/>
                </div>
              );
            })}
        </div>
      </div>);
    }
    
  }
}

export default BeneficiosGerenciar;