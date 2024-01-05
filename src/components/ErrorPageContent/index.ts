import Block from "../../utils/Block";
import template from "./ErrorPageContent.hbs";
import "./ErrorPageContent.css";
import { ButtonCommon } from "../ButtonCommon";

interface Props {
  errorCode: string;
  errorText: string;
}

const buttonBackProps = {
  text: "Go back to chats",
  propClass: "button--primary",
  onClick: () => {
    console.log("go back to chats");
  },
};

export class ErrorPageContent extends Block {
  constructor(props: Props) {
    super({ props });
  }

  init() {
    this.children.buttonBack = new ButtonCommon(buttonBackProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
