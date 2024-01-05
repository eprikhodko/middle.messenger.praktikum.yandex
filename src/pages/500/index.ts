import Block from "../../utils/Block";
import template from "./500.hbs";
import { ErrorPageContent } from "../../components/ErrorPageContent";

const errorPageContentProps = {
  errorCode: "500",
  errorText: "We're already fixing it",
};

export class Error500Page extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.errorPageContent = new ErrorPageContent(
      errorPageContentProps
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
