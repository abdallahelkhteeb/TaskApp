// Load environment variables
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import authRouter from "./Routes/authRouter.js";  
import taskRouter from "./Routes/taskRouter.js";  
import cookieParser from "cookie-parser";
import helmet from "helmet";

dotenv.config();
   
const app = express();

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/taskapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    // This callback runs only if the connection is successful
    console.log("Connected to MongoDB Atlas");
    // We only start listening for requests AFTER the DB is connected
  })
  .catch((err) => {
    // This callback runs if the connection fails
    console.log("Error connecting to MongoDB:", err);
  });
 
app.use(helmet());
// This middleware parses incoming request bodies with URL-encoded data (from HTML forms)
app.use(express.urlencoded({ extended: false }));
// This middleware parses incoming JSON payloads (useful for API endpoints)
app.use(express.json()); 
// This middleware parses cookies attached to incoming requests
app.use(cookieParser());

app.use(express.static("taskapp-frontend/build")  );  

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

app.get("/", (req, res) => { 
  res.send("API is running");
});

// Authentication routes
app.use("/auth", authRouter);
app.use("/api", taskRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
