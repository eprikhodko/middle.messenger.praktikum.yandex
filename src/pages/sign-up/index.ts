import Block from "../../utils/Block";
import template from "./sign-up.hbs";
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
import "./sign-up.css";
import AuthController from "../../controllers/AuthController";
import { SignupData } from "../../api/AuthAPI";

const formInputsProps = [
  {
    type: InputType.EMAIL,
    name: InputName.EMAIL,
    label: "Email",
    id: "email",
    pattern: ValidationPattern.EMAIL,
    errorText: ErrorMessage.EMAIL,
    inputClassName: "form-common__input",
  },
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
    type: InputType.TEXT,
    name: InputName.FIRSTNAME,
    label: "First name",
    id: "first_name",
    pattern: ValidationPattern.NAME,
    errorText: ErrorMessage.FIRSTNAME,
    inputClassName: "form-common__input",
  },
  {
    type: InputType.TEXT,
    name: InputName.SECONDNAME,
    label: "Second name",
    id: "second_name",
    pattern: ValidationPattern.NAME,
    errorText: ErrorMessage.SECONDNAME,
    inputClassName: "form-common__input",
  },
  {
    type: InputType.TEL,
    name: InputName.PHONE,
    label: "Phone",
    id: "phone",
    pattern: ValidationPattern.PHONE,
    errorText: ErrorMessage.PHONE,
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

const linkSignUpProps = {
  text: "Sign In",
  to: ROUTE.SIGN_IN,
  styles: "button button-link",
};

export class SignUpPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.formInputs = formInputsProps.map((props) => {
      return new FormCommonInput(props);
    });

    this.children.link = new Link(linkSignUpProps);

    this.children.signUpButton = new ButtonCommon({
      text: "Sign Up",
      type: "submit",
      propClass: "button--primary",
      onClick: () => {
        this.onSubmit();
      },
    });
  }

  onSubmit() {
    const data = handleFormSubmit(this.children.formInputs);

    AuthController.signup(data as SignupData);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
