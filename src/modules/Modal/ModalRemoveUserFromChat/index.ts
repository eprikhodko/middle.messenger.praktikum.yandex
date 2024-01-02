import template from "./ModalRemoveUserFromChat.hbs";
import "./ModalRemoveUserFromChat.css";
import { ButtonCommon } from "../../../components/ButtonCommon";
import { FormCommonInput } from "../../../components/FormCommonInput";
import { InputName, InputType, ValidationPattern } from "../../../utils/enums";
import handleFormSubmit from "../../../utils/handleFormSubmit";
import ChatsController from "../../../controllers/ChatsController";
import { withStore } from "../../../utils/Store";
import store from "../../../utils/Store";
import { DropdownMenuButton } from "../../Chat/components/DropdownMenuButton";
import { ChatUsers } from "../../Chat/components/ChatUsers";
import Block from "../../../utils/Block";

interface Props {
  onClick: () => void;
  events?: {
    click: () => void;
  };
}

export class ModalRemoveUserFromChatBase extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      title: "Enter user ID",

      events: {
        click: (event) => {
          if (event.target === event.currentTarget) {
            // if (event.target === this.getContent()) {
            store.set("isModalRemoveUserFromChatOpen", false)
          }
        },
      },
    });
  }

  init() {
    this.children.chatNameInput = new FormCommonInput({
      type: InputType.TEXT,
      name: InputName.USERID,
      label: "User ID",
      id: "user_id_to_remove",
      inputClassName: "form-common__input",
    });

    this.children.buttonCreateNewChat = new ButtonCommon({
      text: "Remove user from chat",
      type: "button",
      propClass: "button--primary",
      onClick: () => {
        this.onSubmit();
      },
    });

    // const test = this.props.selectedChat || this.props

    const avatarSrc = this.props.selectedChat
      ? this.props.selectedChat
      : "/avatar-placeholder.svg";

    this.children.chatUsers = new ChatUsers({ text: avatarSrc });

    // this.children.chatUsers = new ChatUsers({text: "test"})

    console.log("HELLO", this.children)
  }

  

  onSubmit() {
    const data = handleFormSubmit(this.children.chatNameInput);
    console.log("DATA", data);

    console.log("REMOVE USER SUBMIT", data.user_id, this.props.selectedChat);

    // ChatsController.addUserToChat(this.props.selectedChat, data.user_id);

    store.set("isModalRemoveUserFromChatOpen", false); // close modal after we remove user
  }

  render() {
    console.log("DEBUG, ModalRemoveUserFromChat", this.props, this.children.chatUsers);
    return this.compile(template, { ...this.props });
  }
}

// const withModalState = withStore((state) => ({chats: [...(state.chats || [])]}));
const withModalState = withStore((state) => ({
  isOpen: state.isModalRemoveUserFromChatOpen,
  selectedChat: state.selectedChat,
}));
// const withModalState = withStore((state) => {
//   console.log("STATE",state)
//   } )

export const ModalRemoveUserFromChat = withModalState(ModalRemoveUserFromChatBase);
