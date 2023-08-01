import { urlEndPoint } from "../config/database";
import axios from 'axios'
export default class CustomerService {
    constructor() {
        this.collectionName = 'customer';
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
    async detailCustomer(id) {
        const response = await axios.get(
            `${this.urlEndPoint}${this.collectionName}/detailCustomer?id=${id}`,
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
}