const fs = require("fs");
const crypto = require("crypto");
const csv = require("csvtojson");
let converter = require("json-2-csv");

const csvFilePath = "public/Languages.csv";

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    // Add Ids to every row
    const newJsonObj = jsonObj.map((obj) => {
      obj.ID ? obj.ID : (obj.ID = crypto.randomBytes(3).toString("hex"));
      return obj;
    });
    // Write JSON File in public folder
    fs.writeFileSync("public/languages.json", JSON.stringify(newJsonObj));
    console.log(newJsonObj);

    // Convert new JSON file to CSV
    converter.json2csv(newJsonObj, (err, csv) => {
      // Save new CSV to public folder
      fs.writeFileSync("public/languages.csv", csv);
    });
  });
