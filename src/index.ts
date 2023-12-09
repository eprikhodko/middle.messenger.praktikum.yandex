import "./main.css";
import "./index.css";

import { HomePage } from "./pages/home";
import { Button } from "./components/Button";
import { ButtonCommon } from "./components/ButtonCommon";
import { FormCommonLayout } from "./components/FormCommonLayout";
import { FormInput } from "./components/FormInput";
import { FormInputContainer } from "./components/FormInputContainer";
import { registerComponent } from "./utils/registerComponent";
import { render } from "./utils/render";

registerComponent("Button", Button);
registerComponent("ButtonCommon", ButtonCommon);
registerComponent("FormCommonLayout", FormCommonLayout);
registerComponent("FormInput", FormInput);
registerComponent("FormInputContainer", FormInputContainer);

window.addEventListener("DOMContentLoaded", () => {
  render("sign-in");
});
