const fs = require('fs')
const crypto = require('crypto')
const csv = require('csvtojson')


const csvFilePath='public/Languages.csv'

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
  const newJsonObj = jsonObj.map(obj => {
    obj.ID ? obj.ID : obj.ID = crypto.randomBytes(3).toString('hex')
    return obj
  })
  fs.writeFileSync('public/languages.json',JSON.stringify(newJsonObj))
  console.log(newJsonObj);
})

// Async / await usage
// const jsonArray = await csv().fromFile(csvFilePath);