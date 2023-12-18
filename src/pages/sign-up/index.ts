import Block from "../../utils/Block";
import template from "./sign-up.hbs";
import "./sign-up.css";
import {
  InputType,
  InputName,
  ValidationPattern,
  ErrorMessage,
} from "../../utils/enums";
import handleFormSubmit from "../../utils/handleFormSubmit";

export class SignUpPage extends Block {
  constructor() {
    super({
      signUpForm: {
        title: "Sign Up",
      },

      inputClass: "form-common__input",

      formInputs: [
        {
          type: InputType.EMAIL,
          name: InputName.EMAIL,
          label: "Email",
          id: "email",
          pattern: ValidationPattern.EMAIL,
          errorText: ErrorMessage.EMAIL,
        },
        {
          type: InputType.TEXT,
          name: InputName.LOGIN,
          label: "Login",
          id: "login",
          pattern: ValidationPattern.LOGIN,
          errorText: ErrorMessage.LOGIN,
        },
        {
          type: InputType.TEXT,
          name: InputName.FIRSTNAME,
          label: "First name",
          id: "first_name",
          pattern: ValidationPattern.NAME,
          errorText: ErrorMessage.FIRSTNAME,
        },
        {
          type: InputType.TEXT,
          name: InputName.SECONDNAME,
          label: "Second name",
          id: "second_name",
          pattern: ValidationPattern.NAME,
          errorText: ErrorMessage.SECONDNAME,
        },
        {
          type: InputType.TEL,
          name: InputName.PHONE,
          label: "Phone",
          id: "phone",
          pattern: ValidationPattern.PHONE,
          errorText: ErrorMessage.PHONE,
        },
        {
          type: InputType.PASSWORD,
          name: InputName.PASSWORD,
          label: "Password",
          id: "password",
          pattern: ValidationPattern.PASSWORD,
          errorText: ErrorMessage.PASSWORD,
        },
      ],

      formButtons: [
        {
          text: "Sign up",
          type: "button",
          class: "button--primary",
          onClick: () => {
            handleFormSubmit();
          },
        },
        {
          text: "Sign in",
          type: "submit",
          class: "button--link-primary",
        },
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
