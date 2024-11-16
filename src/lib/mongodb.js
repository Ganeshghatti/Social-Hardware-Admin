import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log('dbConnect - Started');
  
  if (cached.conn) {
    console.log('Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('Creating new connection...');
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('New connection created');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log('Connection successful');
  } catch (e) {
    console.error('Connection error:', e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
