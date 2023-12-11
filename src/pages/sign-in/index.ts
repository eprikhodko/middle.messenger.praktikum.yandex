import Block from "../../utils/Block";
import template from "./sign-in.hbs";
import { render } from "../../utils/render";
import validateInput from "../../utils/validateInput";
import getFormInputs from "../../utils/getFormInputs";
import { InputType, InputName, ValidationPattern, ErrorMessage } from "../../utils/enums";
import "./sign-in.css";

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
    const inputs = getFormInputs();

    inputs.forEach((i) => {
      validateInput(i.pattern, i.value, i.id);
    });
  }

  getFormData() {
    const inputs = getFormInputs();
    const formData = {};

    inputs.forEach((i) => {
      formData[i.name] = i.value;
    });

    console.log(formData);
  }
}
