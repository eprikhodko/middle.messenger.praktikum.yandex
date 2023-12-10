import Block from "../../utils/Block";
import template from "./sign-in.hbs";
import { render } from "../../utils/render";
import { InputType, ValidationPattern } from "../../utils/enums";
import "./sign-in.css"

export class SignInPage extends Block {
  constructor() {
    super({
      signInForm: {
        title: "Sign In",
      },

      loginInput: {
        type: InputType.TEXT,
        label: "Login",
        id: "login",
        pattern: ValidationPattern.LOGIN,
        errorText: "incorrect login"
      },

      passwordInput: {
        type: InputType.PASSWORD,
        label: "Password",
        id: "password",
        pattern: ValidationPattern.PASSWORD,
        errorText: "incorrect password"
      },

      buttonSignIn: {
        text: "Sign in",
        type: "submit",
        class: "button--primary",
        onClick: () => {
          console.log("submit");
        },
      },

      buttonSignUp: {
        text: "Sign up",
        type: "button",
        class: "button--link-primary",
        onClick: () => {
          render("login");
        },
      },

      buttons: [
        {
          label: "Login",
          type: "sub",
          onClick: () => {
            render("login");
            console.log("render login page");
          },
        },
        {
          label: "Button 2",
          type: "some-type",
        },
        {
          label: "Button 3",
        },
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
