import { ensureAllElements } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "./Form";

interface IOrder {
  adress: string;
  paymant: string;
}

export type TabActions = {
  onClick: (tab: string) => void
}

export class Order extends Form<IOrder> {

  protected _buttons: HTMLButtonElement[];

  constructor(container:HTMLFormElement, event: IEvents, actions?: TabActions) {
    super(container, event)

    this._buttons = ensureAllElements(`.button_alt`, this.container)

    this._buttons.forEach(button => {
      button.addEventListener('click', () => {
          actions?.onClick?.(button.name);
      });
  })
  }

  set adress(value:string) {
    (this.container.elements.namedItem('adress') as HTMLInputElement).value = value;
  }
  // button.name - > card или cash
  set paymant(name:string){
    this._buttons.forEach(button => {
      this.toggleClass(button, 'button_alt-active', button.name === name);
      this.setDisabled(button, button.name === name)
  });
  }

    clearForm(){
      this._buttons.forEach(button => {
        this.toggleClass(button, 'button_alt-active', false);
        this.setDisabled(button, false)
    });

      this.container.reset();
    }
}
