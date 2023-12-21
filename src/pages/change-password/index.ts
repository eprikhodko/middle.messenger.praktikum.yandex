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

const formInputsProps = [
  {
    type: InputType.PASSWORD,
    name: InputName.OLDPASSWORD,
    label: "Old password",
    id: "old_password",
    pattern: ValidationPattern.PASSWORD,
    errorText: ErrorMessage.PASSWORD,
    value: "currentPass1",
    inputClassName: "settings-form__input",
  },
  {
    type: InputType.PASSWORD,
    name: InputName.NEWPASSWORD,
    label: "New password",
    id: "new_password",
    pattern: ValidationPattern.PASSWORD,
    errorText: ErrorMessage.PASSWORD,
    value: "newPass1",
    inputClassName: "settings-form__input",
  },
  {
    type: InputType.PASSWORD,
    name: InputName.REPEATPASSWORD,
    label: "Repeat new password",
    id: "repeat_password",
    pattern: ValidationPattern.PASSWORD,
    errorText: ErrorMessage.PASSWORD,
    value: "newPass1",
    inputClassName: "settings-form__input",
  },
];

const buttonsProps = [
  {
    text: "Save changes",
    type: "submit",
    propClass: "button--primary",
    onClick: () => {
      handleFormSubmit();
    },
  },
  {
    text: "Cancel",
    type: "button",
    propClass: "button--link-warning",
  },
];

const buttonBackProps = {
  onClick: () => {
    console.log("go back");
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

    this.children.buttons = buttonsProps.map(
      (buttonProps) => new ButtonCommon(buttonProps)
    );
    this.children.buttonBack = new ButtonBack(buttonBackProps);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
