import Block from "../../../../utils/Block";
import template from "./ButtonOpenChatMenu.hbs";
import "./ButtonOpenChatMenu.css";

export class ButtonOpenChatMenu extends Block {
  constructor() {
    super({
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
