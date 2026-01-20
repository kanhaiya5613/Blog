import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // Return the login promise if account creation is successful
                return this.login({ email, password });
            }
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            // Fix: Pass parameters individually, not as an object
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // Silently fail if no session exists (common case)
            if (error.code !== 401) {
                console.log("Appwrite service :: getCurrentUser :: error ", error);
            }
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error ", error);
        }
    }
}

// Fix: Use a lowercase name for the instance to avoid naming collision
const authService = new AuthService();

export default authService;