import Block from "../../utils/Block";
import template from "./change-password.hbs";
import "./change-password.css";
import { render } from "../../utils/render";
import validateInput from "../../utils/validateInput";
import getFormInputs from "../../utils/getFormInputs";
import {
  InputType,
  InputName,
  ValidationPattern,
  ErrorMessage,
} from "../../utils/enums";

export class ChangePasswordPage extends Block {
  constructor() {
    super({
      signUpForm: {
        title: "Sign Up",
      },

      inputClass: "settings-form__input",

      formInputs: [
        {
          type: InputType.PASSWORD,
          name: InputName.OLDPASSWORD,
          label: "Old password",
          id: "old_password",
          pattern: ValidationPattern.PASSWORD,
          errorText: ErrorMessage.PASSWORD,
          value: "currentPass1",
        },
        {
          type: InputType.PASSWORD,
          name: InputName.NEWPASSWORD,
          label: "New password",
          id: "new_password",
          pattern: ValidationPattern.PASSWORD,
          errorText: ErrorMessage.PASSWORD,
          value: "newPass1",
        },
        {
          type: InputType.PASSWORD,
          name: InputName.REPEATPASSWORD,
          label: "Repeat new password",
          id: "repeat_password",
          pattern: ValidationPattern.PASSWORD,
          errorText: ErrorMessage.PASSWORD,
          value: "newPass1",
        },
      ],

      formButtons: [
        {
          text: "Save changes",
          type: "submit",
          propClass: "button--primary",
          onClick: () => {
            this.submitForm();
          },
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
