import mongoose from "mongoose";
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-plugin');


const Customer = new Schema(
    {
        user_name: { type: String },
        email: { type: String },
        password: { type: String },
        image: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/1/1247.png",
        },
        full_name: { type: String, default: "" },
        id_image: { type: String, default: "" },
        address: { type: String, default: "" },
    },
    {
        timestamps: true,
    }
);
Customer.plugin(slug, {
    tmpl: '<%=user_name%>',
    alwaysUpdate: true,
    slugPaddingSize: 4
});

module.exports = mongoose.model("Customer", Customer);