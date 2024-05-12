import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface ISucsess {
  total: number;
}

export class Sucsess extends Component<ISucsess> {
protected _closeButton: HTMLButtonElement;
protected _description: HTMLElement;

  constructor(container: HTMLElement, event: IEvents){
    super(container)

    this._description = ensureElement<HTMLElement>(`order-success__description`, this.container)
    this._closeButton = ensureElement<HTMLButtonElement>(`.order-success__close`, this.container);

    // установить обработчик на кнопку и передать в конструктор

  }

  set total(value:number){
    this.setText(this._description, `Списано ${value} синапсов`)
  }

}

