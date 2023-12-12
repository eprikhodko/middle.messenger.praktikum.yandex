import Block from "../../utils/Block";
import template from "./500.hbs";
import "./500.css";

export class Error500Page extends Block {
  constructor() {
    super({
      errorCode: "500",
      errorText: "We're already fixing it",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
