const mongoose = require("mongoose");

const Report = mongoose.model(
    "Report",  
    new mongoose.Schema({
        name: String,
        content: String,
        createdAt: String,
        updatedAt: String
    })
);

module.exports = Report;