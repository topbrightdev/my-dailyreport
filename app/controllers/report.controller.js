const db = require("../models");
const mongodb = require('mongodb');

const Report = db.report;
const { report } = require("../models");

exports.createreporting = (req, res) => {
    const report = new Report({
      name: req.body.name,
      content: req.body.content,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    }); 
    const today = new Date().toLocaleDateString();
    const query = {
        name: req.body.name,
        createdAt: today
    }
    report.save((err, report) => {
        Report.find(query, function(err, reports) {
            res.status(200).send(reports);
        });
    });
};

exports.getreporting = (req, res) => {
    const today = new Date().toLocaleDateString();
    const query = {
        name: req.params.name,  
        createdAt: today
    }
    Report.find(query, function(err, reports) {
        res.status(200).send(reports);
    });
};

exports.deletereporting = (req, res) => {
    const userid = req.params._id;
    Report.deleteOne({_id: new mongodb.ObjectID(userid)}, function(err, results) {
        if (err){
            res.status(401).send({message: err});
            throw err;
        }
        res.status(200).send({message: "Delete successful!"}); 
     });
}

exports.updatereporting = (req, res) => {
    const userid = req.body._id;
    const updatedReport = {
        content: req.body.content,
        updatedAt: req.body.updatedAt
    };
    

    Report.findByIdAndUpdate(userid, updatedReport, { new: true }, function(
        err,
        updatedReport
      ) {
        if (err) {
          res.status(500).send({message: err});
          throw err;
        } 
          console.log("success");
          res.status(200).send({message: "Update successful!"});
      });
}

exports.getallreporting = (req, res) => {
    Report.find({}, function(err, reports) {
        res.status(200).send(reports);

    });
    
}