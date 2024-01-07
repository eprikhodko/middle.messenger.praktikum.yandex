import Block from "../../utils/Block";
import template from "./ErrorPageContent.hbs";
import "./ErrorPageContent.css";
import { Link } from "../Link";
import { ROUTE } from "../../utils/enums";

interface Props {
  errorCode: string;
  errorText: string;
}

const linkProfileProps = {
  text: "Go back to chats",
  to: ROUTE.MESSENGER,
  styles: "button button-link button--primary",
};

export class ErrorPageContent extends Block {
  constructor(props: Props) {
    super({ props });
  }

  init() {
    this.children.linkToMessenger = new Link(linkProfileProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
