import conf from "../conf/conf.js";
import { Client, ID, Storage, Query } from 'appwrite';

export class BucketServices {
  client = new Client();

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    
    this.bucket = new Storage(this.client);
  }

  async uploadImageFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
    }
    catch(error) {
      console.log(`BucketServices :: uploadImageFileService :: Error`, error);
    }
  }

  async deleteImageFile(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      )
      return true;
    }
    catch(error) {
      console.log(`BucketServices :: deleteImageFileService :: Error`, error);
      return false;
    }
  }

  getImageFilePreview(fileId) {
    return this.bucket.getFilePreview(
      conf.appwriteBucketId,
      fileId
    )
  }

}

const bucketServices = new BucketServices();
export default bucketServices;