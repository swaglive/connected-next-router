"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var getIn_1 = __importDefault(require("../plain/getIn"));
var getIn = function (state, path) {
    return immutable_1.Iterable.isIterable(state)
        ? state.getIn(path).toJS()
        : getIn_1.default(state, path);
};
exports.default = getIn;
