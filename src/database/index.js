const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

async function connectToDatabase() {
    try {
        mongoose.set("strictQuery", false);
        const connectionString = process.env.DATABASE_URL;
        await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 5000
        });
        console.log ('Connected to database');
    } catch (e) {
        console.log(e);
    }
}

module.exports = connectToDatabase;