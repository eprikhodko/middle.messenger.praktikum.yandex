import Block from "../../utils/Block";
import template from "./FormCommonInput.hbs";
import "./FormCommonInput.css";
import validateInput from "../../utils/validateInput";
import { InputType, ValidationPattern } from "../../utils/enums";
import { FormInput } from "../../components/FormInput";
import { FormInputError } from "../../components/FormInputError";
import { ButtonCommon } from "../../components/ButtonCommon";


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

export class FormCommonInput extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
        blur: (event: FocusEvent) => this.handleBlur(event, props),
      },
    });
  }

  init() {
    console.log("debug, PROPS", this.props)
    this.children.formInput = new FormInput(this.props);
    this.children.inputError = new FormInputError(this.props);

    this.children.ButtonCommon = new ButtonCommon({
      text: "Войти",
      events: {
        click: () => console.log("button click"),
      },
    });

    // this.children.FormInputError = new FormInputError({
    //   text: "Войти",
    //   for: "test",
    //   events: {
    //     click: () => console.log("button click"),
    //   },
    // });
  }

  render() {
    console.log("hello");
    return this.compile(template, { ...this.props });
  }

  handleBlur(event: FocusEvent, props: Props) {
    console.log("handled");
    const eventTarget = event.target as HTMLInputElement;
    if (props.pattern) {
      validateInput(props.pattern, eventTarget.value, props.id);
    }
  }
}
