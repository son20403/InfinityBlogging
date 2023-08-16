import Customer from "../models/Customer";
import BaseController from './Controller'

const cloudinary = require("cloudinary").v2;
import { generateAccessToken } from "../jwt";

class CustomerController extends BaseController {
    constructor(model) {
        super(model)
        this.model = model
    }
    getAll = async (req, res) => {
        try {
            const data = await this.model.find({});
            if (!data) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    updateCustomer = async (req, res) => {
        const id = req.customer.id;
        const formData = req.body;
        const fileData = req.file;

        try {
            const hasCustomer = await this.model.findOne({ _id: id });
            if (!hasCustomer) {
                if (fileData) cloudinary.uploader.destroy(fileData.filename);
                return res.status(400).json({
                    message: "Không tồn tại người dùng này",
                });
            }

            let newImage = hasCustomer.image;
            let newIdImage = hasCustomer.id_image;
            if (fileData) {
                cloudinary.uploader.destroy(hasCustomer.id_image);
                newImage = fileData.path;
                newIdImage = fileData.filename;
            }

            const updatedData = {
                ...formData,
                image: newImage,
                id_image: newIdImage,
            }

            const updatedCustomer = await this.model.findByIdAndUpdate(id, updatedData, {
                new: true,
            });

            if (!updatedCustomer) {
                if (fileData) cloudinary.uploader.destroy(fileData.filename);
                return res.status(400).json({
                    message: "Có lỗi xảy ra, không thể update",
                });
            }

            const { password, id_image, updatedAt, createdAt, ...others } = updatedCustomer._doc;

            return res.status(200).json({ others, message: "Cập nhật thành công" });
        } catch (error) {
            if (fileData) cloudinary.uploader.destroy(fileData.filename);
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
}

const customerController = new CustomerController(Customer)
module.exports = customerController