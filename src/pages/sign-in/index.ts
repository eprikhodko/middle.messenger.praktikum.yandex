import Block from "../../utils/Block";
import template from "./sign-in.hbs";
import { ButtonCommon } from "../../components/ButtonCommon";
import { FormInput } from "../../components/FormInput";
import { FormCommonInput } from "../../components/FormCommonInput";
// import { FormInputContainer } from "../../components/FormInputContainer";
// import { FormInputError } from "../../components/FormInputError";


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
  },
  {
    type: InputType.PASSWORD,
    name: InputName.PASSWORD,
    label: "Password",
    id: "password",
    pattern: ValidationPattern.PASSWORD,
    errorText: ErrorMessage.PASSWORD,
  },
]

export class SignInPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.formInputs = formInputs.map(input => {
      return new FormCommonInput(input);
    });

    console.log(this.children.formInputs)

    const buttonsArr = [1, 2, 3];
    // this.children.button = new ButtonCommon({
    //   text: "Войти",
    //   events: {
    //     click: () => console.log("button click"),
    //   },
    // });
    const buttons = buttonsArr.map((item, index) => {
      return new ButtonCommon({
        text: `Login ${index}`,
        events: {
          click: () => console.log(`click: ${index}`),
        },
      });
    });

    console.log("buttons", buttons)

    this.children.Buttons = buttons

    this.children.ButtonCommon = new ButtonCommon({
      text: "Войти",
      events: {
        click: () => console.log("button click"),
      },
    });

    // this.children.FormInputContainer = new FormInputContainer({
    //   label: "Войти",
    //   for: "test",
    //   events: {
    //     click: () => console.log("button click"),
    //   },
    // });

    // this.children.FormInputError = new FormInputError({
    //   text: "Войти",
    //   for: "test",
    //   events: {
    //     click: () => console.log("button click"),
    //   },
    // });
  }

  render() {
    console.log("this.compile", this.compile(template, { ...this.props }));
    console.log("this.compile, this.props", { ...this.props });
    // return this.compile(template, this.props);
    return this.compile(template, { ...this.props });
  }
}
