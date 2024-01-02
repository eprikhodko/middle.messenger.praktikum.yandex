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
      console.log("add new user");
    },
  },
  {
    text: "Remove user",
    onClick: () => {
      console.log("remove user");
    },
  },
  {
    text: "Delete chat",
    onClick: () => {
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

  closeDropdownMenu() {
    const dropdownMenu = document.querySelector(".dropdown-menu");

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
