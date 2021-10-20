const express = require("express");
const mongoose = require("mongoose");
const app = express();

//forma de ler json / middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: " Name: Jhon Lastname: Jhones , Age: 24 " });
});

const DB_USER = "yoander";
const DB_PASSWORD = encodeURIComponent("Brasil123");

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@clustercrud.ajxqo.mongodb.net/MyFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conected to MongoDB");
  })
  .catch((err) => console.log(err));

app.listen(3000);
