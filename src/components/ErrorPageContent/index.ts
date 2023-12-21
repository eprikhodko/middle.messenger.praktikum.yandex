import Block from "../../utils/Block";
import template from "./ErrorPageContent.hbs";
import "./ErrorPageContent.css";
import { ButtonCommon } from "../ButtonCommon";

interface Props {
  errorCode: number;
  errorText: string;
  onClick?: () => void;
  events: {
    click: () => void;
  };
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
    super({ props }); // this is props from the parent component, we're set them in the 404/500 page components in the errorPageContentProps constant
  }

  init() {
    this.children.buttonBack = new ButtonCommon(buttonBackProps);
    // console.log(this.props); // props from the parent component
  }

  render() {
    return this.compile(template, this.props);
  }
}
