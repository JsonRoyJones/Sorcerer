const IssuesModel = require('../models/IssuesModel');

const { Issue } = IssuesModel;

const IssueControllers = {};

IssueControllers.getIssues = (req, res, next) => {
  Issue.find({}, (err, issues) => {
    if (err) {
      return next(err);
    }
    res.locals.issues = issues;
    return next();
  });
};

IssueControllers.addIssues = (req, res, next) => {
  console.log('req.body', req.body);
  const issue = req.body;
  const issuePieces = Object.entries(issue);
  console.log(issuePieces, 'issuePieces');
  const issueCreate = { title: issuePieces[0][0], url: issuePieces[0][1] };
  console.log(issueCreate);
  Issue.create(issueCreate, (err, newIssues) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.locals.newIssues = newIssues;
    console.log(res.locals.newIssues);
    return next();
  });
};

IssueControllers.deleteIssue = (req, res, next) => {
  Issue.findByIdAndDelete(req.params.id, (err, issue) => {
    if (err) {
      return next(err);
    }
    res.locals.issue = issue;
    return next();
  });
};

module.exports = IssueControllers;
