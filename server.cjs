const express = require("express");
const fallback = require("express-history-api-fallback");

const app = express();
const PORT = process.env.PORT || 3000;

let root = __dirname + "/dist";
app.use(express.static(root));
app.use(fallback("index.html", { root: root }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
