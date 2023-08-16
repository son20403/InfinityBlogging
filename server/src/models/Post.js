import mongoose from "mongoose";
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-plugin');

const Post = new Schema(
    {
        title: { type: String },
        content: { type: String },
        category: { type: String },
        views: { type: Number, default: 0 },
        image: { type: String, default: "", },
        date: { type: String },
        timestamps: { type: Number },
        id_customer: { type: String },
        id_image: { type: String, default: "" },
        status: { type: String, default: "pending" },
        likes: { type: Array, default: [String] },
        authorType: { type: String, default: "customer" },
    },
    {
        timestamps: true,
    }
);
Post.plugin(slug, {
    tmpl: '<%=title%>',
    alwaysUpdate: true,
    slugPaddingSize: 4
});

module.exports = mongoose.model("Post", Post);