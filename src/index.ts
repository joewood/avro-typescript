export {
    EnumType,
    Field,
    isArrayType,
    isEnumType,
    isLogicalType,
    isMapType,
    isOptional,
    isRecordType,
    RecordType,
    Type,
} from "./model";

import {
    ConversionOptions,
    EnumType,
    Field,
    isArrayType,
    isEnumType,
    isFixedType,
    isLogicalType,
    isMapType,
    isRecordType,
    NameOrType,
    RecordType,
    Schema,
    Type,
} from "./model";

/** Convert a primitive type from avro to TypeScript */
export function convertPrimitive(avroType: string): string {
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

/** Converts an Avro record type to a TypeScript file */
export function avroToTypeScript(schema: Schema, opts: ConversionOptions = {}): string {
    const output: string[] = [];
    if (isEnumType(schema)) convertEnum(schema, output);
    else if (isRecordType(schema)) convertRecord(schema, output, opts, schema.namespace);
    else throw "Unknown top level type " + (schema as unknown)["type"];
    return output.join("\n");
}

/** Convert an Avro Record type. Return the name, but add the definition to the file */
export function convertRecord(
    recordType: RecordType,
    fileBuffer: string[],
    opts: ConversionOptions,
    namespace: string | undefined,
): string {
    let buffer = `export interface ${recordType.name} {\n`;
    for (let field of recordType.fields) {
        buffer += convertFieldDec(field, fileBuffer, opts, namespace) + "\n";
    }
    buffer += "}\n";
    fileBuffer.push(buffer);
    return recordType.name;
}

/** Convert an Avro Enum type. Return the name, but add the definition to the file */
export function convertEnum(enumType: EnumType, fileBuffer: string[]): string {
    const enumDef = `export enum ${enumType.name} { ${enumType.symbols.map((sym) => `${sym} = '${sym}'`).join(", ")} };\n`;
    fileBuffer.push(enumDef);
    return enumType.name;
}

export function convertType(
    type: Type,
    buffer: string[],
    opts: ConversionOptions,
    namespace: string | undefined,
): string {
    // if it's just a name, then use that
    if (typeof type === "string") {
        return convertPrimitive(type) || type;
    } else if (type instanceof Array) {
        // array means a Union. Use the names and call recursively
        return convertUnion(type, buffer, opts, namespace);
    } else if (isRecordType(type)) {
        //} type)) {
        // record, use the name and add to the buffer
        return convertRecord(type, buffer, opts, namespace);
    } else if (isArrayType(type)) {
        // array, call recursively for the array element type
        return convertType(type.items, buffer, opts, namespace) + "[]";
    } else if (isMapType(type)) {
        // Dictionary of types, string as key
        return `{ [index:string]:${convertType(type.values, buffer, opts, namespace)} }`;
    } else if (isEnumType(type)) {
        // array, call recursively for the array element type
        return convertEnum(type, buffer);
    } else if (isLogicalType(type)) {
        if (opts.logicalTypes && opts.logicalTypes[type.logicalType]) {
            return opts.logicalTypes[type.logicalType];
        }
        return convertType(type.type, buffer, opts, namespace);
    } else if (isFixedType(type)) {
        return "Uint8Array";
    } else {
        console.error("Cannot work out type", type);
        return "UNKNOWN";
    }
}

export function convertUnion(
    type: NameOrType[],
    buffer: string[],
    opts: ConversionOptions,
    namespace: string | undefined,
): string {
    // Wrapped unions is all-or-nothing, even if some values are unambiguous within the union.
    // For example, with "int" | "double" | "string", the numbers are ambigous but the string
    // should be unambiguous. Nevertheless, at least with avsc it treats ambiguity as
    // all-or-nothing.
    if (shouldWrapUnionMembers(type, opts)) {
        return type
            .map((t) => {
                // Null is a special case. Even when using wrapped unions, plain null is allowed
                // as a value in addition to {"null": null}.
                const nullPrefix = t === "null" ? "null | " : "";
                return `${nullPrefix}{ "${keyForUnionElement(t, namespace)}": ${convertType(t, buffer, opts, namespace)} }`;
            })
            .join(" | ");
    } else {
        return type.map((t) => convertType(t, buffer, opts, namespace)).join(" | ");
    }
}

function shouldWrapUnionMembers(type: NameOrType[], opts: ConversionOptions): boolean {
    switch (opts.wrapUnions) {
        case "always":
            return true;
        case "never":
            return false;
        case "auto": {
            return hasAmbiguousUnionMembers(type);
        }
        default:
            return opts.wrapUnions ?? false;
    }
}

function hasAmbiguousUnionMembers(type: NameOrType[]): boolean {
    // If there is more than one union member that shares any JS type, it'll be considered
    // ambiguous and must be wrapped.
    const result: Record<string, boolean> = {};
    for (const t of type) {
        const typeName = jsTypeForAvroType(t);
        if (result[typeName]) {
            return true;
        }
        result[typeName] = true;
    }
    return false;
}

function jsTypeForAvroType(t: NameOrType): string {
    const avroType = typeof t === "string" ? t : t.type;
    switch (avroType) {
        case "long":
        case "int":
        case "double":
        case "float":
            return "number";
        case "bytes":
        case "fixed":
            return "buffer";
        case "null":
            return "null";
        case "boolean":
            return "boolean";
        case "string":
        case "enum":
            return "string";
        case "record":
        case "map":
            return "object";
        case "array":
            return "array";
        default:
            return null;
    }
}

export function keyForUnionElement(type: NameOrType, namespace: string | undefined): string {
    if (typeof type === "string") {
        return type;
    }
    if (isRecordType(type) || isFixedType(type) || isEnumType(type)) {
        if (namespace) {
            return `${namespace}.${type.name}`;
        }
        return type.name;
    }
    return type.type;
}

export function convertFieldDec(
    field: Field,
    buffer: string[],
    opts: ConversionOptions,
    namespace: string | undefined,
): string {
    let typeName = convertType(field.type, buffer, opts, namespace);
    return `\t${field.name}: ${typeName};`;
}
