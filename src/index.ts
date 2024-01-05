import "./main.css";
import "./index.css";

import Router from "./utils/Router";
import { ROUTE } from "./utils/enums";
import { SignInPage } from "./pages/sign-in";
import { SignUpPage } from "./pages/sign-up";
import { ChatPage } from "./pages/chat";
import { ProfilePage } from "./pages/profile";
import { ChangePasswordPage } from "./pages/change-password";
import { Error404Page } from "./pages/404";
import { Error500Page } from "./pages/500";
import AuthController from "./controllers/AuthController";

window.addEventListener("DOMContentLoaded", async () => {
  Router.use(ROUTE.INDEX, SignInPage)
    .use(ROUTE.SIGN_UP, SignUpPage)
    .use(ROUTE.SETTINGS, ProfilePage)
    .use(ROUTE.MESSENGER, ChatPage)
    .use(ROUTE.CHANGE_PASSWORD, ChangePasswordPage)
    .use(ROUTE.ERROR_404, Error404Page)
    .use(ROUTE.ERROR_500, Error500Page);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case ROUTE.INDEX:
      // case ROUTE.SIGN_UP:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(ROUTE.SETTINGS);
      Router.go(ROUTE.INDEX);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(ROUTE.INDEX);
    }
  }
});
