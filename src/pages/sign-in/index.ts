import Block from "../../utils/Block";
import template from "./sign-in.hbs";
import { render } from "../../utils/render";
import validateInput from "../../utils/validateInput";
import { InputType, ValidationPattern, ErrorMessages } from "../../utils/enums";
import "./sign-in.css";

export class SignInPage extends Block {
  constructor() {
    super({
      signInForm: {
        title: "Sign In",
      },

      formInputs: [
        {
          type: InputType.TEXT,
          label: "Login",
          id: "login",
          pattern: ValidationPattern.LOGIN,
          errorText: ErrorMessages.LOGIN,
        },
        {
          type: InputType.PASSWORD,
          label: "Password",
          id: "password",
          pattern: ValidationPattern.PASSWORD,
          errorText: ErrorMessages.PASSWORD,
        },
      ],

      formButtons: [
        {
          text: "Sign in",
          type: "submit",
          class: "button--primary",
          onClick: () => {
            this.submitForm();
          },
        },
        {
          text: "Sign up",
          type: "button",
          class: "button--link-primary",
          onClick: () => {
            render("login");
          },
        },
      ],

      // buttonSignIn: {
      //   text: "Sign in",
      //   type: "submit",
      //   class: "button--primary",
      //   onClick: () => {
      //     this.submitForm();
      //   },
      // },

      // buttonSignUp: {
      //   text: "Sign up",
      //   type: "button",
      //   class: "button--link-primary",
      //   onClick: () => {
      //     render("login");
      //   },
      // },
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  submitForm() {
    this.getFormData();
    this.validate();
  }

  validate() {
    const inputs = this._getFormInputs();

    inputs.forEach((i) => {
      validateInput(i.pattern, i.value, i.id);
    });
  }

  private _getFormInputs() {
    return document.querySelectorAll(".form-common__input");
  }

  getFormData() {
    const inputs = this._getFormInputs();
    // create object with inputs data
    const formData = {};

    inputs.forEach((i) => {
      formData[i.name] = i.value;
    });

    console.log(formData);
  }
}
