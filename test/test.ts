import * as fs from "fs";
import { convertRecord, RecordType } from "../lib/"

const schemaText = fs.readFileSync(__dirname + "/NewOrderSingle.avsc", "UTF8");
const schema = JSON.parse(schemaText);
const output: string[] = [];
convertRecord(schema as RecordType, output);
console.log(output.join("\n"));