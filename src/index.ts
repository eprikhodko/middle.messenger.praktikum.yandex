import "./main.css";
import "./index.css";

import {HomePage} from './pages/home';
import {Button} from './components/Button';
import {FormCommonLayout} from './components/FormCommonLayout'
import {FormInput} from './components/FormInput'
import {registerComponent} from "./utils/registerComponent";
import {render} from "./utils/render";

registerComponent('Button', Button);
registerComponent('FormCommonLayout', FormCommonLayout);
registerComponent('FormInput', FormInput);

window.addEventListener('DOMContentLoaded', () => {
  render('sign-in')
});

