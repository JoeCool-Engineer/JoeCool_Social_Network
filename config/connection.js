const { connect, connection } = require('mongoose');

// Connection string to local instance of MongoDB
// TODO: What is the endpoint here? Assumption is that it would be userDB but don't understand. 
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/usersDB'

connect(connectionString);

module.exports = connection;