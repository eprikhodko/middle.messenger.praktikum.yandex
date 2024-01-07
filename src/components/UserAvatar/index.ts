import Block from "../../utils/Block";
import template from "./UserAvatar.hbs";
import "./UserAvatar.css";

interface Props {
  imgSrc: string;
  onClick?: () => void;
  events?: {
    click?: () => void;
  };
}

export class UserAvatar extends Block<Props> {
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
