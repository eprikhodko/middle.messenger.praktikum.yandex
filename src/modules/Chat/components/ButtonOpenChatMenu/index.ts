import Block from "../../../../utils/Block";
import template from "./ButtonOpenChatMenu.hbs";
import "./ButtonOpenChatMenu.css";

interface Props {
  onClick: () => void;
  events: {
    mouseenter: () => void;
  };
}

export class ButtonOpenChatMenu extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        mouseenter: () => {
          this.openDropdownMenu();
        },
      },
    });
  }

  openDropdownMenu() {
    const dropdownMenu = document.querySelector(".dropdown-menu");

    if (dropdownMenu) {
      dropdownMenu.classList.toggle("dropdown-menu--visible", true);
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
