import mongoose from 'mongoose';

const connection = { isConnected: -1 };
let db: typeof mongoose;

export async function connectDB() {
  if (connection.isConnected > -1) {
    return () => db.connection.close();
  }

  try {
    db = await mongoose.connect(process.env.DB_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;

    return () => db.connection.close();
  } catch (error) {
    console.log(error.message);
  }

  return async () => void 0;
}
