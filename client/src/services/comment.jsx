import { urlEndPoint } from "../config/database";
import axios from 'axios'
export default class CategoryService {
    constructor() {
        this.collectionName = 'comment';
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
    async getCommentByPost(id) {
        const response = await axios.get(
            `${this.urlEndPoint}${this.collectionName}/getByPost?id=${id}`,
        );
        return response.data;
    }
    async detailCategory(id) {
        const response = await axios.get(
            `${this.urlEndPoint}${this.collectionName}/detailCategory?id=${id}`,
        );
        return response.data;
    }
}