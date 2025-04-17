"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avroToTypeScript = avroToTypeScript;
const model_1 = require("./model");
class Converter {
    constructor(options = {}) {
        this.typeNames = [];
        this.importStatements = new Set();
        this.options = options;
    }
    /** Convert a primitive type from avro to TypeScript */
    convertPrimitive(avroType) {
        switch (avroType) {
            case "long":
            case "int":
            case "double":
            case "float":
                return "number";
            case "bytes":
                return "Buffer";
            case "null":
                return "null | undefined";
            case "boolean":
                return "boolean";
            default:
                return null;
        }
    }
    /** Convert an Avro Record type. Return the name, but add the definition to the file */
    convertRecord(recordType, fileBuffer) {
        // If this exported top-level type was already created, skip it.
        // Still return the recordType.name for nested record type fields.
        if (this.typeNames.indexOf(recordType.name) > -1) {
            return recordType.name;
        }
        let buffer = `export interface ${recordType.name} {\n`;
        for (let field of recordType.fields) {
            buffer += this.convertFieldDec(field, fileBuffer) + "\n";
        }
        buffer += "}\n";
        fileBuffer.push(buffer);
        this.typeNames.push(recordType.name);
        return recordType.name;
    }
    /** Convert an Avro Enum type. Return the name, but add the definition to the file */
    convertEnum(enumType, fileBuffer) {
        // Skip the enum if already created.
        if (this.typeNames.indexOf(enumType.name) > -1) {
            return enumType.name;
        }
        let enumDef = `export enum ${enumType.name} {\n`;
        let ctr = 0;
        let suffix;
        for (let enumSymbol of enumType.symbols) {
            enumDef += `  ${enumSymbol} = '${enumSymbol}'`;
            ctr++;
            if (ctr === enumType.symbols.length) {
                suffix = `\n`;
            }
            else {
                suffix = `,\n`;
            }
            enumDef += `${suffix}`;
        }
        enumDef += `};\n`;
        fileBuffer.push(enumDef);
        this.typeNames.push(enumType.name);
        return enumType.name;
    }
    /** Convert an Avro Logical type. Return a custom (from options) or primitive type. */
    convertLogicalType(type, buffer) {
        let logicalType = type;
        // Use `this.options` to handle custom logical types.
        if (this.options.logicalTypes) {
            const { customType, importStatement } = this.options.logicalTypes[logicalType.logicalType];
            if (importStatement) {
                this.importStatements.add(importStatement);
            }
            if (customType) {
                return customType;
            }
        }
        return this.convertPrimitive(logicalType.type);
    }
    convertType(type, buffer) {
        // if it's just a name, then use that
        if (typeof type === "string") {
            return this.convertPrimitive(type) || type;
        }
        else if (type instanceof Array) {
            // array means a Union. Use the names and call recursively
            return type.map(t => this.convertType(t, buffer)).join(" | ");
        }
        else if ((0, model_1.isRecordType)(type)) {
            //} type)) {
            // record, use the name and add to the buffer
            return this.convertRecord(type, buffer);
        }
        else if ((0, model_1.isArrayType)(type)) {
            // array, call recursively for the array element type
            return this.convertType(type.items, buffer) + "[]";
        }
        else if ((0, model_1.isMapType)(type)) {
            // Dictionary of types, string as key
            return `{ [index:string]:${this.convertType(type.values, buffer)} }`;
        }
        else if ((0, model_1.isEnumType)(type)) {
            // array, call recursively for the array element type
            return this.convertEnum(type, buffer);
        }
        else if ((0, model_1.isLogicalType)(type)) {
            return this.convertLogicalType(type, buffer);
        }
        else {
            console.error("Cannot work out type", type);
            return "UNKNOWN";
        }
    }
    convertFieldDec(field, buffer) {
        // Union Type
        return `\t${field.name}${(0, model_1.isOptional)(field.type) ? "?" : ""}: ${this.convertType(field.type, buffer)};`;
    }
}
/** Converts an Avro record type to a TypeScript file */
function avroToTypeScript(recordType, options) {
    const converter = new Converter(options);
    let output = [];
    converter.convertRecord(recordType, output);
    if (converter.importStatements.size > 0) {
        output = [...Array.from(converter.importStatements), '', ...output];
    }
    return output.join("\n");
}
