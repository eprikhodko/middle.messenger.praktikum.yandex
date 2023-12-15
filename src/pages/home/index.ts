import Block from "../../utils/Block";
import template from "./home.hbs";
import { ROUTE } from "../../utils/render";

export class HomePage extends Block {
  constructor() {
    super({
      buttonLinks: [
        {
          text: "Sign in",
          to: ROUTE.SIGN_IN,
        },
        {
          text: "Sign up",
          to: ROUTE.SIGN_UP,
        },
        {
          text: "Chat",
          to: ROUTE.CHAT,
        },
        {
          text: "Profile",
          to: ROUTE.PROFILE,
        },
        {
          text: "Change password",
          to: ROUTE.CHANGE_PASSWORD,
        },
        {
          text: "404 page",
          to: ROUTE.ERROR_404,
        },
        {
          text: "500 page",
          to: ROUTE.ERROR_500,
        },
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
