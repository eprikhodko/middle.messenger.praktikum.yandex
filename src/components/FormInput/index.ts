import Block from "../../utils/Block";
import template from "./FormInput.hbs";
import "./FormInput.css";
import validateInput from "../../utils/validateInput";
import { InputType, ValidationPattern } from "../../utils/enums";

interface Props {
  type: InputType;
  propClass?: string;
  value?: string;
  id: string;
  pattern?: ValidationPattern;
  placeholder?: string;
  onClick?: () => void;
  events?: {
    click: () => void;
  };
}

export class FormInput extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
        blur: (event: FocusEvent) => this.handleBlur(event, props),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  handleBlur(event: FocusEvent, props: Props) {
    console.log("blur handled")
    const eventTarget = event.target as HTMLInputElement
    if (props.pattern) {
      console.log("pattern present",  validateInput(props.pattern, eventTarget.value, props.id))
      validateInput(props.pattern, eventTarget.value, props.id);
    }
  }
}
