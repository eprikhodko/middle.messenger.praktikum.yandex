import template from "./ChatHeader.hbs";
import "./ChatHeader.css";
import Block from "../../../../utils/Block";
import { ButtonOpenChatMenu } from "../ButtonOpenChatMenu";
import { withStore } from "../../../../utils/Store";
import { DropdownMenu } from "../DropdownMenu";

interface Props {
  selectedChat: number | undefined;
}

export class ChatHeaderBase extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  init() {
    this.children.buttonOpenChatMenu = new ButtonOpenChatMenu({});
    this.children.dropdownMenu = new DropdownMenu({})

    // this.children.searchInput = new FormInput(searchInputProps);

    // this.children.chatAvatar = new ChatAvatar(chatAvatarProps);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      // messages: [],
      selectedChat: undefined,
      // userId: state.user.id
    };
  }

  return {
    // messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    // userId: state.user.id
  };
});

export const ChatHeader = withSelectedChatMessages(ChatHeaderBase);
