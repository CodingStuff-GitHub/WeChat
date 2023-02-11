import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`Mongodb is connected with host: ${data.connection.host}`);
  });
};

export default connectDatabase;
