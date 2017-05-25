import * as fs from "fs";

export interface Schema {

}


type Type = NameOrType | NameOrType[];
type NameOrType = TypeNames | RecordType | ArrayType | NamedType;
type TypeNames =  "record" | "array" | "null" | "map" | string;



export interface Field {
    name:string;
    type: Type;
    default?: string | number | null | boolean;
}

export interface BaseType {
    type: TypeNames;
}

export interface RecordType extends BaseType {
    type: "record";
    name: string;
    fields: Field[];
}

export interface ArrayType extends BaseType {
    type: "array";
    items: Type;
}

export interface NamedType extends BaseType {
    type:string;
}

function isRecord(type:BaseType) : type is RecordType {
    return (type.type==="record")
}

function isArrayType(type:BaseType) : type is ArrayType {
    return (type.type==="array");
}

/** Convert a primitive type from avro to TypeScript */
function convertPrimitive(avroType: string): string {
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

interface Buffer{
    buffer:string[];
    record:string[];
}

const fileBuffer :string[] = [];

/** Convert an Avro Record type. Return the name, but add the definition to the file */
function convertRecord(recordType:RecordType, fileBuffer:string[] ) : string {
    let buffer = `export interface ${recordType.name} {\n`;
    for(let field of recordType.fields){
        buffer += convertFieldDec(field,fileBuffer) +"\n";
    }
    buffer += "}\n";
    fileBuffer.push(buffer);
    return recordType.name;
}


function convertType(type: Type, buffer:string[]): string {
    // if it's just a name, then use that
    if (typeof type==="string") {
        return convertPrimitive(type) || type;
    } else if(type instanceof Array) {
        // array means a Union. Use the names and call recursively
        return type.map( t => convertType(t,buffer)).join(" | ");
    } else if (isRecord(type)) {
        // record, use the name and add to the buffer
        return convertRecord(type,buffer);
    } else if (isArrayType(type)) {
        // array, call recursively for the array element type
        return convertType(type.items,buffer)+"[]";
    } else {
        return "UNKNOWN";
    }
}

function convertFieldDec(field: Field, buffer:string[]): string {
    // Union Type
    return `\t${field.name}: ${convertType(field.type,buffer)};`;
}


// export function generateTypes(inputSchema: RecordType): string {

// }


const schemaText = fs.readFileSync("test/NewOrderSingle.avsc","UTF8");
const schema = JSON.parse(schemaText);
const output :string[] =[];
convertRecord(schema as RecordType,output);
console.log(output.join("\n"));