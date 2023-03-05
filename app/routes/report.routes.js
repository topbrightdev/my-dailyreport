const controller = require("../controllers/report.controller");

module.exports = function (app) {
    app.post("/api/report/createreporting", controller.createreporting);
    app.get("/api/report/getreporting/:name", controller.getreporting);
    app.delete("/api/report/deletereporting/:_id", controller.deletereporting);
    app.post("/api/report/updatereporting", controller.updatereporting);
    app.get("/api/report/getallreporting", controller.getallreporting)
};