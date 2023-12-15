import Block from "../../utils/Block";
import template from "./ErrorPageContent.hbs";
import "./ErrorPageContent.css";

interface Props {
  errorCode: number;
  errorText: string;
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

export class ErrorPageContent extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },

      buttonGoBack: {
        text: "Go back to chats",
        type: "button",
        propClass: "button--primary",
        onClick: () => {
          console.log("clicked")
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
