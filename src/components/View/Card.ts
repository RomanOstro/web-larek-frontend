import { IProductItem } from '../../types';
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';


export class Card extends Component<IProductItem> {
	cardElement: HTMLElement;
	protected _category?: HTMLElement;
	protected _cardTitle: HTMLElement;
	protected _cardImage: HTMLImageElement;
	protected _cardPrice: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _id: string;
	protected _description?: HTMLElement;  
	protected _index: HTMLElement;
	protected _deleteButton: HTMLButtonElement;
	
	constructor(
		container: HTMLElement,
		blockName: string,
		clickCardHandler: (event: MouseEvent) => void
	) {
		super(container);

		this._category = this.container.querySelector(`.card__category`);
		this._cardTitle = ensureElement<HTMLElement>(
			`.${blockName}__title`,
			this.container
		);
		this._cardImage = this.container.querySelector(`.card__image`);
		this._cardPrice = ensureElement<HTMLElement>(
			`.${blockName}__price`,
			this.container
		);
		this._description = this.container.querySelector(
			`.${blockName}__text`
		);
		this._index =  this.container.querySelector(`.basket__item-index`);

		this._button = this.container.querySelector(`.${blockName}__button`);

		if (this._button) {
			this._button.addEventListener(`click`, clickCardHandler);
		} else {
			this.container.addEventListener(`click`, clickCardHandler);
		}

		this._deleteButton = container.querySelector(`.basket__item-delete`); 
		if (this._deleteButton) {
			this._deleteButton.addEventListener(`click`, (evt) => {
				clickCardHandler(evt);
			});
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || ``;
	}

	set title(value: string) {
		this.setText(this._cardTitle, value);
	}

	get title() {
		return this._cardTitle.textContent || ``;
	}

	set category(value: string) {
		this.setText(this._category, value);
	}

	get category() {
		return this._category.textContent || ``;
	}

	set image(value: string) {
		this.setImage(this._cardImage, value, this.title);
	}

	set price(value: number | null) {
		if (value === null) {
			this.setText(this._cardPrice, `Бесценно`);
			this.setDisabled(this._button, true);
			this.setText(this._button, `Нельзя купить`);
		} else {
			this.setText(this._cardPrice, value + ` синапсов`);
		}
	}

	get price() {
		return parseInt(this._cardPrice.textContent);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set button(value: string) {
		if (this.price) {
			this.setText(this._button, value);
		} else {
			this.setText(this._button, `Нельзя купить`);
		}
	}

	set index(value: number) {                     
		this.setText(this._index, value);
	}

	toogleButtonText(value: boolean) {
		if (value) {
			this.button = `Убрать из корзины`;
		} else this.button = `В корзину`;
	}
}


