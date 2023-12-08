import "./main.css";
import "./index.css";

import {HomePage} from './pages/home';
import {Button} from './components/Button';
import {registerComponent} from "./utils/registerComponent";
import Card from "./components/Card";
import {render} from "./utils/render";

registerComponent('Button', Button);
registerComponent('Card', Card);

window.addEventListener('DOMContentLoaded', () => {
  render('home')
});

