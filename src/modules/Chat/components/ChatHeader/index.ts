import template from "./ChatHeader.hbs";
import "./ChatHeader.css";
import Block from "../../../../utils/Block";
import { ButtonOpenChatMenu } from "../ButtonOpenChatMenu";
import { withStore } from "../../../../utils/Store";
import { DropdownMenu } from "../DropdownMenu";
import { ChatAvatar } from "../ChatAvatar";

interface Props {
  selectedChat: number | undefined;
}

export class ChatHeaderBase extends Block<Props> {
  constructor(props: Props) {
    super({ ...props });
  }

  init() {
    this.children.buttonOpenChatMenu = new ButtonOpenChatMenu({});
    this.children.dropdownMenu = new DropdownMenu({});

    // this.children.searchInput = new FormInput(searchInputProps);
  }

  render() {
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

export const ChatHeader = withSelectedChatMessages(ChatHeaderBase);
