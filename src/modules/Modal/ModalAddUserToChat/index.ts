import template from "./ModalAddUserToChat.hbs";
import "./ModalAddUserToChat.css";
import { ModalBase } from "../ModalBase";
import { ButtonCommon } from "../../../components/ButtonCommon";
import { FormCommonInput } from "../../../components/FormCommonInput";
import { InputName, InputType, ValidationPattern } from "../../../utils/enums";
import handleFormSubmit from "../../../utils/handleFormSubmit";
import ChatsController from "../../../controllers/ChatsController";
import { withStore } from "../../../utils/Store";
import store from "../../../utils/Store";

interface Props {
  onClick: () => void;
  events?: {
    click: () => void;
  };
}

export class ModalAddUserToChatBase extends ModalBase<Props> {
  constructor(props: Props) {
    super({
      ...props,
      title: "Enter user ID",
    });
  }

  init() {
    this.children.chatNameInput = new FormCommonInput({
      type: InputType.TEXT,
      name: InputName.USERID,
      label: "User ID",
      id: "user_id",
      inputClassName: "form-common__input",
    });

    this.children.buttonCreateNewChat = new ButtonCommon({
      text: "Add user to the chat",
      type: "button",
      propClass: "button--primary",
      onClick: () => {
        this.onSubmit();
      },
    });
  }

  onSubmit() {
    const data = handleFormSubmit(this.children.chatNameInput);
    console.log("DATA", data);

    console.log("ADD USER SUBMIT", data.user_id, this.props.selectedChat);

    ChatsController.addUserToChat(this.props.selectedChat, data.user_id);

    store.set("isModalAddUserToChatOpen", false); // close modal after we add new user
  }

  render() {
    console.log("DEBUG, ModalAddUserToChat", this.props);
    return this.compile(template, { ...this.props });
  }
}

// const withModalState = withStore((state) => ({chats: [...(state.chats || [])]}));
const withModalState = withStore((state) => ({
  isOpen: state.isModalAddUserToChatOpen,
  selectedChat: state.selectedChat,
}));
// const withModalState = withStore((state) => {
//   console.log("STATE",state)
//   } )

export const ModalAddUserToChat = withModalState(ModalAddUserToChatBase);
