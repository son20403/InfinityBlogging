import Customer from "../models/Customer";

const cloudinary = require("cloudinary").v2;

const CustomerController = {
    getAll: async (req, res) => {
        try {
            const dataCustomer = await Customer.find({});
            if (!dataCustomer) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(dataCustomer);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    },
    detail: async (req, res) => {
        try {
            const id_customer = req.customer.id;
            const dataCustomer = await Customer.findById(id_customer);
            if (!dataCustomer)
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            const { password, id_image, updatedAt, createdAt, ...others } = dataCustomer._doc;

            return res.status(200).json(others);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    },
    async updateCustomer(req, res) {
        const id = req.customer.id;
        const formData = req.body;
        const fileData = req.file;
        console.log("🚀 ~ file: CustomerController.js:44 ~ updateCustomer ~ fileData:", fileData)

        let newImage = fileData?.path || '';
        let newIdImage = fileData?.filename || '';

        try {
            const hasCustomer = await Customer.findOne({ _id: id });
            if (!hasCustomer) {
                if (fileData) cloudinary.uploader.destroy(newIdImage);
                return res.status(400).json({
                    message: "Không tồn tại người dùng này",
                });
            }
            if (fileData) cloudinary.uploader.destroy(hasCustomer.id_image);
            if (!fileData) {
                newImage = hasCustomer.image;
                newIdImage = hasCustomer.id_image;
            }

            const dataCustomer = await Customer.findByIdAndUpdate(
                id, { ...formData, image: newImage, id_image: newIdImage, id }, {
                new: true,
            });
            if (!dataCustomer) {
                if (fileData) cloudinary.uploader.destroy(newIdImage);
                return res.status(400).json({
                    message: "Có lỗi xảy ra, không thể update",
                });
            }
            const { password, id_image, updatedAt, createdAt, ...others } = dataCustomer._doc;
            return res.status(200).json({ others, message: "Cập nhật thành công" });
        } catch (error) {
            if (fileData) cloudinary.uploader.destroy(newIdImage);
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    },
    //[GET]/customer/detail?id=
    async detailCustomer(req, res) {
        try {
            const id = req.query.id;
            const dataCus = await Customer.findById(id);
            if (!dataCus)
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            return res.status(200).json(dataCus);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    }
}

module.exports = CustomerController