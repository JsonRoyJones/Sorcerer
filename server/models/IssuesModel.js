const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MONGO_URI =
  'mongodb+srv://new-user_01:new-user_01@cluster0-enpl1.mongodb.net/test?retryWrites=true&w=majority';
// connect to db
mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'sourcerer'
  })
  .then(() => console.log('Connected to Mongo DB'))
  .catch(err => console.log(err));

const UserSchema = new Schema({
  userName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  email: { type: String, required: true },
  favRepos: [
    {
      name: String,
      id: {
        type: Schema.Types.ObjectId,
        ref: 'repo'
      },
      favIssues: [
        {
          title: String,
          url: String
        }
      ]
    }
  ]
});

const User = mongoose.model('user', UserSchema);

module.exports = {
  User
};
