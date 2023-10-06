"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("reflect-metadata");
var express = require("express");
var routes_1 = require("./routes");
var cors = require("cors");
var data_source_1 = require("./database/data-source");
data_source_1.AppDataSource.initialize()
    .then(function () {
    console.log("Data Source has been initialized!");
})
    .catch(function (err) {
    console.error("Error during Data Source initialization", err);
});
var app = express();
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(routes_1.default);
var port = process.env.PORT || 8080;
if (process.env.NODE_ENV !== "test") {
    var server = app.listen(port, function () { return console.log("App listening at http://localhost:".concat(port)); });
}
exports.default = app;
//# sourceMappingURL=app.js.map