import template from "./ChatUsersPlaceholder.hbs";
import "./ChatUsersPlaceholder.css";
import Block from "../../../../utils/Block";
// import { withStore } from "../../../../utils/Store";

interface Props {
  text: string;
  onClick: () => void;
  events?: {
    click: () => void;
  };
}

export class ChatUsersPlaceholder extends Block<Props> {
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


