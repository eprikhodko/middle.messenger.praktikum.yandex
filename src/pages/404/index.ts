import Block from "../../utils/Block";
import template from "./404.hbs";

export class Error404Page extends Block {
  constructor() {
    super({
      errorCode: "404",
      errorText: "Page not found",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
