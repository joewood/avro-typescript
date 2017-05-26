/**** Contains the Interfaces and Type Guards for Avro schema */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isRecordType(type) {
    return (type.type === "record");
}
exports.isRecordType = isRecordType;
function isArrayType(type) {
    return (type.type === "array");
}
exports.isArrayType = isArrayType;
function isMapType(type) {
    return (type.type === "map");
}
exports.isMapType = isMapType;
function isEnumType(type) {
    return (type.type === "enum");
}
exports.isEnumType = isEnumType;
