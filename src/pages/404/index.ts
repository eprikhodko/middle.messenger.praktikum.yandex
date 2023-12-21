import Block from "../../utils/Block";
import template from "./404.hbs";
import { ErrorPageContent } from "../../components/ErrorPageContent";

const errorPageContentProps = {
  errorCode: "404",
  errorText: "Page not found",
};

export class Error404Page extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.errorPageContent = new ErrorPageContent(
      errorPageContentProps
    );

    console.log(this.children)
  }

  render() {
    return this.compile(template, this.props);
  }
}
