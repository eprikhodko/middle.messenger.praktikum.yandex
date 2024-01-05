import Block from "../../utils/Block";
import template from "./ButtonArrow.hbs";
import "./ButtonArrow.css";

interface Props {
  type?: "submit" | "button";
  propClass?: string,
  onClick?: () => void;
  events?: {
    click: () => void;
  };
}

export class ButtonArrow extends Block {
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
