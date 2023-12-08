import Block from '../../utils/Block';
import template from "./signin.hbs";
import {render} from "../../utils/render";

// console.log(template)


export class SignInPage extends Block {
  constructor() {
    super({
      type: 'btn',
      label: 'root label',
      onClick: () => {
        console.log("hello from root button")
      },

      signInForm: {
        title: 'Sign In'
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
