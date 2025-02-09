const dotenv = require("dotenv").config();
const Express = require("express");
const Cors = require("cors");
const data = require("./db.json");
const { ErrorHandler, CreateError } = require("./middleware/errorHandling");
const { CheckLimit } = require("./middleware/checkLimit");
const { updateDB, deleteFromDB } = require("./utils/handlingData");
const app = Express();
app.use(Cors());
app.use(Express.urlencoded({ extended: false }));
app.use(Express.json());

app.get("/",(req,res)=>{
 res.send("hello this is Cactro caching api 902 assignment");
});


//Create
app.post("/cache", CheckLimit, (req, res, next) => {
  const obj = req.body;
  const EntryLength = Object.entries(obj).length;
  if (EntryLength > 1 || EntryLength < 1)
    next(CreateError(405, "Please send a key-value pair"));
  else {
    updateDB(obj);
    res.send({ status: 200, message: "Caching done succesully" });
  }
});

//Read
app.get("/cache/:key", (req, res, next) => {
  const key = req.params.key;
  if (data[key]) {
    res.send({ value: data[key] });
  } else {
    next(CreateError(404, "Cache Not Found"));
  }
});

//Delete
app.delete("/cache/:key", (req, res, next) => {
  const key = req.params.key;
  if (deleteFromDB(key))
    res.send({ status: 200, message: "Cache deleted Succecesfully" });
  else next(CreateError(404, "Cache Not Found for deletion request"));
});

//Error handling
app.use(ErrorHandler);
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
