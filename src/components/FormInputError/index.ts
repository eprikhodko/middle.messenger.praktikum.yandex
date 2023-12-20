import Block from "../../utils/Block";
import template from "./FormInputError.hbs";
import "./FormInputError.css";

interface Props {
  text: string;
  id: string;
  propClass?: string;
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

export class FormInputError extends Block {
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
