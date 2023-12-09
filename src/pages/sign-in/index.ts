import Block from "../../utils/Block";
import template from "./sign-in.hbs";
import { render } from "../../utils/render";

export class SignInPage extends Block {
  constructor() {
    super({
      signInForm: {
        title: "Sign In",
      },

      loginInput: {
        type: "text",
        label: "Login",
        id: "login",
      },

      passwordInput: {
        type: "password",
        label: "Password",
        id: "password",
      },

      customButton: {
        label: "CUSTOM BUTTON",
        type: "submit",
        onClick: () => {
          console.log("hello from custom button");
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
