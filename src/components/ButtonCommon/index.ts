import Block from "../../utils/Block";
import template from "./ButtonCommon.hbs";
import "./ButtonCommon.css";

interface Props {
  text: string;
  type?: "submit" | "button";
  propClass?: string,
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

export class ButtonCommon extends Block {
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
