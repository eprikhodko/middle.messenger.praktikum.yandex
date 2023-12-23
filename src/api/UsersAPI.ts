import BaseAPI from "./BaseAPI";

export interface ProfileData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  display_name: string;
}

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export class UsersAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  updateProfileData(data: ProfileData) {
    return this.http.put("/profile", data);
  }

  updatePassword(data: UpdatePassword) {
    return this.http.put("/password", data);
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}

export default new UsersAPI();
