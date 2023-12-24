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

  // init() {
  //   console.log("DEBUG", this.element)
  // }

  render() {
    // console.log("DEBUG", this.getContent())
    return this.compile(template, { ...this.props });
  }
}
