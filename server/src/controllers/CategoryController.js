import Categories from '../models/Category'

const CategoryController = {
    create: async (req, res) => {
        const id_customer = req.customer.id;
        const { title } = req.body;
        try {
            const modelCategory = {
                title,
                id_customer
            };
            const hasCategory = await Categories.findOne({ title });
            if (hasCategory) return res.status(401).json({
                message: "Đã tồn tại loại này",
            });
            const dataCategory = await Categories(modelCategory).save();
            if (dataCategory) {
                return res.status(200).json({
                    message: "Thêm thành công",
                });
            } else {
                return res.status(401).json({
                    message: "Thêm thất bại",
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
            const dataCategory = await Categories.find({});
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
    detail: async (req, res) => {
        try {
            const id = req.query.id;
            const dataPost = await Categories.findById(id);
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
            const dataCus = await Categories.findById(id);
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

module.exports = CategoryController