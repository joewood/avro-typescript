import { Type, RecordType, EnumType } from "./model";
export { RecordType, Type } from "./model";
/** Convert a primitive type from avro to TypeScript */
export declare function convertPrimitive(avroType: string): string;
/** Convert an Avro Record type. Return the name, but add the definition to the file */
export declare function convertRecord(recordType: RecordType, fileBuffer: string[]): string;
/** Convert an Avro Enum type. Return the name, but add the definition to the file */
export declare function convertEnum(enumType: EnumType, fileBuffer: string[]): string;
export declare function convertType(type: Type, buffer: string[]): string;
