import "./main.css";
import "./index.css";

import { HomePage } from "./pages/home";
import { Button } from "./components/Button";
import { ButtonCommon } from "./components/ButtonCommon";
import { FormAuthLayout } from "./components/FormAuthLayout";
import { FormInput } from "./components/FormInput";
import { FormInputError } from "./components/FormInputError";
import { FormInputContainer } from "./components/FormInputContainer";
import { registerComponent } from "./utils/registerComponent";
import { render } from "./utils/render";

registerComponent("Button", Button);
registerComponent("ButtonCommon", ButtonCommon);
registerComponent("FormAuthLayout", FormAuthLayout);
registerComponent("FormInput", FormInput);
registerComponent("FormInputError", FormInputError);
registerComponent("FormInputContainer", FormInputContainer);

window.addEventListener("DOMContentLoaded", () => {
  render("profile");
});
