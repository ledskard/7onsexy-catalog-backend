"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
var UserRoutes_1 = require("./UserRoutes");
var ModelRoutes_1 = require("./ModelRoutes");
var routes = (0, express_1.Router)();
var authMiddleware = new AuthMiddleware_1.default();
routes.use("/users", UserRoutes_1.default);
routes.use("/models", ModelRoutes_1.default);
routes.get("/", function (req, res) {
    res.status(200).send({ status: "ok" });
});
exports.default = routes;
//# sourceMappingURL=index.js.map