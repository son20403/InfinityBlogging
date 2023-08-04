import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        content: { type: String },
        date: { type: String },
        timestamps: { type: Number },
        id_customer: { type: String },
        id_post: { type: String },
        status: { type: String, default: "pending" },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Comment", Comment);