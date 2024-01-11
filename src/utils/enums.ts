export enum InputType {
  TEXT = "text",
  PASSWORD = "password",
  EMAIL = "email",
  TEL = "tel",
  SEARCH = "search",
}

export enum InputName {
  LOGIN = "login",
  PASSWORD = "password",
  FIRSTNAME = "first_name",
  SECONDNAME = "second_name",
  DISPLAYNAME = "display_name",
  EMAIL = "email",
  PHONE = "phone",
  OLDPASSWORD = "oldPassword",
  NEWPASSWORD = "newPassword",
  REPEATPASSWORD = "repeat_password",
  SEARCH = "search",
  MESSAGE = "message",
  NEWCHATNAME = "title",
  USERID = "user_id",
}

export enum ValidationPattern {
  LOGIN = "^(?![0-9]*$)[a-zA-Z0-9_\\-]{3,20}$",
  PASSWORD = "^(?=.*[A-Z])(?=.*[0-9])[^\\s]{8,40}$",
  NAME = "^[A-ZА-Я][a-zа-я]*(-[A-ZА-Яa-zа-я][a-zа-я]*)*$",
  EMAIL = "^[a-zA-Z0-9._\\-]+@[a-zA-Z0-9\\-]+\\.[a-zA-Z]{2,}$",
  PHONE = "^\\+?\\d{10,15}$",
  SEARCH = "^.*$",
  MESSAGE = "^.*$",
}

export enum ErrorMessage {
  EMAIL = "please use correct email address",
  LOGIN = "incorrect format, please use 3-20 symbols, without spaces",
  FIRSTNAME = "incorrect format, please don't use spaces and digits",
  SECONDNAME = "incorrect format, please don't use spaces and digits",
  PHONE = "incorrect phone number, please use 10-15 digits",
  PASSWORD = "incorrect format, please use 8-40 symbols, at least one capital letter, and digit",
  DISPLAYNAME = "incorrect format, please use 3-20 symbols, without spaces",
}

export enum ROUTE {
  INDEX = "/",
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",
  SETTINGS = "/settings",
  MESSENGER = "/messenger",
  CHANGE_PASSWORD = "/change-password",
  ERROR_404 = "/error-404",
  ERROR_500 = "/error-500",
}

export enum API {
  API_URL = "https://ya-praktikum.tech/api/v2",
  RESOURCES = "/resources",
}

export enum AUTH_API {
  BASE_URL = "/auth",
  USER = "/user",
  SIGN_UP = "/signup"
}

export enum USERS_API {
  BASE_URL = "/user",
  AVATAR = "/profile/avatar",
}
