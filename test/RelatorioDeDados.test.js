var assert = require("chai").assert;
var sinon = require("sinon");
require("jsdom-global")();

import { act, Simulate } from "react-dom/test-utils";
import React from "react";
import {render, unmountComponentAtNode } from "react-dom";
import RelatorioDeDados from "../src/components/pages/RelatorioDeDados";
import apiPostagem from "../src/services/apiPostagem";
// import apiPostagem from "../../services/apiPostagem";

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
  sinon.restore();
});

describe("Dashboard page", function(){
    const dashboardData = {data: {
        newPosts: 15,
        newPostsAnon: 10,
        likes: 45,
        totalUsers: 13,
        active: "mensal",
        type: "1",
        dateShow: new Date()
    }};


    describe("Dashboard request", function() {
        it("Should call get dashboard",async function() {
            sinon.replace(apiPostagem, "get", sinon.fake.resolves(dashboardData));
                
            await act(async () => {
                render(<RelatorioDeDados />, container);
            });

            assert(apiPostagem.get.calledOnce);
        });      
    });
    describe("Active submition", function(){
        it("Should trigger click", async function(){
            // sinon.replace(apiPostagem, "get", sinon.fake.resolves(dashboardData));

            // const spyHandleChange = sinon.spy(RelatorioDeDados.prototype,"changeDate");
            // act( () => {
            //     render(<RelatorioDeDados.WrappedComponent match={{params : {event: "Sun Nov 01 2020 20:14:29 GMT-0300 (Horário Padrão de Brasília)",
            //     dia: "mensal", type: "1"}}} />, container);
            //   });

            //   assert(spyHandleChange.calledOnce);

            // await act(async () => {
            //     render(<RelatorioDeDados />, container);
            // });

            // act(() => {
            //     Simulate.click(container.querySelectorAll("col-8 a")[3]);
            // });

            // var dashDay = container.querySelectorAll("row cards dash h5");
            // assert.equal(dashDay[0].textContent, "15");
            

        })
    })
});

