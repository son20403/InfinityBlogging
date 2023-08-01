import { urlEndPoint } from "../config/database";
import axios from 'axios'
export default class PostService {
    constructor() {
        this.collectionName = 'post';
        this.urlEndPoint = urlEndPoint
    }
    async getAll() {
        const response = await axios.get(
            `${this.urlEndPoint}${this.collectionName}/getAll`,
        );
        return response.data;
    }
    async detail(id) {
        const response = await axios.get(
            `${this.urlEndPoint}${this.collectionName}/detail?id=${id}`,
        );
        return response.data;
    }
    async updateCustomer(token, entity) {
        const response = await axios.put(
            `${this.urlEndPoint}${this.collectionName}/updateCustomer`,
            entity, {
            headers: {
                "Content-Type": "multipart/form-data",
                token: `Bearer ${token}`,
            },
        }
        );
        return response.data;
    }
    async createPost(token, entity) {
        const response = await axios.post(
            `${this.urlEndPoint}${this.collectionName}/create`,
            entity, {
            headers: {
                "Content-Type": "multipart/form-data",
                token: `Bearer ${token}`,
            },
        }
        );
        return response.data;
    }
    async getAllPostByCustomer(id) {
        const response = await axios.get(
            `${this.urlEndPoint}${this.collectionName}/getAllPostByCustomer?id=${id}`,
        );
        return response.data;
    }
}