var assert = require("chai").assert;
var sinon = require("sinon");
require("jsdom-global")();

import { act, Simulate } from "react-dom/test-utils";
import React from "react";
import {render, unmountComponentAtNode } from "react-dom";
import RelatorioDeStatus from "../src/components/pages/RelatorioDeStatus";
import apiPostagem from "../src/services/apiPostagem";
// import apiPostagem from "../../servitextContentces/apiPostagem";

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
    const dashboardData = () => ({data: 
        [
            {
            post_status: "Aguardando",
            post_support_number: 1,
            post_supporting: false,
            post_reporting: false,
            post_reports: 0,
            _id: "5fcebeb180397e0018842b03",
            post_title: "Janela quebrada",
            post_place: "FCE",
            post_category: "Infraestrutura",
            post_description: "Janela da sala 11 está quebrada na sua fechadura",
            fk_user_id: "5fcebe9c80397e0018842b02",
            post_author: "BRUNO ALVES FELIX",
            post_created_at: "07/12/2020",
            __v: 0
            },
            {
            post_status: "Aguardando",
            post_support_number: 2,
            post_supporting: false,
            post_reporting: false,
            post_reports: 0,
            _id: "5fced13a80397e0018842b05",
            post_title: "Postagem Teste",
            post_place: "DARCY",
            post_category: "Meio Ambiente",
            post_description: "a",
            fk_user_id: "5fced10380397e0018842b04",
            post_author: "a",
            post_created_at: "08/12/2020",
            __v: 0
            },
            {
            post_status: "Aguardando",
            post_support_number: 0,
            post_supporting: false,
            post_reporting: false,
            post_reports: 0,
            _id: "5fced14d80397e0018842b06",
            post_title: "Teste anonimo",
            post_place: "FCE",
            post_category: "Infraestrutura",
            post_description: "asdsad",
            post_created_at: "08/12/2020",
            __v: 0,
            fk_user_id: null,
            post_author: null
            },
            {
            post_status: "Aguardando",
            post_support_number: 0,
            post_supporting: false,
            post_reporting: false,
            post_reports: 0,
            _id: "5fced16180397e0018842b07",
            post_title: "Postagem anonima",
            post_place: "FCE",
            post_category: "Meio Ambiente",
            post_description: "dsfdsafdsafasd",
            post_created_at: "08/12/2020",
            __v: 0,
            fk_user_id: null,
            post_author: null
            },
            {
            post_status: "Aguardando",
            post_support_number: 1,
            post_supporting: false,
            post_reporting: false,
            post_reports: 0,
            _id: "5fced25880397e0018842b09",
            post_title: "Porta quebrada",
            post_place: "DARCY",
            post_category: "Infraestrutura",
            post_description: "Hoje por volta de  12:00 encontrei a porta do banheiro masculino da biblioteca quebrada",
            fk_user_id: "5fced16f80397e0018842b08",
            post_author: "Denys",
            post_created_at: "08/12/2020",
            __v: 0
            },
            {
            post_status: "Aguardando",
            post_support_number: 0,
            post_supporting: false,
            post_reporting: false,
            post_reports: 0,
            _id: "5fced4d280397e0018842b0b",
            post_title: "Ar condicionado quebrado",
            post_place: "FGA",
            post_category: "Infraestrutura",
            post_description: "Hoje na aula de probabilidade e estatística a professora tentou ligar o ar condicionado mas o mesmo apresentou problemas.",
            fk_user_id: "5fced16f80397e0018842b08",
            post_author: "Denys",
            post_created_at: "08/12/2020",
            __v: 0
            },
            {
            post_status: "Aguardando",
            post_support_number: 1,
            post_supporting: false,
            post_reporting: false,
            post_reports: 0,
            _id: "5fcfb22b4afeb0001832c1ea",
            post_title: "Mesa quebrada ",
            post_place: "FGA",
            post_category: "Infraestrutura",
            post_description: "Hoje encontrei uma mesa quebrada na sala S10",
            fk_user_id: "5fcfa3214afeb0001832c1db",
            post_author: "Aluno",
            post_created_at: "08/12/2020",
            __v: 0
            }
        ]
    });


    describe("Dashboard request", function() {
        it("Should call get dashboard",async function() {
            sinon.replace(apiPostagem, "get", sinon.fake.resolves(dashboardData()));
                
            await act(async () => {
                render(<RelatorioDeStatus />, container);
            });

            assert(apiPostagem.get.calledOnce);
        });      
    });
    describe("Active submition", function(){
        it("Should trigger click status", async function(){
            sinon.replace(apiPostagem, "get", sinon.fake.resolves(dashboardData()));
            // var time = new Date();
            // console.log(clock);

            await act(async () => {
                render(<RelatorioDeStatus />, container);
            });

            // Simular dados anuais
            await act(async () => {
                Simulate.click(container.querySelectorAll("ul a")[3]);
            });
            var dashCard1 = container.querySelector(".card1Status h5");
            var dashCard2 = container.querySelector(".card2Status h5");
            var dashCard3 = container.querySelector(".card3Status h5");
            var dashCard4 = container.querySelector(".card4Status h5");
            assert.equal(dashCard1.textContent, "7");
            assert.equal(dashCard2.textContent, "0");
            assert.equal(dashCard3.textContent, "0");
            assert.equal(dashCard4.textContent, "0");

            // Simular dados mensais
            await act(async () => {
                Simulate.click(container.querySelectorAll("ul a")[2]);
            });
            var dashCard1 = container.querySelector(".card1Status h5");
            var dashCard2 = container.querySelector(".card2Status h5");
            var dashCard3 = container.querySelector(".card3Status h5");
            var dashCard4 = container.querySelector(".card4Status h5");
            assert.equal(dashCard1.textContent, "7");
            assert.equal(dashCard2.textContent, "0");
            assert.equal(dashCard3.textContent, "0");
            assert.equal(dashCard4.textContent, "0");

            // Simular dados semanais
            await act(async () => {
                Simulate.click(container.querySelectorAll("ul a")[1]);
            });
            var dashCard1 = container.querySelector(".card1Status h5");
            var dashCard2 = container.querySelector(".card2Status h5");
            var dashCard3 = container.querySelector(".card3Status h5");
            var dashCard4 = container.querySelector(".card4Status h5");
            assert.equal(dashCard1.textContent, "6");
            assert.equal(dashCard2.textContent, "0");
            assert.equal(dashCard3.textContent, "0");
            assert.equal(dashCard4.textContent, "0");

           // Simular dados diarios
            await act(async () => {
                Simulate.click(container.querySelectorAll("ul a")[0]);
            });
            var dashCard1 = container.querySelector(".card1Status h5");
            var dashCard2 = container.querySelector(".card2Status h5");
            var dashCard3 = container.querySelector(".card3Status h5");
            var dashCard4 = container.querySelector(".card4Status h5");
            assert.equal(dashCard1.textContent, "0");
            assert.equal(dashCard2.textContent, "0");
            assert.equal(dashCard3.textContent, "0");
            assert.equal(dashCard4.textContent, "0");
        })
    })
});

