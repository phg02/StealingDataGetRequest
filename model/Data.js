import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    cookieData: String,
    ip: String,
    timestamp: { type: Date, default: Date.now }
});

const Data = mongoose.model("Data", dataSchema);

export default Data;