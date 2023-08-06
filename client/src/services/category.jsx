import { urlEndPoint } from "../config/database";
import axios from 'axios'
export default class CategoryService {
    constructor() {
        this.collectionName = 'category';
        this.urlEndPoint = urlEndPoint
    }
    async create(token, entity) {
        const response = await axios.post(
            `${this.urlEndPoint}${this.collectionName}/create`,
            entity,
            { headers: { token: `Bearer ${token}` } }
        );
        return response.data;
    }
    async getAll(entity) {
        const response = await axios.get(
            `${this.urlEndPoint}${this.collectionName}/getAll`,
            entity
        );
        return response.data;
    }
    async detailCategory(id) {
        const response = await axios.get(
            `${this.urlEndPoint}${this.collectionName}/detailCategory?id=${id}`,
        );
        return response.data;
    }
    async detailCategoryBySlug(slug) {
        const response = await axios.get(
            `${this.urlEndPoint}${this.collectionName}/detailCategoryBySlug?slug=${slug}`,
        );
        return response.data;
    }
}