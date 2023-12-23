import BaseAPI from "./BaseAPI";

export interface ProfileData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  display_name: string;
}

export class UsersAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  updateProfileData(data: ProfileData) {
    return this.http.put("/profile", data);
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}

export default new UsersAPI();
