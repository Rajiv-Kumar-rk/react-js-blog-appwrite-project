import conf from "../conf/conf";
import { Client, Databases, Query } from 'appwrite';

export class PostServices {
  client = new Client();

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    
    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content, 
          featuredImage,
          status,
          userId
        }
      )
    }
    catch(error) {
      console.log(`DatabaseServices :: CreatePostService :: Error`, error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId } ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content, 
          featuredImage,
          status
        }
      )
    }
    catch(error) {
      console.log(`DatabaseServices :: UpdatePostService :: Error`, error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    }
    catch(error) {
      console.log(`DatabaseServices :: DeletePostService :: Error`, error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    }
    catch(error) {
      console.log(`DatabaseServices :: GetPostService :: Error`, error);
    }
  }

  async getPosts(queries=[Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      )
    }
    catch(error) {
      console.log(`DatabaseServices :: GetPostsService :: Error`, error);
    }
  }

}

const postServices = new PostServices();
export default postServices;