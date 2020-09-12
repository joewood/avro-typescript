import * as fs from "fs";
import { avroToTypeScript, RecordType } from "../src";
import { Schema } from "../src/model";

describe("avroToTypeScript", () => {
    test("it should generate an interface", () => {
        const schemaText = fs.readFileSync(__dirname + "/example.avsc", "utf-8");
        const schema = JSON.parse(schemaText);
        expect(avroToTypeScript(schema as RecordType)).toMatchSnapshot();
    });

    test("it should correctly type strings with logicalType", () => {
        const schema: Schema = {
            type: "record",
            name: "datedRecord",
            fields: [
                {
                    name: "eventDate",
                    type: {
                        type: "string",
                        logicalType: "iso-datetime",
                    },
                },
            ],
        };
        expect(avroToTypeScript(schema)).not.toEqual(expect.stringContaining("UNKNOWN"));
    });
});

describe("enumToTypesScript", () => {
    test("it should generate an enum", () => {
        const schemaText = fs.readFileSync(__dirname + "/just-enum.avsc", "utf-8");
        const schema = JSON.parse(schemaText);
        expect(avroToTypeScript(schema as RecordType)).toMatchSnapshot();
    });

    test("it should correctly type strings with logicalType", () => {
        const schema: Schema = {
            type: "enum",
            name: "CompanySize",
            symbols: ["SMALL", "MEDIUM", "LARGE"],
        };

        expect(avroToTypeScript(schema)).not.toEqual(expect.stringContaining("UNKNOWN"));
    });
});
