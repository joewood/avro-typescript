import { EnumType, Field, RecordType, Type } from "./model";
export { Type, Field, isRecordType, isArrayType, isEnumType, isMapType, RecordType, EnumType, isOptional } from "./model";
/** Convert a primitive type from avro to TypeScript */
export declare function convertPrimitive(avroType: string): string;
/** Converts an Avro record type to a TypeScript file */
export declare function avroToTypeScript(recordType: RecordType): string;
/** Convert an Avro Record type. Return the name, but add the definition to the file */
export declare function convertRecord(recordType: RecordType, fileBuffer: string[]): string;
/** Convert an Avro Enum type. Return the name, but add the definition to the file */
export declare function convertEnum(enumType: EnumType, fileBuffer: string[]): string;
export declare function convertType(type: Type, buffer: string[]): string;
export declare function convertFieldDec(field: Field, buffer: string[]): string;
