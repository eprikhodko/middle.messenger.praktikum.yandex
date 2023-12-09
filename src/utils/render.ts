import {HomePage} from "../pages/home";
import {LoginPage} from "../pages/login";
import {SignInPage} from "../pages/sign-in";


const ROUTES = {
  'home': HomePage,
  'login': LoginPage,
  'sign-in': SignInPage,
}

export function render(name: keyof typeof ROUTES) {
  const root = document.querySelector('#app')!;

  root.innerHTML = '';

  const Page = ROUTES[name];

  const page = new Page();

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}
