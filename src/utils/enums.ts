export enum InputType {
  TEXT = "text",
  PASSWORD = "password",
  EMAIL = "email",
  TEL = "tel",
  SEARCH = "search"
}

export enum InputName {
  LOGIN = "login",
  PASSWORD = "password",
  FIRSTNAME = "first_name",
  SECONDNAME = "second_name",
  DISPLAYNAME = "display_name",
  EMAIL = "email",
  PHONE = "phone",
  OLDPASSWORD = "old_password",
  NEWPASSWORD = "new_password",
  REPEATPASSWORD = "repeat_password",
  SEARCH = "search"
}

export enum ValidationPattern {
  LOGIN = "^(?![0-9]*$)[a-zA-Z0-9_\\-]{3,20}$",
  PASSWORD = "^(?=.*[A-Z])(?=.*[0-9])[^\\s]{8,40}$",
  NAME = "^[A-ZА-Я][a-zа-я]*(-[A-ZА-Яa-zа-я][a-zа-я]*)*$",
  EMAIL = "^[a-zA-Z0-9._\\-]+@[a-zA-Z0-9\\-]+\\.[a-zA-Z]{2,}$",
  PHONE = "^\\+?\\d{10,15}$",
}

export enum ErrorMessage {
  EMAIL = "incorrect email format",
  LOGIN = "incorrect login",
  FIRSTNAME = "incorrect first name format",
  SECONDNAME = "incorrect second name format",
  PHONE = "incorrect phone",
  PASSWORD = "incorrect password",
  DISPLAYNAME = "incorrect username",
}
