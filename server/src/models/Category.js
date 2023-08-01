import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Categories = new Schema(
    {
        title: { type: String },
        id_customer: { type: String },
        status: { type: String, default: "pending" },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Categories", Categories);