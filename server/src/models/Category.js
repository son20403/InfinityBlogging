import mongoose from "mongoose";
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-plugin');


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
Categories.plugin(slug, {
    tmpl: '<%=title%>',
    alwaysUpdate: true,
    slugPaddingSize: 4
});

module.exports = mongoose.model("Categories", Categories);