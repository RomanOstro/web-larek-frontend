import { IProductItem } from "../../types";
import { Component } from "../base/Component";
import {ensureElement} from '../../utils/utils'
import { IEvents } from "../base/events";


 export class Card extends Component<IProductItem>{
  cardElement: HTMLElement;
  protected _category: HTMLElement;
  protected _cardTitle: HTMLElement;
  protected _cardImage:HTMLImageElement;
  protected _cardPrice: HTMLElement;
  protected _button: HTMLButtonElement;
  protected _id:string;

  constructor(container:HTMLElement, blockName: string, clickCardHandler: (event: MouseEvent) => void){
    super(container)
    this.cardElement = ensureElement<HTMLElement>(`.${blockName}`, this.container);
    this._category = ensureElement<HTMLElement>(`.${blockName}__category`, this.container);
    this._cardTitle = ensureElement<HTMLElement>(`.${blockName}__title`, this.container);
    this._cardImage = ensureElement<HTMLImageElement>(`.${blockName}__image`, this.container);
    this._cardPrice = ensureElement<HTMLElement>(`.${blockName}__price`, this.container);
    this._button = ensureElement<HTMLButtonElement>(`.${blockName}__button`, this.container);


    this._button.addEventListener(`click`, clickCardHandler);
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }

  get id(): string {
    return this.container.dataset.id || ``
  }

  set title(value: string) {
    this.setText(this._cardTitle, value)
  }

  get title(){
    return this._cardTitle.textContent || ``;
  }

  set category(value: string){
    this.setText(this._category, value)
  }

  get category() {
    return this._category.textContent || ``;
  }

  set image(value: string) {
    this.setImage(this._cardImage, value, this.title)
  }

  set price (value: number | null) {
    if (value === null) {
      this.setText(this._cardPrice, `Бесценно`)
      this.setDisabled(this._button, true)
      this.setText(this._button, `Нельзя купить`)
    } else {
      this.setText(this._cardPrice, value + `синапсов`)
    }

  }

  get price(){
    return Number(this._cardPrice.textContent);
  }


}


export class CaprPreview extends Card {
  protected _description:HTMLElement;

  constructor(container:HTMLElement, blockName: string, clickCardHandler: (event: MouseEvent) => void){
    super(container, `card`, clickCardHandler);
    this._description = ensureElement<HTMLElement>(`.${blockName}__text`, this.container);
  }

  set description(value: string)  {
    this.setText(this._description, value);
  }
  
}


