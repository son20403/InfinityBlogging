import Post from '../models/Post'
const cloudinary = require("cloudinary").v2;

const PostController = {
    create: async (req, res) => {
        const id_customer = req.customer.id;
        const formData = req.body;
        const fileData = req.file;
        const image = fileData?.path || '';
        const id_image = fileData?.filename || '';
        try {
            const modelPost = {
                ...formData,
                image,
                id_image,
                id_customer
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
    },
    getAll: async (req, res) => {
        try {
            const dataPost = await Post.find({});
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
    },
    detail: async (req, res) => {
        try {
            const slug = req.query.slug;
            const dataPost = await Post.findOne({ slug });
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
    },
    like: async (req, res) => {
        const id = req.customer.id;
        const id_post = req.query.id;
        try {
            const dataPostDetail = await Post.findById(id_post);
            if (!dataPostDetail) return res.status(400).json({
                message: "Bài viết này không tồn tại",
            });
            const isLiked = await dataPostDetail.like.find((idcus) => idcus === id)
            if (isLiked) return res.status(400).json({
                message: "Bạn đã like bài viết này",
            });
            const status = await Post.updateOne(
                { _id: id_post },
                { $addToSet: { likes: id } }
            );
            if (status) {
                res.status(200).send('Đã thêm ID người dùng vào mảng lượt thích');
            } else {
                res.status(400).send('Đã thêm ID người dùng vào mảng lượt thích');
            }
        } catch (err) {
            res.status(500).send('Có lỗi xảy ra');
        }
    },
    getAllPostByCustomer: async (req, res) => {
        const id = req.query.id;
        try {
            const dataPost = await Post.find({ id_customer: id });
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
    },
}

module.exports = PostController