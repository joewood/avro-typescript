# Avro Typescript

A simple JS library to convert Avro Schemas to TypeScript interfaces.

## Install

```
npm install avro-typescript
```

The library can be run in node.js or the browser. It takes a Avro Schema as a JavaScript object (from JSON) and returns the TypeScript code as a string.

## Usage

```typescript
import { avroToTypeScript, RecordType } from "avro-typescript"

const schemaText = fs.readFileSync("example.avsc", "UTF8");
const schema = JSON.parse(schemaText) as RecordType;
console.log(avroToTypeScript(schema as RecordType));
```

## Override logicalTypes

Tools like [avsc](https://github.com/mtth/avsc) allow you to [override the serialization/deserialization of LogicalTypes](https://github.com/mtth/avsc/wiki/Advanced-usage#logical-types),
 say from numbers to native JS Date objects, in this case we want to generate the typescript type as 'Date', not 'number'.
 Therefore, you can pass in a map 'logicalTypes' to the options to override the outputted TS type for the schema logicalType.
 
For example:

```typescript
const schema: Schema = {
    type: "record",
    name: "logicalOverrides",
    fields: [
        {
            name: "eventDate",
            type: {
                type: "int",
                logicalType: "date",
            },
        },
        {
            name: "startTime",
            type: {
                type: "int",
                logicalType: "timestamp-millis",
            },
        },
        {
            name: "displayTime",
            type: {
                type: "string",
                logicalType: "iso-datetime",
            },
        },
    ],
};
const actual = avroToTypeScript(schema, {
logicalTypes: {
    date: 'Date',
    'timestamp-millis': 'Date',
}
});

// this will output
export interface logicalOverrides {
    eventDate: Date;
    startTime: Date;
    displayTime: string;
}
```

## Features

Most Avro features are supported, including:

* Enumerated Types
* Maps
* Named Records
* Mandatory and optional fields
* Unions
* Primitives

### To-do

* Generate a function to set defaults as per the schema
* Add support for fixed
* Generate JSDocs from documentation
* Add namespace support
