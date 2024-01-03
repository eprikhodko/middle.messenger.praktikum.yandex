import Block from "../../../../utils/Block";
import template from "./Messenger.hbs";
import { Message } from "../Message";
import { Input } from "../Input";
import { Button } from "../../../../components/Button";
import MessagesController, {
  Message as MessageInfo,
} from "../../../../controllers/MessagesController";
import { withStore } from "../../../../utils/Store";
import { FormInput } from "../../../../components/FormInput";
import { ButtonArrow } from "../../../../components/ButtonArrow";
import {
  InputName,
  InputType,
  ValidationPattern,
} from "../../../../utils/enums";

interface MessengerProps {
  selectedChat: number | undefined;
  messages: MessageInfo[];
  userId: number;
}

const sendMessageInputProps = {
  type: InputType.TEXT,
  name: InputName.MESSAGE,
  id: "message",
  placeholder: "Message",
  pattern: ValidationPattern.MESSAGE,
  inputClassName: "send-message-form__input",
};

class MessengerBase extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super(props);
  }
  protected init() {
    // console.log("PROPS FROM MESSENGER", this)
    this.children.messages = this.createMessages(this.props);
    console.log("DEBUG, this.children", this.children);

    this.children.sendMessageInput = new FormInput(sendMessageInputProps);
    this.children.buttonSendMessage = new ButtonArrow({
      type: "button",
      onClick: () => {
        const input = this.children.sendMessageInput as FormInput;
        const message = input.getValue();

        input.setValue("");

        if (message) {
          MessagesController.sendMessage(this.props.selectedChat!, message);
        }
      },
    });

    // this.children.input = new Input({
    //   type: "text",
    //   placeholder: "Сообщение",
    //   name: "message",
    // });

    // this.children.button = new Button({
    //   label: "Отправить",
    //   type: "button",
    //   events: {
    //     click: () => {
    //       const input = this.children.input as Input;
    //       const message = input.getValue();

    //       input.setValue("");

    //       MessagesController.sendMessage(this.props.selectedChat!, message);
    //     },
    //   },
    // });
  }

  protected componentDidUpdate(
    oldProps: MessengerProps,
    newProps: MessengerProps
  ): boolean {
    this.children.messages = this.createMessages(newProps);

    return true;
  }

  private createMessages(props: MessengerProps) {
    return props.messages.map((data) => {
      // console.log("DEBUG", data)
      // console.log("DEBUG, Message components", new Message({...data, isMine: props.userId === data.user_id }))
      return new Message({ ...data, isMine: props.userId === data.user_id });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
  };
});

export const Messenger = withSelectedChatMessages(MessengerBase);
