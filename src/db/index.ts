import mongoose from 'mongoose';
import { DB_HOST, DB_PORT, DB_USER, DB_PWD } from '@/env';

// example of string

// mongodb+srv://<username>:<password>@pogilayapizzaapp.ewch3qr.mongodb.net/?retryWrites=true&w=majority

const connectDB = async () => {
  try {
    const connectionString = `mongodb${DB_PORT || '+srv'}://${DB_USER}:${DB_PWD}@${DB_HOST}/?retryWrites=true&w=majority`;
    mongoose.connect(connectionString);
  } catch (e) {
    console.error(e);
  }
};

export default connectDB;
