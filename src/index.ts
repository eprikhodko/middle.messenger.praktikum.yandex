import "./main.css";
import "./index.css";

import { registerComponent } from "./utils/registerComponent";
import { render } from "./utils/render";
import { Button } from "./components/Button";
import { ButtonCommon } from "./components/ButtonCommon";
import { FormAuthLayout } from "./components/FormAuthLayout";
import { FormInput } from "./components/FormInput";
import { FormInputError } from "./components/FormInputError";
import { FormInputContainer } from "./components/FormInputContainer";
import { ErrorPageContent } from "./components/ErrorPageContent";
import { ChatAvatar } from "./modules/Chat/components/ChatAvatar";
import { ChatListItem } from "./modules/Chat/components/ChatListItem";
import { ButtonArrow } from "./components/ButtonArrow";
import { Link } from "./components/Link";
import { ROUTE } from "./utils/render";

registerComponent("Button", Button);
registerComponent("ButtonCommon", ButtonCommon);
registerComponent("FormAuthLayout", FormAuthLayout);
registerComponent("FormInput", FormInput);
registerComponent("FormInputError", FormInputError);
registerComponent("FormInputContainer", FormInputContainer);
registerComponent("ErrorPageContent", ErrorPageContent);
registerComponent("ChatAvatar", ChatAvatar);
registerComponent("ChatListItem", ChatListItem);
registerComponent("ButtonArrow", ButtonArrow);
registerComponent("Link", Link);

window.addEventListener("DOMContentLoaded", () => {
  render(ROUTE.HOME);
});
