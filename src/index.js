const express = require("express");
var cors = require('cors')
const apicache = require("apicache");
const v1ProductsRouter = require("./v1/routes/products");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

const app = express();
const PORT = process.env.PORT || 3000;
const cache = apicache.middleware;

app.use(cors())
app.use(express.json());
app.use(cache("2 minutes"));
app.use(v1ProductsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
