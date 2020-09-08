/**** Contains the Interfaces and Type Guards for Avro schema */

export interface Schema {}

export type Type = NameOrType | NameOrType[];
export type NameOrType = TypeNames | RecordType | ArrayType | NamedType | LogicalType;
export type TypeNames = "record" | "array" | "null" | "map" | string;

export interface Field {
    name: string;
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

export interface MapType extends BaseType {
    type: "map";
    values: Type;
}

export interface EnumType extends BaseType {
    type: "enum";
    name: string;
    symbols: string[];
}

export interface NamedType extends BaseType {
    type: string;
}

export interface LogicalType extends BaseType {
    logicalType: string;
}

export function isRecordType(type: BaseType): type is RecordType {
    return type.type === "record";
}

export function isArrayType(type: BaseType): type is ArrayType {
    return type.type === "array";
}

export function isMapType(type: BaseType): type is MapType {
    return type.type === "map";
}

export function isEnumType(type: BaseType): type is EnumType {
    return type.type === "enum";
}

export function isUnion(type: Type): type is NamedType[] {
    return type instanceof Array;
}

export function isOptional(type: Type): boolean {
    if (isUnion(type)) {
        const t1 = type[0];
        if (typeof t1 === "string") {
            return t1 === "null";
        }
    }
}

export function isLogicalType(type: Type): type is LogicalType {
    return typeof type !== "string" && "logicalType" in type;
}
