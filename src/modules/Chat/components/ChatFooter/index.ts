import Block from "../../../../utils/Block";
import template from "./ChatFooter.hbs";
import { withStore } from "../../../../utils/Store";
import { SendMessageForm } from "../SendMessageForm";

interface Props {
  selectedChat: number | undefined;
}

class ChatFooterBase extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected init() {
    this.children.sendMessageForm = new SendMessageForm(this.props);
  }

  protected componentDidUpdate(_oldProps: {}, newProps: Props): boolean {
    const sendMessageFormBlock = this.children.sendMessageForm;
    if (!Array.isArray(sendMessageFormBlock)) {
      sendMessageFormBlock.setProps(newProps);
    }

    return false;
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      selectedChat: undefined,
    };
  }

  return {
    selectedChat: state.selectedChat,
  };
});

export const ChatFooter = withSelectedChatMessages(ChatFooterBase);
