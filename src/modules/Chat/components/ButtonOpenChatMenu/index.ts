import Block from "../../../../utils/Block";
import template from "./ButtonOpenChatMenu.hbs";
import "./ButtonOpenChatMenu.css";

interface Props {
  onClick: () => void;
  events: {
    click: () => void;
  };
}

export class ButtonOpenChatMenu extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        // click: props.onClick,
        click: () => {console.log("open chat menu")}, 
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
