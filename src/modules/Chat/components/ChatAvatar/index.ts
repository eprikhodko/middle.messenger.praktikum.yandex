import Block from "../../../../utils/Block";
import template from "./ChatAvatar.hbs";
import "./ChatAvatar.css";

interface Props {
  sizeDefault?: boolean;
  sizeSmall?: boolean;
  imgSrc: string;
}

export class ChatAvatar extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
