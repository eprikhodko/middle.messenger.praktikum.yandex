import template from "./DropdownMenuButton.hbs";
import "./DropdownMenuButton.css";
import Block from "../../../../utils/Block";

interface Props {
  text: string;
  onClick: () => void;
  events?: {
    click: () => void;
  };
}

export class DropdownMenuButton extends Block<Props> {
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
