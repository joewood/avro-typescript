"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function isRecord(type) {
    return (type.type === "record");
}
function isArrayType(type) {
    return (type.type === "array");
}
/** Convert a primitive type from avro to TypeScript */
function convertPrimitive(avroType) {
    switch (avroType) {
        case "long":
        case "int":
        case "double":
        case "float":
            return "number";
        case "bytes":
            return "Buffer";
        case "null":
            return "null";
        case "boolean":
            return "boolean";
        default:
            return null;
    }
}
var fileBuffer = [];
/** Convert an Avro Record type. Return the name, but add the definition to the file */
function convertRecord(recordType, fileBuffer) {
    var buffer = "export interface " + recordType.name + " {\n";
    for (var _i = 0, _a = recordType.fields; _i < _a.length; _i++) {
        var field = _a[_i];
        buffer += convertFieldDec(field, fileBuffer) + "\n";
    }
    buffer += "}\n";
    fileBuffer.push(buffer);
    return recordType.name;
}
function convertType(type, buffer) {
    // if it's just a name, then use that
    if (typeof type === "string") {
        return convertPrimitive(type) || type;
    }
    else if (type instanceof Array) {
        // array means a Union. Use the names and call recursively
        return type.map(function (t) { return convertType(t, buffer); }).join(" | ");
    }
    else if (isRecord(type)) {
        // record, use the name and add to the buffer
        return convertRecord(type, buffer);
    }
    else if (isArrayType(type)) {
        // array, call recursively for the array element type
        return convertType(type.items, buffer) + "[]";
    }
    else {
        return "UNKNOWN";
    }
}
function convertFieldDec(field, buffer) {
    // Union Type
    return "\t" + field.name + ": " + convertType(field.type, buffer) + ";";
}
// export function generateTypes(inputSchema: RecordType): string {
// }
var schemaText = fs.readFileSync("test/NewOrderSingle.avsc", "UTF8");
var schema = JSON.parse(schemaText);
var output = [];
convertRecord(schema, output);
console.log(output.join("\n"));
