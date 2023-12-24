import Block from "../../utils/Block";
import template from "./ImageUpload.hbs";
import "./ImageUpload.css";

interface Props {
  text?: string;
  type?: "submit" | "button";
  propClass?: string;
  onSubmit: (event) => void;
  events?: {
    submit: (event) => void;
  };
}

export class ImageUpload extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        submit: props.onSubmit,
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
