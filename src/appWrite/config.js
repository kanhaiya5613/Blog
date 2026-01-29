import conf from "../conf/conf";
import { Client, TablesDB, Storage, ID } from "appwrite";

class Service {
  client = new Client();
  tablesDB;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    // IMPORTANT
    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
  try {
    return await this.tablesDB.createRow(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      ID.unique(),   
      {
        title,
        slug,        
        content,
        featuredImage,
        status,
        userId,
      }
    );
  } catch (error) {
    console.log("Error creating post:", error);
    throw error;
  }
}


  async updatePost(id, data) {
    try {
      return await this.tablesDB.updateRow(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id,
        data
      );
    } catch (error) {
      console.log("Error updating post:", error);
    }
  }

  async getPosts() {
    try {
      const res = await this.tablesDB.listRows(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
      return res.rows;
    } catch (error) {
      console.log("Error getting posts:", error);
    }
  }

  async getPost(id) {
    try {
      return await this.tablesDB.getRow(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
    } catch (error) {
      console.log("Error getting post:", error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("File upload error:", error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("File delete error:", error);
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
