var assert = require("chai").assert;
var sinon = require("sinon");
require("jsdom-global")();

import { act } from "react-dom/test-utils";
import React from "react";
import {mount, render, unmountComponentAtNode } from "react-dom";
import NewsForm from "../src/components/components/NewsForm";
import apiPostagem from "../src/services/apiPostagem";

var server;
let container = null;
beforeEach(() => {
  // Configura um elemento do DOM como alvo do teste
  container = document.createElement("div");
  document.body.appendChild(container);
  server = sinon.fakeServer.create();
});

afterEach(() => {
  // Limpar ao sair
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("News Creation Form", function() {
    describe("Posts request", function() {
      it("Should call get posts, and list the posts", function() {
        sinon.replace(apiPostagem, "get", sinon.fake.resolves([{ post_id: 1,
            title: "Título Post 1",
            description: "Descrição 1",
            image: "Imagem Post 1",
            user_id: 1,
            category_id: 1,
            place_id: 1,
            status: "ok",
            dt_creation: "2020-08-08T00:00:00.000Z" },{ post_id: 2,
                title: "Título Post 2",
                description: "Descrição 2",
                image: "Imagem Post 2",
                user_id: 2,
                category_id: 2,
                place_id: 2,
                status: "ok",
                dt_creation: "2020-08-08T00:00:00.000Z" }]));

        var form;
        act(() => {
          form = mount(<NewsForm className="newsforms" />);
        });
        assert(apiPostagem.get.calledOnce);
        form.update();
        assert.equal(container.querySelectorAll("option")[0].textContent, "Título Post 1");
        // assert.equal(container.querySelector(".titleBenefit").textContent, "Título");
        // assert.equal(container.querySelector(".cardBenefit").style.backgroundColor, "rgb(111, 177, 222)");
        // assert.equal(container.querySelector(".descriptionBenefit").textContent, "Descrição");
        // assert.equal(container.querySelector("a.titleLink").href, "/BeneficiosEditar/1");
      });
      
    });
  });