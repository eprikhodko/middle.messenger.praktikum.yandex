import "./main.css";
import "./index.css";

import Router from "./utils/Router";
import { SignInPage } from "./pages/sign-in";

enum Routes {
  Index = "/",
  Register = "/register",
  Profile = "/profile",
  Messenger = "/messenger",
}

// registerComponent("Button", Button);
// registerComponent("ButtonCommon", ButtonCommon);
// registerComponent("FormAuthLayout", FormAuthLayout);
// registerComponent("FormInput", FormInput);
// registerComponent("FormInputError", FormInputError);
// registerComponent("FormInputContainer", FormInputContainer);
// registerComponent("ErrorPageContent", ErrorPageContent);
// registerComponent("ChatAvatar", ChatAvatar);
// registerComponent("ChatListItem", ChatListItem);
// registerComponent("ButtonArrow", ButtonArrow);
// registerComponent("Link", Link);

// window.addEventListener("DOMContentLoaded", () => {
//   render(ROUTE.HOME);
// });

window.addEventListener("DOMContentLoaded", async () => {
  Router.use(Routes.Index, SignInPage);
  // .use(Routes.Register, RegisterPage)
  // .use(Routes.Profile, ProfilePage)
  // .use(Routes.Messenger, MessengerPage)

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    // await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      // Router.go(Routes.Profile)
      Router.go(Routes.Index);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
