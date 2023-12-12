import Block from "../../utils/Block";
import template from "./chat.hbs";
import "./chat.css";
import { render } from "../../utils/render";
import {
  InputType,
  InputName,
  ValidationPattern,
  ErrorMessage,
} from "../../utils/enums";

export class ChatPage extends Block {
  constructor() {
    super({
      signUpForm: {
        title: "Sign Up",
      },

      searchInput: {
        type: InputType.SEARCH,
        name: InputName.SEARCH,
        id: "search",
        placeholder: "Search",
        pattern: ValidationPattern.SEARCH,
      },

      sendMessageInput: {
        type: InputType.TEXT,
        name: InputName.MESSAGE,
        id: "message",
        placeholder: "Message",
        pattern: ValidationPattern.MESSAGE,
      },

      chatListItems: [
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
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
