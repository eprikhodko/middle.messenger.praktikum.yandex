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

export interface Avatar {
  form: FormData;
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

  updateAvatar(data: FormData) {
    return this.http.put("/profile/avatar", data);
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}

export default new UsersAPI();
