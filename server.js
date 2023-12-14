const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path: './config.env'});

const db = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);
const port = process.env.PORT || 8002;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Connect to the database before listening
connectDB().then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  });
  