import dotenv from "dotenv"; // always put this at the start of the file otherwise .env variables will not be accessible
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes.js";
import goalRoute from "./routes/goalRoutes.js";

dotenv.config();


const app = express();
const Port = process.env.PORT || 5000;


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/goals', goalRoute);
app.use('/api/users', userRoute);

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB connected'))
.catch((error) => console.log(error.message));

app.listen(Port,() => console.log(`Server running on port: ${Port}`));