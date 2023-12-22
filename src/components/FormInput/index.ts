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

  public setValue(value: string) {
    return ((this.element as HTMLInputElement).value = value);
  }

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, this.props);
  }

  handleBlur(event: FocusEvent, props: Props) {
    const eventTarget = event.target as HTMLInputElement;
    if (props.pattern) {
      validateInput(props.pattern, eventTarget.value, props.id);
    }
  }
}
