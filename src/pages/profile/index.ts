import Block from "../../utils/Block";
import template from "./profile.hbs";
import { ButtonCommon } from "../../components/ButtonCommon";
import handleFormSubmit from "../../utils/handleFormSubmit";
import AuthController from "../../controllers/AuthController";
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
import { withStore } from "../../utils/Store";
import UsersController from "../../controllers/UsersController";
import { ProfileData } from "../../api/UsersAPI";
import { Link } from "../../components/Link";
import { ROUTE } from "../../utils/enums";

const formInputsProps = [
  {
    type: InputType.EMAIL,
    name: InputName.EMAIL,
    label: "Email",
    id: "email",
    pattern: ValidationPattern.EMAIL,
    errorText: ErrorMessage.EMAIL,
    inputClassName: "settings-form__input",
  },
  {
    type: InputType.TEXT,
    name: InputName.LOGIN,
    label: "Login",
    id: "login",
    pattern: ValidationPattern.LOGIN,
    errorText: ErrorMessage.LOGIN,
    inputClassName: "settings-form__input",
  },
  {
    type: InputType.TEXT,
    name: InputName.FIRSTNAME,
    label: "First name",
    id: "first_name",
    pattern: ValidationPattern.NAME,
    errorText: ErrorMessage.FIRSTNAME,
    inputClassName: "settings-form__input",
  },
  {
    type: InputType.TEXT,
    name: InputName.SECONDNAME,
    label: "Second name",
    id: "second_name",
    pattern: ValidationPattern.NAME,
    errorText: ErrorMessage.SECONDNAME,
    inputClassName: "settings-form__input",
  },
  {
    type: InputType.TEXT,
    name: InputName.DISPLAYNAME,
    label: "Username",
    id: "display_name",
    pattern: ValidationPattern.LOGIN,
    errorText: ErrorMessage.DISPLAYNAME,
    inputClassName: "settings-form__input",
  },
  {
    type: InputType.TEL,
    name: InputName.PHONE,
    label: "Phone",
    id: "phone",
    pattern: ValidationPattern.PHONE,
    errorText: ErrorMessage.PHONE,
    inputClassName: "settings-form__input",
  },
];

const buttonSignOutProps =
  {
    text: "Sign Out",
    type: "button",
    propClass: "button--link-warning",
    onClick: () => {
      AuthController.logout();
    },
  }

const buttonBackProps = {
  onClick: () => {
    console.log("go back");
  },
};

const linkChangePasswordProps = {
  text: "Change password",
  to: ROUTE.CHANGE_PASSWORD,
};

export class ProfilePageBase extends Block {
  init() {
    console.log("this", this.props);

    this.children.formInputs = formInputsProps.map((props) => {
      return new FormSettingsInput({ ...props, value: this.props[props.name] });
    });

    this.children.buttonSignOut =  new ButtonCommon(buttonSignOutProps)
    

    this.children.saveChangesButton = new ButtonCommon({
      text: "Save changes",
      type: "submit",
      propClass: "button--primary",
      onClick: () => {
        this.onSubmit();
      },
    });

    this.children.linkChangePassword = new Link(linkChangePasswordProps);

    this.children.buttonBack = new ButtonBack(buttonBackProps);
  }

  onSubmit() {
    console.log(this.children.formInputs);
    const data = handleFormSubmit(this.children.formInputs);
    console.log(data)

    UsersController.updateProfileData(data as ProfileData);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfilePage = withUser(ProfilePageBase);
