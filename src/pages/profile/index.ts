import Block from "../../utils/Block";
import template from "./profile.hbs";
import "./profile.css";
import { render } from "../../utils/render";
import validateInput from "../../utils/validateInput";
import {
  InputType,
  InputName,
  ValidationPattern,
  ErrorMessage,
} from "../../utils/enums";

export class ProfilePage extends Block {
  constructor() {
    super({
      signUpForm: {
        title: "Sign Up",
      },

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
            this.submitForm();
          },
        },
        {
          text: "Sign in",
          type: "submit",
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
    const formData = {};

    inputs.forEach((i) => {
      formData[i.name] = i.value;
    });

    console.log(formData);
  }
}
