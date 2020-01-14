const Issue = require('../models/IssuesModel');

const IssueControllers = {};

IssueControllers.getIssues = (req, res, next) => {
  Issue.find({}, (err, issues) => {
    if (err) {
      return next(err);
    } else {
      res.locals.issues = issues;
      return next();
    }
  });
};

IssueControllers.addIssues = (req, res, next) => {
  console.log('req.body', req.body);
  const { issues } = req.body;
  Issue.create({ issues }, (err, newIssue) => {
    if (err) {
      return next(err);
    } else {
      res.locals.newIssues = newIssues;
      return next();
    }
  });
};

IssueControllers.deleteIssue = (req, res, next) => {
  Issue.findByIdAndDelete(req.params.id, (err, issue) => {
    if (err) {
      return next(err);
    } else {
      res.locals.issue = issue;
      return next();
    }
  });
};

module.exports = IssueControllers;
