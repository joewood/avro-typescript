/**** Contains the Interfaces and Type Guards for Avro schema */
export interface Schema {
}
export declare type Type = NameOrType | NameOrType[];
export declare type NameOrType = TypeNames | RecordType | ArrayType | NamedType | LogicalType;
export declare type TypeNames = "record" | "array" | "null" | "map" | string;
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
export declare function isRecordType(type: BaseType): type is RecordType;
export declare function isArrayType(type: BaseType): type is ArrayType;
export declare function isMapType(type: BaseType): type is MapType;
export declare function isEnumType(type: BaseType): type is EnumType;
export declare function isUnion(type: Type): type is NamedType[];
export declare function isOptional(type: Type): boolean;
export declare function isLogicalType(type: Type): type is LogicalType;
