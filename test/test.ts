import * as fs from 'fs';
import { avroToTypeScript, RecordType } from "../lib";

const schemaText = fs.readFileSync("./test/example.avsc", "utf8");
const schema = JSON.parse(schemaText);
let avroToTypeScriptResult: string = avroToTypeScript(schema as RecordType);
console.log(avroToTypeScriptResult);
