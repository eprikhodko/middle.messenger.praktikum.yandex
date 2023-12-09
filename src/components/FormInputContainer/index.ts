import Block from "../../utils/Block";
import template from "./FormInputContainer.hbs";
import "./FormInputContainer.css";

interface Props {
  label: string;
  for: string;
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

export class FormInputContainer extends Block {
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
