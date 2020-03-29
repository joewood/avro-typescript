import * as fs from "fs";
import { avroToTypeScript, RecordType } from "../src";

describe("avroToTypeScript", () => {
  test("it should generate an interface", () => {
    const schemaText = fs.readFileSync(__dirname + "/example.avsc", "UTF8");
    const schema = JSON.parse(schemaText);
    expect(avroToTypeScript(schema as RecordType)).toMatchSnapshot();
  });

  test("it should correctly type strings with logicalType", () => {
    const schema: RecordType = {
      type: "record",
      name: "datedRecord",
      fields: [
        {
          name: "eventDate",
          type: {
            type: "string",
            logicalType: "iso-datetime"
          }
        }
      ]
    };

    expect(avroToTypeScript(schema)).not.toEqual(
      expect.stringContaining("UNKNOWN")
    );
  });
});
