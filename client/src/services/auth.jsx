import { urlEndPoint } from "../config/database";
import axios from 'axios'
export default class AuthService {
    constructor() {
        this.collectionName = 'auth';
        this.urlEndPoint = urlEndPoint
    }
    async register(entity) {
        const response = await axios.post(
            `${this.urlEndPoint}${this.collectionName}/register`,
            entity
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
}