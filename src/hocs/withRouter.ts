import Block from "../utils/Block";
import Router from "../utils/Router";

export interface PropsWithRouter {
  router?: typeof Router;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withRouter<T extends new (...args: any[]) => Block<any>>(
  Component: T
) {
  return class WithRouter extends Component {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super({ ...args[0], router: Router });
    }
  } as unknown as T;
}
