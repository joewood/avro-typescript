"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var lib_1 = require("../lib");
var schemaText = fs.readFileSync("./test/example.avsc", "utf8");
var schema = JSON.parse(schemaText);
var avroToTypeScriptResult = (0, lib_1.avroToTypeScript)(schema);
console.log(avroToTypeScriptResult);
