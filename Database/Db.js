const mongoose = require('mongoose')

const mongoUri = process.env.MONGO_URI

const ConnectToMongo = async () => {

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoUri)
            .catch(err => console.error(err.message));
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}


module.exports = ConnectToMongo;