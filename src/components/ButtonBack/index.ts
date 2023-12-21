import Block from "../../utils/Block";
import template from "./ButtonBack.hbs";
import "./ButtonBack.css";

interface Props {
  text: string;
  type?: "submit" | "button";
  propClass?: string;
  onClick: () => void;
  events: {
    click: () => void;
  };
}

export class ButtonBack extends Block<Props> {
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
