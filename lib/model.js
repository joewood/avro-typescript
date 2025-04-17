"use strict";
/**** Contains the Interfaces and Type Guards for Avro schema */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRecordType = isRecordType;
exports.isArrayType = isArrayType;
exports.isMapType = isMapType;
exports.isEnumType = isEnumType;
exports.isLogicalType = isLogicalType;
exports.isUnion = isUnion;
exports.isOptional = isOptional;
function isRecordType(type) {
    return type.type === "record";
}
function isArrayType(type) {
    return type.type === "array";
}
function isMapType(type) {
    return type.type === "map";
}
function isEnumType(type) {
    return type.type === "enum";
}
function isLogicalType(type) {
    return type.logicalType.length > 0;
}
function isUnion(type) {
    return type instanceof Array;
}
function isOptional(type) {
    if (isUnion(type)) {
        const t1 = type[0];
        if (typeof t1 === "string") {
            return t1 === "null";
        }
    }
}
