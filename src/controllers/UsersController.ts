import API, { UsersAPI, ProfileData, UpdatePassword } from "../api/UsersAPI";

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
}

export default new UsersController();
