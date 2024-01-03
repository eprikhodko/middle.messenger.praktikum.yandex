import Block from "../../../../utils/Block";
import template from "./DropdownMenu.hbs";
import "./DropdownMenu.css";
import { DropdownMenuButton } from "../DropdownMenuButton";
import ChatsController from "../../../../controllers/ChatsController";
import store from "../../../../utils/Store";

interface Props {
  events: {
    mouseleave: () => void;
  };
}

const getDropdownMenuButtonsProps = (context) => [
  {
    text: "Add user",
    onClick: () => {
      context.closeDropdownMenu();
      context.openModalAddUserToChat();
    },
  },
  {
    text: "Remove user",
    onClick: () => {
      context.closeDropdownMenu();
      context.openModalRemoveUserFromChat();
    },
  },
  {
    text: "Change chat avatar",
    onClick: () => {
      context.closeDropdownMenu();
      context.openModalRemoveUserFromChat();
    },
  },
  {
    text: "Delete chat",
    onClick: () => {
      context.closeDropdownMenu();
      context.deleteChat();
    },
  },
];

export class DropdownMenu extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        mouseleave: () => {
          this.closeDropdownMenu();
        },
      },
    });
  }

  init() {
    this.children.dropdownMenuButtons = this.createDropdownMenuButtons(
      getDropdownMenuButtonsProps(this)
    );
  }

  openModalAddUserToChat() {
    store.set("isModalAddUserToChatOpen", true);
  }

  openModalRemoveUserFromChat() {
    store.set("isModalRemoveUserFromChatOpen", true);
  }

  closeDropdownMenu() {
    // const dropdownMenu = document.querySelector(".dropdown-menu");
    const dropdownMenu = this.getContent();

    if (dropdownMenu) {
      dropdownMenu.classList.toggle("dropdown-menu--visible", false);
    }
  }

  private createDropdownMenuButtons(buttonsProps) {
    return buttonsProps.map((props) => {
      return new DropdownMenuButton({
        ...props,
        events: {
          click: () => {
            props.onClick;
          },
        },
      });
    });
  }

  deleteChat = () => {
    const selectedChatId = store.getSelectedChatId();
    if (selectedChatId) {
      ChatsController.delete(selectedChatId);
    }
  };

  render() {
    return this.compile(template, { ...this.props });
  }
}
