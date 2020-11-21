var assert = require("chai").assert;
var sinon = require("sinon");
require("jsdom-global")();

import { act, Simulate } from "react-dom/test-utils";
import React from "react";
import {render, unmountComponentAtNode } from "react-dom";
import Forms from "../src/components/components/Forms";
import apiBeneficio from "../src/services/apiBeneficio";

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

describe("Benefits Form", function(){
    describe("Form Submission", function(){
        it("Should update benefits object with form data", function(){
            const spyHandleChange = sinon.spy(Forms.prototype, "handleChange");

            act(() => {
                render(<Forms />, container);
            });

            var titleInput = container.querySelector("#title");
            var priceInput = container.querySelector("#price");
            var quantityInput = container.querySelector("#quantity");
            var redeemWayInput = container.querySelector("#redeem_way");
            var descriptionInput = container.querySelector("#description");

            act(() => {
                titleInput.value = "Título 1";
                Simulate.change(titleInput);
                priceInput.value = "123";
                Simulate.change(priceInput);
                quantityInput.value = "2";
                Simulate.change(quantityInput);
                redeemWayInput.value = "Daf";
                Simulate.change(redeemWayInput);
                descriptionInput.value = "Descrição 1";
                Simulate.change(descriptionInput);
            });

            assert.equal(spyHandleChange.callCount, 5);
        });
        it("Should trigger submit on button click",async function(){
            var fakePost = sinon.stub(apiBeneficio, "post").resolves();
            const spyHandleSubmit = sinon.spy(Forms.prototype, "handleSubmit");
            alert = sinon.fake();

            act(() => {
                render(<Forms />, container);
            });

            var titleInput = container.querySelector("#title");
            var priceInput = container.querySelector("#price");
            var quantityInput = container.querySelector("#quantity");
            var redeemWayInput = container.querySelector("#redeem_way");
            var descriptionInput = container.querySelector("#description");
            var form = container.querySelector("form");

            act(() => {
                titleInput.value = "Título 1";
                Simulate.change(titleInput);
                priceInput.value = "123";
                Simulate.change(priceInput);
                quantityInput.value = "2";
                Simulate.change(quantityInput);
                redeemWayInput.value = "Daf";
                Simulate.change(redeemWayInput);
                descriptionInput.value = "Descrição 1";
                Simulate.change(descriptionInput);
            });

            await act(async () => {
                Simulate.submit(form);
            });

            assert(spyHandleSubmit.calledOnce);
            assert(apiBeneficio.post.calledOnce);
            assert(alert.calledWith("Benefício criado com sucesso!"));

            fakePost.throws(new Error("An error"));
            await act(async () => {
                Simulate.submit(form);
            });

            assert(spyHandleSubmit.calledTwice);
            assert(apiBeneficio.post.calledTwice);
            assert(alert.calledWith("Ocorreu um erro e não foi possível criar o benefício"));
        });
    });
});
