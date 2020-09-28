import React, { Component } from "react";
import "./estiloPostagem.css";
import { Card } from "react-bootstrap";

class PostagemMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: {},
    };
    this.els = {};
    }
  componentDidMount(){
    this.getSizes();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children && prevProps.active !== this.props.active) {
      this.getSizes();
    }
  }

  getSizes() {
    const rootBounds = this.root.getBoundingClientRect();
    const sizes = {};

    Object.keys(this.els).forEach((key) => {
      const el = this.els[key];
      const bounds = el.getBoundingClientRect();

      const left = bounds.left - rootBounds.left;
      const right = rootBounds.right - bounds.right;

      sizes[key] = {left, right};
    });

    this.setState({sizes});
    return sizes;
  }

  render() {
    return (<>
      <Card style={{ width: '100%' }}>
        <Card.Body>

          <Card.Text>
            <div className="Abas" ref={el => this.root = el}>
              {React.Children.map(this.props.children, (child, i) => {
                let className = `Abas-contain`;
                if (child.key === this.props.active) {
                  className = `${className} Abas-contain-active`;
                }
                return (
                <div className={className} onClick={() => {
                  this.props.onChange(child.key)
                }} ref={el => this.els[child.key] = el}>
                  {child}
                </div>
                );
              })}
              <div
              />
            </div>  
          </Card.Text>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        </Card.Body>
      </Card>
    </>
    );
  }
}

export default PostagemMenu;