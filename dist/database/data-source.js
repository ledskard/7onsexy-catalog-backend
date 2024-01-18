"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../entities/User");
var Image_1 = require("../entities/Image");
var Model_1 = require("../entities/Model");
var FeatureFlags_1 = require("../entities/FeatureFlags");
var Button_1 = require("../entities/Button");
require('dotenv').config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.HOST_DB,
    port: 3306,
    username: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.DATABASE,
    entities: [User_1.User, Image_1.Image, Model_1.Model, FeatureFlags_1.FeatureFlags, Button_1.Button],
    migrations: ["src/migrations/*.**"],
});
//# sourceMappingURL=data-source.js.map