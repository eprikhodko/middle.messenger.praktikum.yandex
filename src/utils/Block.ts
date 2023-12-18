import { EventBus } from "./EventBus";
import { nanoid } from "nanoid";

type ContextAndStubs = {
  __refs: Record<string, Block>;
  __children?: Array<{
    embed: (fragment: DocumentFragment) => void;
  }>;
};

class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  public id = nanoid(6);
  protected props: P;
  protected refs: Record<string, Block> = {};
  public children: Record<string, Block | Block[]>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;

  constructor(propsWithChildren: P) {
    console.log("propsWithChildren:", propsWithChildren)
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);
  

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);

    console.log("constructor, this.children:", this.children)
  }

  // private _getChildrenAndProps(childrenAndProps: P): {
  //   props: P;
  //   children: Record<string, Block | Block[]>;
  // } {
  //   const props: Record<string, unknown> = {};
  //   const children: Record<string, Block> = {};

  //   console.log("_getChildrenAndProps:", childrenAndProps)

  //   Object.entries(childrenAndProps).forEach(([key, value]) => {
  //     if (value instanceof Block) {
  //       children[key] = value;
  //     } else {
  //       props[key] = value;
  //     }
  //   });

  //   return { props: props as P, children };
  // }

  _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block | Block[]> } {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block | Block[]> = {};

    console.log("_getChildrenAndProps:", childrenAndProps)

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && value.every(v => v instanceof Block)) {
        children[key as string] = value;
      } else if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    console.log("RETURN", {props: props as P, children})

    return {props: props as P, children};
  }

  _addEvents() {
    const { events = {} } = this.props as P & {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });

    // console.log(this._element)
  }

  private _removeEvents() {
    const { events = {} } = this.props as P & {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    console.log("dispatchComponentDidMount:", this.children)
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private _componentDidUpdate() {
    if (this.componentDidUpdate()) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    this._removeEvents();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
    
    console.log("Block _render:" ,this._element)
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  // protected compile(
  //   template: (context: Record<string, unknown>) => string,
  //   context: Record<string, unknown>
  // ) {
  //   const contextAndStubs: ContextAndStubs = { ...context, __refs: this.refs };

  //   const html = template(contextAndStubs);

  //   const temp = document.createElement("template");

  //   temp.innerHTML = html;

  //   // console.log("contextAndStubs", contextAndStubs)
  //   contextAndStubs.__children?.forEach(({ embed }) => {
  //     // console.log("EMBED")
  //     embed(temp.content);
  //   });

  //   console.log("COMPILE", temp.content)
  //   return temp.content;
  // }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = {...context};

    // console.log("debug", contextAndStubs)
    // console.log("debug", this.children)

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`)
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
        // console.log("debug", contextAndStubs[name])
      }
    });

    const html = template(contextAndStubs);
    console.log("debug, template(contextAndStubs):", template(contextAndStubs))

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Block) => {
      // console.log("debug, component:", component)
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
      // console.log("debug, temp.content:", temp.content)
      // console.log("debug, stub:", stub)


      if (!stub) {
        return;
      }

      // console.log("does component have getContent?")
      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    }

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    console.log("COMPILE", temp.content)
    return temp.content;
  }

  public getContent() {
    console.log("GET CONTENT", this.element)
    return this.element;
  }

  private _makePropsProxy(props: P) {
    const self = this;

    console.log("_makePropsProxy", props)

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };

        target[prop as keyof P] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}

export default Block;
