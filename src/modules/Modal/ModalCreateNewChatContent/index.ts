import Block from "../../../utils/Block";
import template from "./ModalCreateNewChatContent.hbs";
import "./ModalCreateNewChatContent.css";

interface Props {
  text: string;
  type?: "submit" | "button";
  propClass?: string;
  onClick: () => void;
  events?: {
    click: () => void;
  };
}

export class ModalCreateNewChatContent extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
