import API, {
  UsersAPI,
  ProfileData,
  UpdatePassword,
  Avatar,
} from "../api/UsersAPI";
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

      // Log the success result
      console.log("success", result);
      // await this.fetchUser();
      store.set("user", result);
    } catch (e: any) {
      console.error(e);
    }
  }

  async fetchUser() {
    const user = await this.api.read();

    store.set("user", user);
    console.log("updated? user?", user);
  }
}

export default new UsersController();
