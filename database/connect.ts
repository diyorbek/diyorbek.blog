import mongoose from 'mongoose';

const connection = { isConnected: -1 };

export async function connectDB() {
  if (connection.isConnected > -1) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.DB_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error.message);
  }
}
