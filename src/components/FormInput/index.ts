import Block from "../../utils/Block";
import template from "./FormInput.hbs";
import "./FormInput.css";
import validateInput from "../../utils/validateInput";
import { InputType, ValidationPattern } from "../../utils/enums";

interface Props {
  type: InputType;
  propClass: string;
  value?: string;
  id: string;
  pattern: ValidationPattern;
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

export class FormInput extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
        blur: (event) => this.handleBlur(event, props),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  handleBlur(event, props) {
    const inputValue = event.target.value;
    validateInput(props.pattern, inputValue, props.id);
  }
}
