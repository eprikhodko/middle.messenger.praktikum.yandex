import Block from "../../../../utils/Block";
import template from "./Messenger.hbs";
import "./Messenger.css"
import { Message } from "../Message";
import { Message as MessageInfo } from "../../../../controllers/MessagesController";
import { withStore } from "../../../../utils/Store";

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
    console.log("Messenger init called"); // Debugging line
    this.children.messages = this.createMessages(this.props);

    this.setAfterRenderCallback(this.scrollToBottom);
  }

  private scrollToBottom() {
    console.log("scrollToBottom call context:", this); // Debugging line
    const element = document.getElementById("chat-messages-container");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }

  protected componentDidUpdate(
    oldProps: MessengerProps,
    newProps: MessengerProps
  ): boolean {
    this.children.messages = this.createMessages(newProps);

    console.log("Messenger did update");

    return true;
  }

  private createMessages(props: MessengerProps) {
    return props.messages.map((data) => {
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
