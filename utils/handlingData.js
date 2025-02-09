const fs = require("fs");
const data = require("../db.json");
const updateDB = (pair) => {
  const updatedData = { ...data,...pair };
  console.log(updatedData)
  const write = fs.writeFileSync("db.json", JSON.stringify(updatedData));
  return "Database Updated";
};

const deleteFromDB = (key) => {
  if (data[key]) {
    delete data[key];
    const updatedData = data;
    const write = fs.writeFileSync("db.json", JSON.stringify(updatedData));
    return true;
  }else {
    return false;
  }
};

module.exports = {
  updateDB,deleteFromDB
};
