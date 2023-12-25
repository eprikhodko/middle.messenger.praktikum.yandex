import BaseAPI from "./BaseAPI";
import { User } from "./AuthAPI";

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

  read(): Promise<User> {
    return this.http.get('/user');
  }

  create = undefined;
  // read = undefined;
  update = undefined;
  delete = undefined;
}

export default new UsersAPI();
