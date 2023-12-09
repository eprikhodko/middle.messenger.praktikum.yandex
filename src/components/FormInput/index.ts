import Block from '../../utils/Block';
import template from './FormInput.hbs';
import "./FormInput.css"

interface Props {
  label: string;
  type: 'submit' | 'button',
  id: string;
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
        click: props.onClick
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
