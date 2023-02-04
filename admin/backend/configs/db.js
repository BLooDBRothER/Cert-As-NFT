
function initMongo(mongoose, mongoURI) {
    console.log(mongoURI);
    
    mongoose.set("strictQuery", true);
    mongoose.connect(mongoURI, { useUnifiedTopology: false, useNewUrlParser: true, family: 4 })
    
    const connection = mongoose.connection;
    connection.once('open', () => console.log('MongoDB --  database connection established successfully!'));
    connection.on('error', (err) => {
        console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        process.exit();
    });
    
    return mongoose
}

module.exports = initMongo;
