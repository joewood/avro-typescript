import { RecordType } from "./model";
export { RecordType, Field } from "./model";
/** Converts an Avro record type to a TypeScript file */
export declare function avroToTypeScript(recordType: RecordType): string;
