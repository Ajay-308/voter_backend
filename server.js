const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 8000;

const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

// Use the routers
app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
