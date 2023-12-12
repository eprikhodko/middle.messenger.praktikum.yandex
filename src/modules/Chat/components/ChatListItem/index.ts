import Block from "../../../../utils/Block";
import template from "./ChatListItem.hbs";
import "./ChatListItem.css";

interface Props {
  chatName: string;
  isActive: boolean;
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
