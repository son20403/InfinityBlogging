import { urlEndPoint } from "../config/database";
import axios from 'axios'
class AdminService {
    constructor() {
        this.collectionName = 'admin';
        this.urlEndPoint = urlEndPoint
    }
    async register(token, entity) {
        const response = await axios.post(
            `${this.urlEndPoint}${this.collectionName}/register`,
            entity,
            { headers: { token: `Bearer ${token}` } }
        );
        return response.data;
    }
    async login(entity) {
        const response = await axios.post(
            `${this.urlEndPoint}${this.collectionName}/login`,
            entity
        );
        return response.data;
    }
    async getDataCustomer(token) {
        const response = await axios.get(
            `${this.urlEndPoint}${this.collectionName}/getDataCustomer`,
            { headers: { token: `Bearer ${token}` } }
        );
        return response.data;
    }
    async getListAdmin(token) {
        const response = await axios.get(
            `${this.urlEndPoint}${this.collectionName}/getListAdmin`,
            { headers: { token: `Bearer ${token}` } }
        );
        return response.data;
    }
    async getDetailAdmin(id) {
        const response = await axios.get(
            `${this.urlEndPoint}${this.collectionName}/getDetailAdmin?id=${id}`,
        );
        return response.data;
    }
    async updateStatus(token, id, model, entity) {
        const response = await axios.put(
            `${this.urlEndPoint}${this.collectionName}/updateStatus?id=${id}&model=${model}`,
            entity,
            { headers: { token: `Bearer ${token}` } }
        );
        return response.data;
    }
    async deletePost(token, id) {
        const response = await axios.delete(
            `${this.urlEndPoint}${this.collectionName}/deletePost?id=${id}`,
            { headers: { token: `Bearer ${token}` } }
        );
        return response.data;
    }
    async deleteCategory(token, id) {
        const response = await axios.delete(
            `${this.urlEndPoint}${this.collectionName}/deleteCategory?id=${id}`,
            { headers: { token: `Bearer ${token}` } }
        );
        return response.data;
    }
    async deleteCustomer(token, id) {
        const response = await axios.delete(
            `${this.urlEndPoint}${this.collectionName}/deleteCustomer?id=${id}`,
            { headers: { token: `Bearer ${token}` } }
        );
        return response.data;
    }
    async getAllPostByAdmin(token) {
        const response = await axios.get(
            `${this.urlEndPoint}${this.collectionName}/getAllPostByAdmin`,
            { headers: { token: `Bearer ${token}` } }
        );
        return response.data;
    }
    async getAllCategoryByAdmin(token) {
        const response = await axios.get(
            `${this.urlEndPoint}${this.collectionName}/getAllCategoryByAdmin`,
            { headers: { token: `Bearer ${token}` } }
        );
        return response.data;
    }
    async updateCategory(token, id, entity) {
        const response = await axios.put(
            `${this.urlEndPoint}${this.collectionName}/updateCategory?id=${id}`,
            entity, {
            headers: { token: `Bearer ${token}` }
        });
        return response.data;
    }
    async updateCustomer(token, id, entity) {
        const response = await axios.put(
            `${this.urlEndPoint}${this.collectionName}/updateCustomer?id=${id}`,
            entity, {
            headers: {
                "Content-Type": "multipart/form-data",
                token: `Bearer ${token}`,
            },
        }
        );
        return response.data;
    }
    async createCustomer(token, entity) {
        const response = await axios.post(
            `${this.urlEndPoint}${this.collectionName}/createCustomer`,
            entity, {
            headers: {
                "Content-Type": "multipart/form-data",
                token: `Bearer ${token}`,
            },
        }
        );
        return response.data;
    }
    async createAdmin(token, entity) {
        const response = await axios.post(
            `${this.urlEndPoint}${this.collectionName}/createAdmin`,
            entity, {
            headers: {
                "Content-Type": "multipart/form-data",
                token: `Bearer ${token}`,
            },
        }
        );
        return response.data;
    }
    async updateAdmin(token, id, entity) {
        const response = await axios.put(
            `${this.urlEndPoint}${this.collectionName}/updateAdmin?id=${id}`,
            entity, {
            headers: {
                "Content-Type": "multipart/form-data",
                token: `Bearer ${token}`,
            },
        }
        );
        return response.data;
    }
    async deleteAdmin(token, id) {
        const response = await axios.delete(
            `${this.urlEndPoint}${this.collectionName}/deleteAdmin?id=${id}`,
            { headers: { token: `Bearer ${token}` } }
        );
        return response.data;
    }
}
const adminService = new AdminService()
export default adminService