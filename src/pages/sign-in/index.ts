import Block from "../../utils/Block";
import template from "./sign-in.hbs";
import {
  InputType,
  InputName,
  ValidationPattern,
  ErrorMessage,
} from "../../utils/enums";
import "./sign-in.css";
import handleFormSubmit from "../../utils/handleFormSubmit";

export class SignInPage extends Block {
  constructor() {
    super({
      signInForm: {
        title: "Sign In",
      },

      inputClass: "form-common__input",

      formInputs: [
        {
          type: InputType.TEXT,
          name: InputName.LOGIN,
          label: "Login",
          id: "login",
          pattern: ValidationPattern.LOGIN,
          errorText: ErrorMessage.LOGIN,
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
          text: "Sign in",
          type: "submit",
          class: "button--primary",
          onClick: () => {
            handleFormSubmit();
          },
        },
        {
          text: "Sign up",
          type: "button",
          class: "button--link-primary",
        },
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
