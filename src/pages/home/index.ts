import Block from '../../utils/Block';
import template from "./home.hbs";
import {render} from "../../utils/render";

export class HomePage extends Block {
  constructor() {
    super({
      type: 'btn',
      label: 'root label',
      onClick: () => {
        render('sign-in');
        console.log("hello from root button")
      },

      customButton: {
        label: 'CUSTOM BUTTON',
        type: 'submit',
        onClick: () => {
            console.log("hello from custom button")
          }
        }, 

      buttons: [
        {
          label: 'Login', 
          type: 'sub',
          onClick: () => {
            render('login');
            console.log("render login page")
          }
        },
        {
          label: 'Button 2',
          type: 'some-type'
        },
        {
          label: 'Button 3',
        },
      ]
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
