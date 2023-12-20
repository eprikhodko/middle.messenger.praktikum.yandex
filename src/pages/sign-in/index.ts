import Block from "../../utils/Block";
import template from "./sign-in.hbs";
import { ButtonCommon } from "../../components/ButtonCommon";
import { FormCommonInput } from "../../components/FormCommonInput";
import { Link } from "../../components/Link";
import { ROUTE } from "../../utils/enums";
import handleFormSubmit from "../../utils/handleFormSubmit";
import "../../components/FormAuthLayout/FormAuthLayout.css";

import {
  InputType,
  InputName,
  ValidationPattern,
  ErrorMessage,
} from "../../utils/enums";
import "./sign-in.css";

const formInputsProps = [
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

const buttonSignInProps = {
  text: "Sign in",
  type: "submit",
  propClass: "button--primary",
  onClick: () => {
    handleFormSubmit();
  },
};

const linkSignUpProps = {
  text: "Sign Up",
  to: ROUTE.SignUp,
};

export class SignInPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.formInputs = formInputsProps.map((props) => {
      return new FormCommonInput(props);
    });

    this.children.signInButton = new ButtonCommon(buttonSignInProps);

    this.children.link = new Link(linkSignUpProps);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
