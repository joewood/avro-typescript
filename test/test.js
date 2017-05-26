"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var _1 = require("../lib/");
var schemaText = fs.readFileSync(__dirname + "/NewOrderSingle.avsc", "UTF8");
var schema = JSON.parse(schemaText);
var output = [];
_1.convertRecord(schema, output);
console.log(output.join("\n"));
