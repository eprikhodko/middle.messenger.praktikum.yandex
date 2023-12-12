import Block from "../../utils/Block";
import template from "./ChatListItem.hbs";
import "./ChatListItem.css";

interface Props {
  text: string;
  type?: "submit" | "button";
  propClass?: string,
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

export class ChatListItem extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
