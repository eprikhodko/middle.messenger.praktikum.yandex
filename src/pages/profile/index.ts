import Block from "../../utils/Block";
import template from "./profile.hbs";
import { ButtonCommon } from "../../components/ButtonCommon";
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
import "./profile.css";
import { ButtonBack } from "../../components/ButtonBack";
import { FormSettingsInput } from "../../components/FormSettingsInput";

const formInputsProps = [
  {
    type: InputType.EMAIL,
    name: InputName.EMAIL,
    label: "Email",
    id: "email",
    pattern: ValidationPattern.EMAIL,
    errorText: ErrorMessage.EMAIL,
    value: "pochta@yandex.ru",
    inputClassName: "settings-form__input",
  },
  {
    type: InputType.TEXT,
    name: InputName.LOGIN,
    label: "Login",
    id: "login",
    pattern: ValidationPattern.LOGIN,
    errorText: ErrorMessage.LOGIN,
    value: "ivanivanov",
    inputClassName: "settings-form__input",
  },
  {
    type: InputType.TEXT,
    name: InputName.FIRSTNAME,
    label: "First name",
    id: "first_name",
    pattern: ValidationPattern.NAME,
    errorText: ErrorMessage.FIRSTNAME,
    value: "Ivan",
    inputClassName: "settings-form__input",
  },
  {
    type: InputType.TEXT,
    name: InputName.SECONDNAME,
    label: "Second name",
    id: "second_name",
    pattern: ValidationPattern.NAME,
    errorText: ErrorMessage.SECONDNAME,
    value: "Ivanov",
    inputClassName: "settings-form__input",
  },
  {
    type: InputType.TEXT,
    name: InputName.DISPLAYNAME,
    label: "Username",
    id: "display_name",
    pattern: ValidationPattern.LOGIN,
    errorText: ErrorMessage.DISPLAYNAME,
    value: "Ivan",
    inputClassName: "settings-form__input",
  },
  {
    type: InputType.TEL,
    name: InputName.PHONE,
    label: "Phone",
    id: "phone",
    pattern: ValidationPattern.PHONE,
    errorText: ErrorMessage.PHONE,
    value: "+79099673030",
    inputClassName: "settings-form__input",
  },
];

const buttonsProps = [
  // {
  //   text: "Sign In",
  //   type: "submit",
  //   propClass: "button--primary",
  //   onClick: () => {
  //     handleFormSubmit();
  //   },
  // },

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
];

const buttonBackProps = {
  onClick: () => {
    console.log("go back");
  },
};

const linkSignUpProps = {
  text: "Sign Up",
  to: ROUTE.SIGN_UP,
};

export class ProfilePage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.formInputs = formInputsProps.map((props) => {
      return new FormSettingsInput(props);
    });

    this.children.buttons = buttonsProps.map((buttonProps) => new ButtonCommon(buttonProps));
    this.children.buttonBack = new ButtonBack(buttonBackProps);

    this.children.link = new Link(linkSignUpProps);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
