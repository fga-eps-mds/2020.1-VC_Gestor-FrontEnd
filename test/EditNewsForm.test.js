var assert = require("chai").assert;
var sinon = require("sinon");
require("jsdom-global")();

import { act, Simulate } from "react-dom/test-utils";
import React from "react";
import {render, unmountComponentAtNode } from "react-dom";
import EditNewsForm from "../src/components/components/EditNewsForm";
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


describe("News Edit Form", function() {
  const postData = {data: {rows: [{ post_id: 1,
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
        dt_creation: "2020-08-08T00:00:00.000Z" }]}};
    const newsData = {data : {
        title: "Title News",
        subtitle: "Subtitle News",
        text:  "Text News",
        image1: "image1",
        image2: "image2",
        image3: "image3",
        post_id: 1,
      }};
    
    // describe("Posts request", function() {
    //     it("Should call get posts, and list the posts", async function() {
    //     sinon.replace(apiPostagem, "get", sinon.fake.resolves(postData));
    //     sinon.replace(withRouter, sinon.fake.);
                
        
    //     await act(async () => {
    //       render(<EditNewsForm />, container);
    //     });
        
    //     assert(apiPostagem.get.calledOnce);
    //     assert.equal(container.querySelectorAll("option")[0].textContent, "1 - Título Post 1");
    //     assert.equal(container.querySelectorAll("option")[1].textContent, "2 - Título Post 2");
    //   });
    // });
    // describe("News get request", function() {
    //     it("Should call get posts, and list the posts", async function() {
    //     sinon.replace(apiNoticias, "get", sinon.fake.resolves(newsData));
    //     sinon.replace(apiPostagem, "get", sinon.fake.resolves(postData));
        
    //     await act(async () => {
    //       render(<EditNewsForm />, container);
    //     });
        
    //     assert(apiPostagem.get.calledOnce);
    //     assert(apiNoticias.get.calledOnce);
    //     assert.equal(container.querySelectorAll("option")[0].textContent, "1 - Título Post 1");
    //     assert.equal(container.querySelectorAll("option")[1].textContent, "2 - Título Post 2");
    //     assert.equal(container.querySelectorAll("#title").value, newsData.data.title);
    //     assert.equal(container.querySelectorAll("#subtitle").value, newsData.data.subtitle);
    //     assert.equal(container.querySelectorAll("#text").value, newsData.data.text);
    //     assert.equal(container.querySelectorAll("#linkPostNews select").value, newsData.data.post_id);
        
    //   });
    // });
    // describe("Form Submission", function() {
    //   it("Should update news object with form data", async function() {
    //     sinon.replace(apiPostagem, "get", sinon.fake.resolves(postData));
    //     const spyHandleChange = sinon.spy(EditNewsForm.prototype,"handleChange");
    //     const spyChangePostId = sinon.spy(EditNewsForm.prototype,"changePostId");
        
    //     await act(async () => {
    //       render(<EditNewsForm />, container);
    //     });
    //     var title = container.querySelector("#title");
    //     var subtitle = container.querySelector("#subtitle");
    //     var text = container.querySelector("#text");
    //     var linkPost = container.querySelector("#linkPostNews select");
    //     act(() => {
    //       title.value = "Title 1";
    //       Simulate.change(title);
    //       subtitle.value = "Subtitle 1";
    //       Simulate.change(subtitle);
    //       text.value = "A description";
    //       Simulate.change(text);
    //       linkPost.value = 1;
    //       Simulate.change(linkPost);
    //     })
        
        
    //     assert.equal(spyHandleChange.callCount, 3);
    //     assert(spyChangePostId.calledOnce);
    //   });
    //   it("Should trigger submit on button click", async function() {
        // sinon.replace(apiPostagem, "get", sinon.fake.resolves(postData));
    //     var fakePut = sinon.stub(apiNoticias, "put").resolves();
    //     const spyHandleSubmit = sinon.spy(EditNewsForm.prototype,'handleSubmit');
    //     alert = sinon.fake();
        
    //     await act(async () => {
    //       render(<EditNewsForm />, container);
    //     });
    //     var title = container.querySelector("#title");
    //     var subtitle = container.querySelector("#subtitle");
    //     var text = container.querySelector("#text");
    //     var linkPost = container.querySelector("#linkPostNews select");
    //     var form = container.querySelector("form.newsForm");
    //     await act(async () => {
    //       title.value = "Title 1";
    //       Simulate.change(title);
    //       subtitle.value = "Subtitle 1";
    //       Simulate.change(subtitle);
    //       text.value = "A description";
    //       Simulate.change(text);
    //       linkPost.value = 1;
    //       Simulate.change(linkPost);
    //       Simulate.submit(form);
    //     });
        
    //     assert(spyHandleSubmit.calledOnce);
    //     assert(apiNoticias.put.calledOnce);
    //     assert(alert.calledWith("Notícia criada com sucesso!"));
        
    //     fakePost.throws(new Error("an Error"));
    //     await act(async () => {
    //       Simulate.submit(form);
    //     });

    //     assert(alert.calledWith("Essa noticia já existe"));
    //   });
    // });
  });