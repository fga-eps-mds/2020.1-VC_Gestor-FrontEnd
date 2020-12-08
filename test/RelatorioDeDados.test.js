var assert = require("chai").assert;
var sinon = require("sinon");
require("jsdom-global")();

import { act, Simulate } from "react-dom/test-utils";
import React from "react";
import {render, unmountComponentAtNode } from "react-dom";
import RelatorioDeDados from "../src/components/pages/RelatorioDeDados";
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
    const dashboardData = {data: 
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
    };


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
            sinon.replace(apiPostagem, "get", sinon.fake.resolves(dashboardData));
            var clock = sinon.useFakeTimers({
                now: 1607461879000,
                shouldAdvanceTime: false
            });
            // var time = new Date();
            // console.log(clock);

            await act(async () => {
                render(<RelatorioDeDados />, container);
            });

            await act(async () => {
                Simulate.click(container.querySelectorAll("ul a")[3]);
            });


            const dashDay = container.querySelector(".card-1 h5");
            const dashDay2 = container.querySelector(".card-2 h5");
            const dashDay3 = container.querySelector(".card-3 h5");
            const dashDay4 = container.querySelector(".card-4 h5");
            console.log(dashDay.textContent);
            console.log(dashDay2.textContent);
            console.log(dashDay3.textContent);
            console.log(dashDay4.textContent);
            // assert.equal(dashDay.textContent, toString(dashboardData.data.newPosts));
            assert.equal(dashDay.textContent, "7");
            
        })
    })
});

