import Block from "../../utils/Block";
import template from "./change-password.hbs";
import { ButtonCommon } from "../../components/ButtonCommon";
import handleFormSubmit from "../../utils/handleFormSubmit";
import "../../components/FormAuthLayout/FormAuthLayout.css";
import {
  InputType,
  InputName,
  ValidationPattern,
  ErrorMessage,
} from "../../utils/enums";
import "./change-password.css";
import { ButtonBack } from "../../components/ButtonBack";
import { FormSettingsInput } from "../../components/FormSettingsInput";
import UsersController from "../../controllers/UsersController";
import { UpdatePassword } from "../../api/UsersAPI";
import Router from "../../utils/Router";
import { FormCommonInput } from "../../components/FormCommonInput";

const formInputsProps = [
  {
    type: InputType.PASSWORD,
    name: InputName.OLDPASSWORD,
    label: "Enter your current password",
    id: "old_password",
    pattern: ValidationPattern.PASSWORD,
    errorText: ErrorMessage.PASSWORD,
    inputClassName: "settings-form__input",
  },
  {
    type: InputType.PASSWORD,
    name: InputName.NEWPASSWORD,
    label: "Enter new password",
    id: "new_password",
    pattern: ValidationPattern.PASSWORD,
    errorText: ErrorMessage.PASSWORD,
    inputClassName: "settings-form__input",
  },
];

const buttonBackProps = {
  onClick: () => {
    Router.back()
  },
};

export class ChangePasswordPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.formInputs = formInputsProps.map((props) => {
      return new FormSettingsInput(props);
    });

    this.children.saveChangesButton = new ButtonCommon({
      text: "Save changes",
      type: "submit",
      propClass: "button--primary",
      onClick: () => {
        this.onSubmit();
      },
    });

    this.children.buttonBack = new ButtonBack(buttonBackProps);
  }

  onSubmit() {
    console.log(this.children.formInputs);
    const data = handleFormSubmit(this.children.formInputs as FormCommonInput[]);
    console.log(data);

    UsersController.updatePassword(data as UpdatePassword);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
