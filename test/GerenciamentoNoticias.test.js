var assert = require("chai").assert;
var sinon = require("sinon");
require("jsdom-global")();

import { act, Simulate } from "react-dom/test-utils";
import React from "react";
import {render, unmountComponentAtNode } from "react-dom";
import GerenciamentoNoticias from "../src/components/pages/GerenciamentoNoticias";
import apiPostagem from "../src/services/apiPostagem";
import apiNoticias from "../src/services/apiNoticias";
import { withRouter } from "react-router-dom";

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


describe("News management page", function() {
    var newsData = {data : []};
    
    for(var i =1; i<=30;i++){
        newsData.data.push({
            news_id: i,
            title: i+" Title News",
            subtitle: i+" Subtitle News",
            text:  i+" Text News",
            image1: "image1",
            image2: "image2",
            image3: "image3",
            post_id: i,
        });
    }
    
    describe("News request", function() {
        it("Should call get news",async function() {
            sinon.replace(apiNoticias, "get", sinon.fake.resolves(newsData));
                
            await act(async () => {
                render(<GerenciamentoNoticias />, container);
            });

            assert(apiNoticias.get.calledOnce);
        });
        it("Should list the news",async function() {
            sinon.replace(apiNoticias, "get", sinon.fake.resolves(newsData));
                
            await act(async () => {
                render(<GerenciamentoNoticias />, container);
            });

            const newsList = container.querySelectorAll("tbody tr");

            assert.equal(newsList[0].querySelectorAll("td")[0].textContent, "1");
            assert.equal(newsList[0].querySelectorAll("td")[1].textContent, "1 Title News");
            assert.equal(newsList[0].querySelectorAll("td")[2].textContent, "1 Text News");
            assert.equal(newsList[1].querySelectorAll("td")[0].textContent, "2");
            assert.equal(newsList[1].querySelectorAll("td")[1].textContent, "2 Title News");
            assert.equal(newsList[1].querySelectorAll("td")[2].textContent, "2 Text News");
        });
    });
    describe("Pagination", function(){
        it("Should display links for the pages",async function(){
            sinon.replace(apiNoticias, "get", sinon.fake.resolves(newsData));
                
            await act(async () => {
                render(<GerenciamentoNoticias />, container);
            });

            const pageBtns=container.querySelectorAll("nav li");
            assert(pageBtns.length == 5);
            assert(pageBtns[1].textContent == "1");
            assert(pageBtns[2].textContent == "2");
            assert(pageBtns[3].textContent == "3");
        });
        it("Should display news in each page",async function(){
            sinon.replace(apiNoticias, "get", sinon.fake.resolves(newsData));
                
            await act(async () => {
                render(<GerenciamentoNoticias />, container);
            });

            act(() => {
                Simulate.click(container.querySelectorAll("nav li")[2]);
            });

            var newsList = container.querySelectorAll("tbody tr");

            assert.equal(newsList[0].querySelectorAll("td")[0].textContent, "11");
            assert.equal(newsList[0].querySelectorAll("td")[1].textContent, "11 Title News");
            assert.equal(newsList[0].querySelectorAll("td")[2].textContent, "11 Text News");
            assert.equal(newsList[1].querySelectorAll("td")[0].textContent, "12");
            assert.equal(newsList[1].querySelectorAll("td")[1].textContent, "12 Title News");
            assert.equal(newsList[1].querySelectorAll("td")[2].textContent, "12 Text News");

            act(() => {
                Simulate.click(container.querySelectorAll("nav li")[3]);
            });

            newsList = container.querySelectorAll("tbody tr");

            assert.equal(newsList[0].querySelectorAll("td")[0].textContent, "21");
            assert.equal(newsList[0].querySelectorAll("td")[1].textContent, "21 Title News");
            assert.equal(newsList[0].querySelectorAll("td")[2].textContent, "21 Text News");
            assert.equal(newsList[1].querySelectorAll("td")[0].textContent, "22");
            assert.equal(newsList[1].querySelectorAll("td")[1].textContent, "22 Title News");
            assert.equal(newsList[1].querySelectorAll("td")[2].textContent, "22 Text News");

        });
        it("Clicking the arrow buttons should display the next page",async () => {
            sinon.replace(apiNoticias, "get", sinon.fake.resolves(newsData));
                
            await act(async () => {
                render(<GerenciamentoNoticias />, container);
            });

            act(() => {
                Simulate.click(container.querySelectorAll("nav li")[4]);
            });
            act(() => {
                Simulate.click(container.querySelectorAll("nav li")[4]);
            });
            act(() => {
                Simulate.click(container.querySelectorAll("nav li")[4]);
            });

            var newsList = container.querySelectorAll("tbody tr");

            assert.equal(newsList[0].querySelectorAll("td")[0].textContent, "21");
            assert.equal(newsList[0].querySelectorAll("td")[1].textContent, "21 Title News");
            assert.equal(newsList[0].querySelectorAll("td")[2].textContent, "21 Text News");
            assert.equal(newsList[1].querySelectorAll("td")[0].textContent, "22");
            assert.equal(newsList[1].querySelectorAll("td")[1].textContent, "22 Title News");
            assert.equal(newsList[1].querySelectorAll("td")[2].textContent, "22 Text News");
        });
    });
  });