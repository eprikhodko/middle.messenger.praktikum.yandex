import template from "./ModalChangeChatAvatar.hbs";
import "./ModalChangeChatAvatar.css";
import { ButtonCommon } from "../../../components/ButtonCommon";
import ChatsController from "../../../controllers/ChatsController";
import { withStore } from "../../../utils/Store";
import store from "../../../utils/Store";
import { ChatUsers } from "../../Chat/components/ChatUsers";
import Block from "../../../utils/Block";
import { ImageUpload } from "../../../components/ImageUpload";

interface Props {
  onClick: () => void;
  events?: {
    click: () => void;
  };
}

export class ModalChangeChatAvatarBase extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      title: "Upload new chat avatar",

      events: {
        click: (event) => {
          if (event.target === event.currentTarget) {
            // if (event.target === this.getContent()) {
            store.set("isModalChangeChatAvatarOpen", false);
          }
        },
      },
    });
  }

  init() {
    this.children.imageUpload = new ImageUpload({
      onSubmit: (event) => {
        this.onFileUpload(event);
      },
    });

    this.children.buttonCreateNewChat = new ButtonCommon({
      text: "Finish",
      type: "button",
      propClass: "button--primary",
      onClick: () => {
        store.set("isModalChangeChatAvatarOpen", false);
      },
    });

    this.children.chatUsers = new ChatUsers({});
  }

  onFileUpload(event) {
    event.preventDefault();

    const form = this.children.imageUpload.getContent();
    const formData = new FormData(form);

    ChatsController.updateChatAvatar(formData, this.props.selectedChat);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const withModalState = withStore((state) => ({
  isOpen: state.isModalChangeChatAvatarOpen,
  selectedChat: state.selectedChat,
}));

export const ModalChangeChatAvatar = withModalState(ModalChangeChatAvatarBase);
