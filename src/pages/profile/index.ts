import Block from "../../utils/Block";
import template from "./profile.hbs";
import "./profile.css";
import { render } from "../../utils/render";
import {
  InputType,
  InputName,
  ValidationPattern,
  ErrorMessage,
} from "../../utils/enums";
import handleFormSubmit from "../../utils/handleFormSubmit";

export class ProfilePage extends Block {
  constructor() {
    super({
      signUpForm: {
        title: "Sign Up",
      },

      inputClass: "settings-form__input",

      formInputs: [
        {
          propClass: "settings-form__input",
          type: InputType.EMAIL,
          name: InputName.EMAIL,
          label: "Email",
          id: "email",
          pattern: ValidationPattern.EMAIL,
          errorText: ErrorMessage.EMAIL,
          value: "pochta@yandex.ru",
        },
        {
          type: InputType.TEXT,
          name: InputName.LOGIN,
          label: "Login",
          id: "login",
          pattern: ValidationPattern.LOGIN,
          errorText: ErrorMessage.LOGIN,
          value: "ivanivanov",
        },
        {
          type: InputType.TEXT,
          name: InputName.FIRSTNAME,
          label: "First name",
          id: "first_name",
          pattern: ValidationPattern.NAME,
          errorText: ErrorMessage.FIRSTNAME,
          value: "Ivan",
        },
        {
          type: InputType.TEXT,
          name: InputName.SECONDNAME,
          label: "Second name",
          id: "second_name",
          pattern: ValidationPattern.NAME,
          errorText: ErrorMessage.SECONDNAME,
          value: "Ivanov",
        },
        {
          type: InputType.TEXT,
          name: InputName.DISPLAYNAME,
          label: "Username",
          id: "display_name",
          pattern: ValidationPattern.LOGIN,
          errorText: ErrorMessage.DISPLAYNAME,
          value: "Ivan",
        },
        {
          type: InputType.TEL,
          name: InputName.PHONE,
          label: "Phone",
          id: "phone",
          pattern: ValidationPattern.PHONE,
          errorText: ErrorMessage.PHONE,
          value: "+79099673030",
        },
      ],

      formButtons: [
        {
          text: "Save changes",
          type: "submit",
          propClass: "button--primary",
          onClick: () => {
            handleFormSubmit();
          },
        },
        {
          text: "Change password",
          type: "button",
          propClass: "button--primary",
        },
        {
          text: "Cancel",
          type: "button",
          propClass: "button--link-warning",
        },
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
