import mongoose from "mongoose";
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-plugin');


const Admin = new Schema(
    {
        user_name: { type: String },
        email: { type: String, default: "" },
        password: { type: String },
        image: {
            type: String,
            default: "https://e7.pngegg.com/pngimages/166/90/png-clipart-computer-icons-user-setting-icon-miscellaneous-monochrome.png",
        },
        full_name: { type: String, default: "" },
        id_image: { type: String, default: "" },
        address: { type: String, default: "" },
        admin: { type: String, default: true },
        role: { type: String, default: "staff" },
    },
    {
        timestamps: true,
    }
);
Admin.plugin(slug, {
    tmpl: '<%=full_name%>',
    alwaysUpdate: true,
    slugPaddingSize: 4
});

module.exports = mongoose.model("Admin", Admin);