import Admin from "../models/Admin";
import Customer from "../models/Customer";
import Post from '../models/Post'
import Comment from '../models/Comment'
import Categories from '../models/Category'
import BaseController from './Controller'
import argon2 from "argon2";

const cloudinary = require("cloudinary").v2;

class AdminController extends BaseController {
    constructor(model, customerModel, postModel, commentModel, categoryModel) {
        super(model)
        this.commentModel = commentModel;
        this.customerModel = customerModel;
        this.postModel = postModel;
        this.categoryModel = categoryModel;
    }

    deleteRelatedData = async (id, userType) => {
        const posts = await this.postModel.find({ id_customer: id });
        let deleteTasks = posts.map(post => {
            if (post.id_image) {
                cloudinary.uploader.destroy(post.id_image);
            }
            return this.commentModel.deleteMany({ id_post: post._id });
        });
        await Promise.all(deleteTasks);
        await this.commentModel.deleteMany({ id_customer: id });
        await this.postModel.deleteMany({ id_customer: id });

        if (userType === "Admin") {
            const oldAdmin = await this.model.findOne({ _id: id });
            cloudinary.uploader.destroy(oldAdmin.id_image);
        } else if (userType === "Customer") {
            const oldCustomer = await this.customerModel.findOne({ _id: id });
            cloudinary.uploader.destroy(oldCustomer.id_image);
        }
    };

    deleteCustomer = async (req, res) => {
        const id = req.query.id;
        try {
            const oldCustomer = await this.customerModel.findOne({ _id: id });
            if (!oldCustomer) {
                return res.status(400).json({
                    message: "Không tồn tại khách hàng này",
                });
            }
            await this.deleteRelatedData(id, "Customer");
            const dataCustomer = await this.customerModel.findByIdAndDelete(id);
            if (!dataCustomer)
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            return res.status(200).json({ message: "Xóa thành công" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    deleteAdmin = async (req, res) => {
        const id = req.query.id;
        try {
            const oldAdmin = await this.model.findOne({ _id: id });
            if (!oldAdmin) {
                return res.status(400).json({
                    message: "Không tồn tại admin này",
                });
            }
            await this.deleteRelatedData(id, "Admin");
            const dataAdmin = await this.model.findByIdAndDelete(id);
            if (!dataAdmin)
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            return res.status(200).json({ message: "Xóa thành công" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    deletePost = async (req, res) => {
        const id_post = req.query.id;
        try {
            const post = await this.postModel.findOne({ _id: id_post });
            if (!post) {
                return res.status(400).json({
                    message: "Bài viết này không tồn tại",
                });
            }
            // Xóa tất cả các comment liên quan
            await this.commentModel.deleteMany({ id_post });
            // Xóa bài viết
            await this.postModel.findByIdAndDelete(id_post);
            // Xóa hình ảnh nếu có
            if (post.id_image) {
                cloudinary.uploader.destroy(post.id_image);
            }

            return res.status(200).json({ message: "Xóa bài viết thành công" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    deleteCategory = async (req, res) => {
        const id_category = req.query.id;
        try {
            const category = await this.categoryModel.findOne({ _id: id_category });
            if (!category) {
                return res.status(400).json({
                    message: "Category này không tồn tại",
                });
            }
            // Tìm tất cả các bài viết trong category này
            const posts = await this.postModel.find({ id_category });
            // Xóa tất cả comment liên quan và bài viết
            let deleteTasks = posts.map(async post => {
                // Xóa comments và post
                await Promise.all([
                    this.commentModel.deleteMany({ id_post: post._id }),
                    this.postModel.findByIdAndDelete(post._id)
                ]);
                // Xóa hình ảnh nếu có
                if (post.id_image) {
                    await cloudinary.uploader.destroy(post.id_image);
                }
            });
            await Promise.all(deleteTasks);
            // Xóa category
            await this.categoryModel.findByIdAndDelete(id_category);

            return res.status(200).json({ message: "Xóa category thành công" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    deleteComment = async (req, res) => {
        const id_comment = req.query.id;
        try {
            const comment = await this.commentModel.findOne({ _id: id_comment });
            if (!comment) {
                return res.status(400).json({
                    message: "Comment này không tồn tại",
                });
            }
            // Xóa comment
            await this.commentModel.findByIdAndDelete(id_comment);

            return res.status(200).json({ message: "Xóa comment thành công" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    updateStatus = async (req, res) => {
        const id = req.query.id;
        const admin = req.customer.admin
        const { status } = req.body;
        const modelType = req.query.model;
        let model;
        switch (modelType) {
            case 'post':
                model = this.postModel;
                break;
            case 'admin':
                model = this.model;
                break;
            case 'comment':
                model = this.commentModel;
                break;
            case 'category':
                model = this.categoryModel;
                break;
            default:
                return res.status(400).json({ message: "Model không hợp lệ" });
        }
        try {
            const dataPost = await model.findOne({ _id: id });
            if (!dataPost) {
                return res.status(400).json({
                    message: "Không tồn tại sản phẩm này",
                });
            }
            if (!admin) {
                return res.status(400).json({
                    message: "Bạn không phải là Admin",
                });
            }
            const dataPostStatus = await model.findByIdAndUpdate(dataPost._id, { status: status }, {
                new: true,
            });
            if (!dataPostStatus) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json({
                message: `${dataPostStatus.status === 'pending' ? 'Bạn đã không duyệt bài này' : 'Duyệt bài thành công'}`
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    getAllPostByAdmin = async (req, res) => {
        try {
            const data = await this.postModel.find();
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
    getAllCategoryByAdmin = async (req, res) => {
        try {
            const data = await this.categoryModel.find({});
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
    updateCategory = async (req, res) => {
        const id = req.query.id;
        const formData = req.body;
        try {
            const hasCategory = await this.categoryModel.findOne({ _id: id });
            if (!hasCategory) {
                return res.status(400).json({
                    message: "Không tồn tại danh mục này",
                });
            }
            const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, formData, {
                new: true,
            });
            if (!updatedCategory) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra, không thể update",
                });
            }
            const { id_image, updatedAt, createdAt, ...others } = updatedCategory._doc;
            return res.status(200).json({ ...others, message: "Cập nhật thành công" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    updateCustomer = async (req, res) => {
        const id = req.query.id;
        const formData = req.body;
        const fileData = req.file;

        try {
            const hasCustomer = await this.customerModel.findOne({ _id: id });
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

            const updatedCustomer = await this.customerModel.findByIdAndUpdate(id, updatedData, {
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
    createCustomer = async (req, res) => {
        const { user_name, password, ...info } = req.body;
        const fileData = req.file;
        const image = fileData?.path;
        const id_image = fileData?.filename;
        try {
            const existingUser = await this.customerModel.findOne({ user_name });
            if (existingUser) {
                throw new Error("Tài khoản đã tồn tại");
            }
            const hashPass = await argon2.hash(password);
            const userData = {
                ...info,
                image,
                id_image,
                user_name,
                password: hashPass,
            };
            const newUser = await this.customerModel(userData).save();
            if (!newUser) {
                throw new Error("Có lỗi xảy ra");
            }
            return res.status(200).json({
                message: "Tạo tài khoản thành công",
            });
        } catch (error) {
            if (fileData) cloudinary.uploader.destroy(id_image);
            console.log("error: ", error);
            return res.status(error.message === "Tài khoản đã tồn tại" ||
                error.message === "Có lỗi xảy ra" ? 400 : 500).json({
                    message: error.message || "Server is error",
                });
        }
    };
    getListAdmin = async (req, res) => {
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
    updateAdmin = async (req, res) => {
        const id = req.query.id;
        const formData = req.body;
        const fileData = req.file;

        try {
            const hasAdmin = await this.model.findOne({ _id: id });
            if (!hasAdmin) {
                if (fileData) cloudinary.uploader.destroy(fileData.filename);
                return res.status(400).json({
                    message: "Không tồn tại người dùng này",
                });
            }

            let newImage = hasAdmin.image;
            let newIdImage = hasAdmin.id_image;
            if (fileData) {
                cloudinary.uploader.destroy(hasAdmin.id_image);
                newImage = fileData.path;
                newIdImage = fileData.filename;
            }

            const updatedData = {
                ...formData,
                image: newImage,
                id_image: newIdImage,
            }

            const updatedAdmin = await this.model.findByIdAndUpdate(id, updatedData, {
                new: true,
            });
            if (!updatedAdmin) {
                if (fileData) cloudinary.uploader.destroy(fileData.filename);
                return res.status(400).json({
                    message: "Có lỗi xảy ra, không thể update",
                });
            }

            const { password, id_image, updatedAt, createdAt, ...others } = updatedAdmin._doc;

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

const adminController = new AdminController(Admin, Customer, Post, Comment, Categories)

module.exports = adminController;
