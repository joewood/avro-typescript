/**** Contains the Interfaces and Type Guards for Avro schema */

export type Schema = RecordType | EnumType;
export interface ConversionOptions {
    logicalTypes?: { [type: string]: string };
    wrapUnions?: boolean | "always" | "never" | "auto";
}

export type Type = NameOrType | NameOrType[];
export type NameOrType = TypeNames | RecordType | ArrayType | NamedType | LogicalType | FixedType;
export type TypeNames = "record" | "array" | "null" | "map" | "fixed" | string;

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
    namespace?: string;
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

export interface FixedType extends BaseType {
    type: "fixed";
    name: string;
    size: number;
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

export function isFixedType(type: BaseType): type is FixedType {
    return type.type === "fixed";
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
