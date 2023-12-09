import Block from '../../utils/Block';
import template from './FormInput.hbs';
import "./FormInput.css"
import { InputType } from '../../utils/enums';

interface Props {
  label: string;
  type: InputType,
  id: string;
  onClick?: () => void;
  // onInputBlur?: (event: Event) => void;
  events: {
    click: () => void;
    // blur?: (event: Event) => void;
  };
}

export class FormInput extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
        // blur: props.onInputBlur
        blur: (event) => this.handleBlur(event)
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  handleBlur(event) {
    // Validation logic goes here
    console.log("testing blur event")
  }
}
