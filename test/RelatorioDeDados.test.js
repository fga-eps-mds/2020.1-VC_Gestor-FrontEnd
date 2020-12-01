var assert = require("chai").assert;
var sinon = require("sinon");
require("jsdom-global")();

import { act, Simulate } from "react-dom/test-utils";
import React from "react";
import {render, unmountComponentAtNode } from "react-dom";
import RelatorioDeDados from "../src/components/components/RelatorioDeDados";
import apiPostagem from "../../services/apiPostagem";
