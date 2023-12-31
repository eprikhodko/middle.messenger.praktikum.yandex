import Block from "../../utils/Block";
import template from "./chat.hbs";
import "./chat.css";
import { ROUTE } from "../../utils/enums";
import ChatsController from "../../controllers/ChatsController";
import { ChatsList } from "../../modules/Chat/components/ChatsList";
import { Messenger } from "../../modules/Chat/components/Messenger";
import { ButtonCommon } from "../../components/ButtonCommon";
import { ModalCreateNewChat } from "../../modules/Modal/ModalCreateNewChat";
import { ButtonOpenChatMenu } from "../../modules/Chat/components/ButtonOpenChatMenu";
import store from "../../utils/Store";
import { ChatHeader } from "../../modules/Chat/components/ChatHeader";
import { ModalAddUserToChat } from "../../modules/Modal/ModalAddUserToChat";
import { ModalRemoveUserFromChat } from "../../modules/Modal/ModalRemoveUserFromChat";
import { ModalChangeChatAvatar } from "../../modules/Modal/ModalChangeChatAvatar";
import { ChatFooter } from "../../modules/Chat/components/ChatFooter";
import { Link } from "../../components/Link";

const linkProfileProps = {
  text: "Profile",
  to: ROUTE.SETTINGS,
  styles: "button button-link",
};

export class ChatPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.chatHeader = new ChatHeader({});
    this.children.buttonOpenChatMenu = new ButtonOpenChatMenu();

    this.children.linkProfile = new Link(linkProfileProps);

    this.children.buttonCreateNewChat = new ButtonCommon({
      text: "Create new chat",
      type: "button",
      propClass: "button--primary",
      onClick: () => {
        this.openModalCreateNewChat();
      },
    });

    this.children.modalCreateNewChat = new ModalCreateNewChat({});
    this.children.modalAddUserToChat = new ModalAddUserToChat({});
    this.children.modalRemoveUserFromChat = new ModalRemoveUserFromChat({});
    this.children.modalChangeChatAvatar = new ModalChangeChatAvatar({});
    this.children.chatFooter = new ChatFooter({});

    this.children.chatsList = new ChatsList({ isLoaded: false });

    this.children.messenger = new Messenger({});

    ChatsController.fetchChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true,
      });
    });
  }

  openModalCreateNewChat() {
    store.set("isModalCreateNewChatOpen", true);
  }

  deleteChat = () => {
    const selectedChatId = store.getSelectedChatId();
    if (selectedChatId) {
      ChatsController.delete(selectedChatId);
    }
  };

  render() {
    return this.compile(template, this.props);
  }
}
