import Block from "../../utils/Block";
import template from "./sign-in.hbs";
import { ButtonCommon } from "../../components/ButtonCommon";
import { FormCommonInput } from "../../components/FormCommonInput";
import handleFormSubmit from "../../utils/handleFormSubmit";
import "../../components/FormAuthLayout/FormAuthLayout.css";

import {
  InputType,
  InputName,
  ValidationPattern,
  ErrorMessage,
} from "../../utils/enums";
import "./sign-in.css";

const formInputs = [
  {
    type: InputType.TEXT,
    name: InputName.LOGIN,
    label: "Login",
    id: "login",
    pattern: ValidationPattern.LOGIN,
    errorText: ErrorMessage.LOGIN,
    inputClassName: "form-common__input",
  },
  {
    type: InputType.PASSWORD,
    name: InputName.PASSWORD,
    label: "Password",
    id: "password",
    pattern: ValidationPattern.PASSWORD,
    errorText: ErrorMessage.PASSWORD,
    inputClassName: "form-common__input",
  },
];

const buttons = [
  {
    text: "Sign in",
    type: "submit",
    propClass: "button--primary",
    onClick: () => {
      handleFormSubmit();
    },
  },
  {
    text: "Sign up",
    type: "button",
    propClass: "button--link-primary",
  },
];

export class SignInPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.formInputs = formInputs.map((props) => {
      return new FormCommonInput(props);
    });

    this.children.buttons = buttons.map((props) => {
      return new ButtonCommon(props);
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
