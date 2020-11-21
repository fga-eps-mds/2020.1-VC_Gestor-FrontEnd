var assert = require("chai").assert;
var sinon = require("sinon");
require("jsdom-global")();

import { act, Simulate } from "react-dom/test-utils";
import React from "react";
import {render, unmountComponentAtNode } from "react-dom";
import EditBenefitForm from "../src/components/components/EditBenefitForm";
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

describe("Edit Benefit Form", function(){
    const benefitData = {data: {
        title: "Título 2",
        price: "5",
        quantity: "4",
        redeem_way: "DAF",
        description: "Descrição"
    }};
    describe("Benefit Request", function(){
        it("Should call get benefit", async function(){
            sinon.replace(apiBeneficio, "get", sinon.fake.resolves(benefitData));

            await act(async () => {
                render(<EditBenefitForm.WrappedComponent match = {{params:{benefitId: 1}}} />, container);
            });

            assert(apiBeneficio.get.calledOnce);
        });
        it("Should display the benefit's information", async function(){
            sinon.replace(apiBeneficio, "get", sinon.fake.resolves(benefitData));

            await act(async () => {
                render(<EditBenefitForm.WrappedComponent match = {{params:{benefitId: 1}}} />, container);
            });

            assert.equal(container.querySelector("#title").value, benefitData.data.title);
            assert.equal(container.querySelector("#price").value, benefitData.data.price);
            assert.equal(container.querySelector("#quantity").value, benefitData.data.quantity);
            assert.equal(container.querySelector("#redeem_way").value, benefitData.data.redeem_way);
            assert.equal(container.querySelector("#description").value, benefitData.data.description);
        });
    });

    describe("Form Submission", function(){
        it("Should update benefits object with form data", function(){
            const spyHandleChange = sinon.spy(EditBenefitForm.WrappedComponent.prototype, "handleChange");
            sinon.replace(apiBeneficio, "get", sinon.fake.resolves(benefitData));

            act(() => {
                render(<EditBenefitForm.WrappedComponent match = {{params:{benefitId: 1}}} />, container);
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
            var fakePost = sinon.stub(apiBeneficio, "put").resolves();
            const spyHandleSubmit = sinon.spy(EditBenefitForm.WrappedComponent.prototype, "handleSubmit");
            alert = sinon.fake();
            sinon.replace(apiBeneficio, "get", sinon.fake.resolves(benefitData));

            act(() => {
                render(<EditBenefitForm.WrappedComponent match = {{params:{benefitId: 1}}} />, container);
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
            assert(apiBeneficio.put.calledOnce);
            assert(alert.calledWith("Benefício foi alterado com sucesso!"));

            fakePost.throws(new Error("An error"));
            await act(async () => {
                Simulate.submit(form);
            });

            assert(spyHandleSubmit.calledTwice);
            assert(apiBeneficio.put.calledTwice);
            assert(alert.calledWith("Ocorreu um erro e não foi possível alterar o benefício"));
        });
    });
});
