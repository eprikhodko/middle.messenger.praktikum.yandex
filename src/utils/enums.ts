export enum InputType {
  TEXT = "text",
  PASSWORD = "password",
  EMAIL = "email",
  TEL = "tel",
}

export enum InputName {
  LOGIN = "login",
  PASSWORD = "password",
  FIRSTNAME = "first_name",
  SECONDNAME = "second_name",
  EMAIL = "email",
  PHONE = "phone"
}

export enum ValidationPattern {
  LOGIN = "^(?![0-9]*$)[a-zA-Z0-9_\\-]{3,20}$",
  PASSWORD = "^(?=.*[A-Z])(?=.*[0-9]).{8,40}$",
  NAME = "^[A-ZА-Я][a-zа-я]*(-[A-ZА-Яa-zа-я][a-zа-я]*)*$",
  EMAIL = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,}$",
  PHONE = "^\\+?\\d{10,15}$"
}

export enum ErrorMessage {
  EMAIL = "incorrect email format",
  LOGIN = "incorrect login",
  FIRSTNAME = "incorrect first name format",
  SECONDNAME = "incorrect second name format",
  PHONE = "incorrect phone",
  PASSWORD = "incorrect password"
}
