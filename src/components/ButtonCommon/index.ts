import Block from "../../utils/Block";
import template from "./ButtonCommon.hbs";
import "./ButtonCommon.css";

interface Props {
  text: string;
  type?: "submit" | "button";
  propClass?: string;
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

export class ButtonCommon extends Block<Props> {
  constructor(props: Props) {
    // super({
    //   ...props,
    //   // events: {
    //   //   click: props.onClick,
    //   // },
    // });
     super({ type: 'button', ...props });
  }

  // render() {
  //   return this.compile(template, this.props);
  // }
  render() {
    return this.compile(template, { ...this.props });
  }
}
