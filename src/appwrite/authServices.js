import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthServices {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createUserAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        //after the successfull account creation, the user should get direct logged-in 
        return this.userLogin(email, password);
      }
      else {
        return userAccount;
      }
    }
    catch(error) {
      throw error;
    }
  }

  async userLogin({ email, password }) {
    try {
      const userLogginStatus = await this.account.createEmailSession(email, password);
      return userLogginStatus;
    }
    catch(error) {
      throw error;
    }
  }

  async getCurrentLoggedUser() {
    try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
    return null;
  } 

  async userLogout() {
    try {
      await this.account.deleteSessions();
    }

    catch(error) {
      throw error;
    }
  }

}

const authServices = new AuthServices();
export default authServices;