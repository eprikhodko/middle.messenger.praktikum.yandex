import API, { UsersAPI, ProfileData, UpdatePassword } from "../api/UsersAPI";
import store from "../utils/Store";

export class UsersController {
  private readonly api: UsersAPI;

  constructor() {
    this.api = API;
  }

  async updateProfileData(data: ProfileData) {
    try {
      await this.api.updateProfileData(data);
    } catch (e: any) {
      console.error(e);
    }
  }

  async updatePassword(data: UpdatePassword) {
    try {
      await this.api.updatePassword(data);
    } catch (e: any) {
      console.error(e);
    }
  }

  async updateAvatar(data: FormData) {
    try {
      // Call the API method and wait for the result
      const response = await this.api.updateAvatar(data);

      // Parse the response string into a JSON object
      const result = JSON.parse(response);

      store.set("user", result);
    } catch (e: any) {
      console.error(e);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.read();

      store.set("user", user);
    } catch (e) {
      console.error(e);
    }
  }
}

export default new UsersController();
