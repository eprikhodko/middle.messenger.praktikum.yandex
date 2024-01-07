import Block from "../../../../utils/Block";
import template from "./SendMessageForm.hbs";
import "./SendMessageForm.css";
import { FormInput } from "../../../../components/FormInput";
import {
  InputName,
  InputType,
  ValidationPattern,
} from "../../../../utils/enums";
import { ButtonArrow } from "../../../../components/ButtonArrow";
import MessagesController from "../../../../controllers/MessagesController";

interface Props {
  selectedChat: number | undefined;
  events?: {
    submit: (event: SubmitEvent) => void;
  };
}

const sendMessageInputProps = {
  type: InputType.TEXT,
  name: InputName.MESSAGE,
  id: "message",
  placeholder: "Message",
  pattern: ValidationPattern.MESSAGE,
  inputClassName: "send-message-form__input",
};

export class SendMessageForm extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        submit: (event: SubmitEvent) => {
          this.sendMessage(event);
        },
      },
    });
  }

  protected init() {
    this.children.sendMessageInput = new FormInput(sendMessageInputProps);
    this.children.buttonSendMessage = new ButtonArrow({
      type: "submit",
    });
  }

  sendMessage(event: SubmitEvent) {
    event.preventDefault();
    const input = this.children.sendMessageInput as FormInput;
    const message = input.getValue();

    input.setValue("");

    if (message) {
      MessagesController.sendMessage(this.props.selectedChat!, message);
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
