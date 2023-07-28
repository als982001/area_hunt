import app from "./server";

const PORT = 4000;

const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://als982001:${process.env.MONGODB_PASSWORD}@cluster0.cysggjr.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(`MongoDB Error: ${error}`));

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
