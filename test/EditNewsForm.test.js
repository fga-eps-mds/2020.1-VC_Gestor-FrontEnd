var assert = require("chai").assert;
var sinon = require("sinon");
require("jsdom-global")();

import { act, Simulate } from "react-dom/test-utils";
import React from "react";
import {render, unmountComponentAtNode } from "react-dom";
import EditNewsForm from "../src/components/components/EditNewsForm";
import apiPostagem from "../src/services/apiPostagem";
import apiNoticias from "../src/services/apiNoticias";

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


describe("News Edit Form", function() {
  const postData = {data: [{ 
    _id: "id_1",
    post_title: "Título Post 1",
    post_description: "Descrição 1",
    fk_user_id: "user_id_1",
    post_category: "Limpeza",
    post_place: "FCE",
    post_status: "Aguardando",},
    { post_id: "id_2",
      post_title: "Título Post 2",
      post_description: "Descrição 2",
      fk_user_id: "user_id_2",
      post_category: "Segurança",
      post_place: "FGA",
      post_status: "Arquivado",
    }]}
    const newsData = {data : {
        news_id: 1,
        title: "Title News",
        subtitle: "Subtitle News",
        text:  "Text News",
        image1: "image1",
        image2: "image2",
        image3: "image3",
        post_id: "id_1",
      }};
    
    describe("Posts request", function() {
        it("Should call get posts", async function() {
          sinon.replace(apiPostagem, "get", sinon.fake.resolves(postData));
          sinon.replace(apiNoticias, "get", sinon.fake.resolves(newsData));
                  
          
          await act(async () => {
            render(<EditNewsForm.WrappedComponent match={{params : {newsId: 1}}} />, container);
          });
          
          assert(apiPostagem.get.calledOnce);
        });
        it("Should list the posts", async function() {
          sinon.replace(apiPostagem, "get", sinon.fake.resolves(postData));
          sinon.replace(apiNoticias, "get", sinon.fake.resolves(newsData));
                  
          await act(async () => {
            render(<EditNewsForm.WrappedComponent match={{params : {newsId: 1}}} />, container);
          });

          assert.equal(container.querySelectorAll("option")[0].textContent, postData.data[0].post_title);
          assert.equal(container.querySelectorAll("option")[1].textContent, postData.data[1].post_title);
        });
    });
    describe("News get request", function() {
      it("Should call get news", async function() {
        sinon.replace(apiPostagem, "get", sinon.fake.resolves(postData));
        sinon.replace(apiNoticias, "get", sinon.fake.resolves(newsData));
                
        await act(async () => {
          render(<EditNewsForm.WrappedComponent match={{params : {newsId: 1}}} />, container);
        });
      
        assert(apiNoticias.get.calledOnce);
      });
      it("Should display the news' information", async function() {
        sinon.replace(apiPostagem, "get", sinon.fake.resolves(postData));
        sinon.replace(apiNoticias, "get", sinon.fake.resolves(newsData));
                
        
        await act(async () => {
          render(<EditNewsForm.WrappedComponent match={{params : {newsId: 1}}} />, container);
        });

        assert.equal(container.querySelector("#title").value, newsData.data.title);
        assert.equal(container.querySelector("#subtitle").value, newsData.data.subtitle);
        assert.equal(container.querySelector("#text").value, newsData.data.text);
        assert.equal(container.querySelector("#linkPost").value, newsData.data.post_id);
      });
    });
    describe("Form Submission", function() {
      it("Should update news object with form data", async function() {
        sinon.replace(apiPostagem, "get", sinon.fake.resolves(postData));
        sinon.replace(apiNoticias, "get", sinon.fake.resolves(newsData));
        const spyHandleChange = sinon.spy(EditNewsForm.WrappedComponent.prototype,"handleChange");
        const spyChangePostId = sinon.spy(EditNewsForm.WrappedComponent.prototype,"changePostId");
                
        await act(async () => {
          render(<EditNewsForm.WrappedComponent match={{params : {newsId: 1}}} />, container);
        });

        var title = container.querySelector("#title");
        var subtitle = container.querySelector("#subtitle");
        var text = container.querySelector("#text");
        var linkPost = container.querySelector("#linkPost");
        act(() => {
          title.value = "Title 1";
          Simulate.change(title);
          subtitle.value = "Subtitle 1";
          Simulate.change(subtitle);
          text.value = "A description";
          Simulate.change(text);
          linkPost.value = 1;
          Simulate.change(linkPost);
        });
        
        
        assert.equal(spyHandleChange.callCount, 3);
        assert(spyChangePostId.calledOnce);
      });
      it("Should trigger submit on button click", async function() {
        sinon.replace(apiPostagem, "get", sinon.fake.resolves(postData));
        sinon.replace(apiNoticias, "get", sinon.fake.resolves(newsData));
        var fakePut = sinon.stub(apiNoticias, "put").resolves();
        const spyHandleSubmit = sinon.spy(EditNewsForm.WrappedComponent.prototype,"handleSubmit");
        alert = sinon.fake();
        
        await act(async () => {
          render(<EditNewsForm.WrappedComponent match={{params : {newsId: 1}}} />, container);
        });
        var title = container.querySelector("#title");
        var subtitle = container.querySelector("#subtitle");
        var text = container.querySelector("#text");
        var linkPost = container.querySelector("#linkPost");
        var form = container.querySelector("form.newsForm");
        await act(async () => {
          title.value = "Title 1";
          Simulate.change(title);
          subtitle.value = "Subtitle 1";
          Simulate.change(subtitle);
          text.value = "A description";
          Simulate.change(text);
          linkPost.value = 1;
          Simulate.change(linkPost);
          Simulate.submit(form);
        });
        
        assert(spyHandleSubmit.calledOnce);
        assert(apiNoticias.put.calledOnce);
        assert(alert.calledWith("Notícia alterada com sucesso!"));
        
        fakePut.throws(new Error("an Error"));
        await act(async () => {
          Simulate.submit(form);
        });

        assert(alert.calledWith("Ocorreu um erro e não foi possível alterar a notícia"));
      });
    });
  });