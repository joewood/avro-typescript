"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var _1 = require("../lib/");
var schemaText = fs.readFileSync(__dirname + "/example.avsc", "UTF8");
var schema = JSON.parse(schemaText);
console.log(_1.avroToTypeScript(schema));
