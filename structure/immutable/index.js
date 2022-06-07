"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var getIn_1 = __importDefault(require("./getIn"));
var structure = {
    fromJS: function (jsValue) { return (0, immutable_1.fromJS)(jsValue, function (key, value) {
        return immutable_1.Iterable.isIndexed(value) ? value.toList() : value.toMap();
    }); },
    getIn: getIn_1.default,
    merge: function (state, payload) { return state.merge(payload); },
};
exports.default = structure;
