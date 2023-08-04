import Comment from '../models/Comment'

const CommentController = {
    create: async (req, res) => {
        const id_customer = req.customer.id;
        const comment = req.body
        try {
            const modelComment = {
                ...comment,
                id_customer
            };
            const dataComment = await Comment(modelComment).save();
            if (dataComment) {
                return res.status(200).json({
                    message: "Cảm ơn bạn đã bình luận!",
                });
            } else {
                return res.status(401).json({
                    message: "Bình luận thất bại!",
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Có lỗi xảy ra",
                error: error._message,
            });
        }
    },
    getAll: async (req, res) => {
        try {
            const dataCategory = await Comment.find({});
            if (!dataCategory) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(dataCategory);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    },
    getByPost: async (req, res) => {
        try {
            const id_post = req.query.id
            const dataCommentByPost = await Comment.find({ id_post });
            if (!dataCommentByPost) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(dataCommentByPost);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    },
    detail: async (req, res) => {
        try {
            const id = req.query.id;
            const dataPost = await Comment.findById(id);
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
    async detailCategory(req, res) {
        try {
            const id = req.query.id;
            const dataCus = await Comment.findById(id);
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
    },

}

module.exports = CommentController