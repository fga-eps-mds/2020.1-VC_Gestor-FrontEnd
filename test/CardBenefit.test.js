var assert = require('chai').assert;
// var jsdom = require("mocha-jsdom");
import { act } from "react-dom/test-utils";

import React from "react";
import {render, unmountComponentAtNode } from "react-dom";
import CardBenefit from "../src/components/components/CardBenefit";
require('jsdom-global')()



let container = null;
beforeEach(() => {
  // Configura um elemento do DOM como alvo do teste
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Limpar ao sair
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Benefit Card', function() {
    describe('Props', function() {
      it('Should be received in the card', function() {
        act(() => {
          render(<CardBenefit color="#6FB1DE" benefitId={1} title="Título" description="Descrição"/>, container);
          
        });
        assert.equal(container.querySelector(".titleBenefit").textContent, "Título");
        assert.equal(container.querySelector(".cardBenefit").style.backgroundColor, "rgb(111, 177, 222)");
        assert.equal(container.querySelector(".descriptionBenefit").textContent, "Descrição");
        assert.equal(container.querySelector("a.titleLink").href, "/BeneficiosEditar/1");
      });
      
    });
  });