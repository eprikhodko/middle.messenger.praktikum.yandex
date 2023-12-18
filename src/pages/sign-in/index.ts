import Block from "../../utils/Block";
import template from "./sign-in.hbs";
import { ButtonCommon } from "../../components/ButtonCommon";
import "./sign-in.css";

export class SignInPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.button = new ButtonCommon({
      text: 'Войти',
      events: {
        click: () => console.log("button click")
      },
    });
    this.children.ButtonCommon = new ButtonCommon({
      text: 'Войти',
      events: {
        click: () => console.log("button click")
      },
    });
  }

  render() {
    console.log("this.compile", this.compile(template, {...this.props}))
    console.log("this.compile, this.props", {...this.props})
    // return this.compile(template, this.props);
    return this.compile(template, {...this.props});
  }
}
