"use strict";
/**** Contains the Interfaces and Type Guards for Avro schema */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogicalType = exports.isOptional = exports.isUnion = exports.isEnumType = exports.isMapType = exports.isArrayType = exports.isRecordType = void 0;
function isRecordType(type) {
    return type.type === "record";
}
exports.isRecordType = isRecordType;
function isArrayType(type) {
    return type.type === "array";
}
exports.isArrayType = isArrayType;
function isMapType(type) {
    return type.type === "map";
}
exports.isMapType = isMapType;
function isEnumType(type) {
    return type.type === "enum";
}
exports.isEnumType = isEnumType;
function isUnion(type) {
    return type instanceof Array;
}
exports.isUnion = isUnion;
function isOptional(type) {
    if (isUnion(type)) {
        var t1 = type[0];
        if (typeof t1 === "string") {
            return t1 === "null";
        }
    }
}
exports.isOptional = isOptional;
function isLogicalType(type) {
    return typeof type !== "string" && "logicalType" in type;
}
exports.isLogicalType = isLogicalType;
