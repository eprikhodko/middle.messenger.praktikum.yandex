import Block from "../../utils/Block";
import template from "./chat.hbs";
import "./chat.css";
import { InputType, InputName, ValidationPattern } from "../../utils/enums";
import { FormInput } from "../../components/FormInput";
import { ChatListItem } from "../../modules/Chat/components/ChatListItem";
import { ChatAvatar } from "../../modules/Chat/components/ChatAvatar";
import { ButtonArrow } from "../../components/ButtonArrow";
import ChatsController from "../../controllers/ChatsController";
import { ChatsList } from "../../modules/Chat/components/ChatsList";
import { Messenger } from '../../modules/Chat/components/Messenger';

const searchInputProps = {
  type: InputType.SEARCH,
  name: InputName.SEARCH,
  id: "search",
  placeholder: "Search",
  pattern: ValidationPattern.SEARCH,
  inputClassName: "search-form__input",
};

const sendMessageInputProps = {
  type: InputType.TEXT,
  name: InputName.MESSAGE,
  id: "message",
  placeholder: "Message",
  pattern: ValidationPattern.MESSAGE,
  inputClassName: "send-message-form__input",
};

// this is props for the avatar in the chat header
const chatAvatarProps = {
  sizeSmall: true,
  src: "server-response/user/chat-avatar.jpg",
};

const chatListItemsProps = [
  {
    isActive: false,
    chatName: "Chat name",
  },
  {
    isActive: true,
    chatName: "Chat name",
  },
  {
    isActive: false,
    chatName: "Chat name",
  },
  {
    isActive: false,
    chatName: "Chat name",
  },
  {
    isActive: false,
    chatName: "Chat name",
  },
  {
    isActive: false,
    chatName: "Chat name",
  },
];

export class ChatPage extends Block {
  constructor() {
    super({});
  }

  init() {
    // this.children.searchInput = new FormInput(searchInputProps);
    this.children.sendMessageInput = new FormInput(sendMessageInputProps);

    // this.children.chatAvatar = new ChatAvatar(chatAvatarProps);
    this.children.buttonSendMessage = new ButtonArrow({});

    this.children.chatsList = new ChatsList({ isLoaded: false });

    this.children.messenger = new Messenger({});

    ChatsController.fetchChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true
      })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
