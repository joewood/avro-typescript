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
