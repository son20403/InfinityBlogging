import Post from '../models/Post'
const cloudinary = require("cloudinary").v2;
const _ = require("lodash");
import BaseController from './Controller'

class PostController extends BaseController {
    constructor(model) {
        super(model)
    }
    create = async (req, res) => {
        const id_customer = req.customer.id;
        const isAdmin = req.customer.admin;
        const formData = req.body;
        const fileData = req.file;
        const image = fileData?.path || '';
        const id_image = fileData?.filename || '';
        try {
            const modelPost = {
                ...formData,
                image,
                id_image,
                id_customer,
                authorType: isAdmin ? 'admin' : 'customer'
            };
            const dataPost = await Post(modelPost).save();
            if (dataPost) {
                return res.status(200).json({
                    message: "Thêm thành công",
                });
            } else {
                if (fileData) cloudinary.uploader.destroy(id_image);
                return res.status(401).json({
                    message: "Thêm thất bại",
                });
            }
        } catch (error) {
            if (fileData) cloudinary.uploader.destroy(id_image);
            console.log(error);
            return res.status(500).json({
                message: "Có lỗi xảy ra",
                error: error._message,
            });
        }
    };
    like = async (req, res) => {
        const id = req.customer.id;
        const id_post = req.query.id;
        try {
            const dataPostDetail = await this.model.findById(id_post);
            if (!dataPostDetail) return res.status(400).json({
                message: "Bài viết này không tồn tại",
            });
            const isLiked = await dataPostDetail.likes?.find((idcus) => idcus === id)
            if (isLiked) return res.status(400).json({
                message: "Bạn đã thích bài viết này",
            });
            const status = await this.model.updateOne(
                { _id: id_post },
                { $addToSet: { likes: id } }
            );
            if (status) {
                return res.status(200).json({
                    message: 'Cảm ơn bạn!',
                });
            } else {
                res.status(400).json({
                    message: 'Có lỗi xảy ra'
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Có lỗi xảy ra'
            });
        }
    };
    getAllPostByCustomer = async (req, res) => {
        const id = req.query.id;
        try {
            const dataPost = await this.model.find({ id_customer: id, status: 'approved' });
            if (!dataPost) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(dataPost);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    getPostByCategory = async (req, res) => {
        const id = req.query.id;
        try {
            const dataPost = await this.model.find({ category: id });
            if (!dataPost) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(dataPost);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    updateView = async (req, res) => {
        const slug = req.query.slug;
        try {
            const dataPost = await this.model.findOne({ slug });
            if (!dataPost) {
                return res.status(400).json({
                    message: "Không tồn tại sản phẩm này",
                });
            }
            const dataPostView = await this.model.findByIdAndUpdate(dataPost._id, { views: dataPost.views + 1 });
            if (!dataPostView) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json({
                message: "update thanh cong"
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    search = async (req, res) => {
        try {
            const key = req.query.key;
            const $regex = _.escapeRegExp(key);
            const $options = _.escapeRegExp("i");
            const query = {
                $or: [
                    { title: { $regex, $options } },
                    { slug: { $regex, $options } },
                ],
            };
            const dataPost = await this.model.find(query);
            if (!dataPost)
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            return res.status(200).json(dataPost);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
    updatePost = async (req, res) => {
        const id = req.query.id;
        const formData = req.body;
        const fileData = req.file;

        try {
            const hasPost = await this.model.findOne({ _id: id });
            if (!hasPost) {
                if (fileData) cloudinary.uploader.destroy(fileData.filename);
                return res.status(400).json({
                    message: "Không tồn tại bài viết này",
                });
            }

            let newImage = hasPost.image;
            let newIdImage = hasPost.id_image;

            if (fileData) {
                cloudinary.uploader.destroy(hasPost.id_image);
                newImage = fileData.path;
                newIdImage = fileData.filename;
            }

            const updatedData = {
                ...formData,
                image: newImage,
                id_image: newIdImage,
            }

            const updatedPost = await this.model.findByIdAndUpdate(id, updatedData, {
                new: true,
            });
            if (!updatedPost) {
                if (fileData) cloudinary.uploader.destroy(fileData.filename);
                return res.status(400).json({
                    message: "Có lỗi xảy ra, không thể update",
                });
            }
            const { id_image, updatedAt, createdAt, ...others } = updatedPost._doc;
            return res.status(200).json({ ...others, message: "Cập nhật thành công" });
        } catch (error) {
            if (fileData) cloudinary.uploader.destroy(fileData.filename);
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    };
}
const postController = new PostController(Post)
module.exports = postController