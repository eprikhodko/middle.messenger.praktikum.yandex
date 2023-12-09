export enum InputType {
  TEXT = "text",
  PASSWORD = "password"
}

export enum ValidationPattern {
  LOGIN = "^(?![0-9]*$)[a-zA-Z0-9_\\-]{3,20}$"
}
