import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IModal {
  content: HTMLElement;
}


export class Modal extends Component<IModal> {
  protected _content: HTMLElement;
  protected _closeButton: HTMLButtonElement;

  constructor(container:HTMLElement, protected event:IEvents){
    super(container)

    this._content = ensureElement<HTMLElement>(`.modal__content`, container);
    this._closeButton = ensureElement<HTMLButtonElement>(`.modal__close`, container);
    this._closeButton.addEventListener(`click`, this.close.bind(this));
    this.container.addEventListener(`click`, this.close.bind(this));
    this._content.addEventListener(`click`, evt => evt.stopPropagation()); 


  }

  set content(value: HTMLElement){
    this._content.replaceChildren(value)
  }

  open() {
		this.container.classList.add('popup_is-opened');
	};

	close() {
		this.container.classList.remove('popup_is-opened');
		this.content = null;
	}
  
// Рендер будет использоваться для вывода информации успешной оплаты
  render(data:IModal):HTMLElement {
    super.render(data);
    this.open();
    return this.container
  }
}