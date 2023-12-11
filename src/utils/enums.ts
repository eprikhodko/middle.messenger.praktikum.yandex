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
  PASSWORD = "^(?=.*[A-Z])(?=.*[0-9]).{8,40}$"
}

export enum ErrorMessage {
  LOGIN = "incorrect login",
  PASSWORD = "incorrect password"
}
