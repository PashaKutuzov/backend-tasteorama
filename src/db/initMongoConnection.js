import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;
console.log('Mongo URI:', uri);
export default async function initMongoConnection() {
  await mongoose.connect(uri);
  console.log('Mongo connection successfully established!');
}
