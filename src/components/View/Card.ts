import { IProductItem } from '../../types';
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export class Card extends Component<IProductItem> {
	cardElement: HTMLElement;
	protected _category: HTMLElement;
	protected _cardTitle: HTMLElement;
	protected _cardImage: HTMLImageElement;
	protected _cardPrice: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _id: string;

	constructor(
		container: HTMLElement,
		blockName: string,
		clickCardHandler: (event: MouseEvent) => void
	) {
		super(container);

		this._category = ensureElement<HTMLElement>(
			`.${blockName}__category`,
			this.container
		);
		this._cardTitle = ensureElement<HTMLElement>(
			`.${blockName}__title`,
			this.container
		);
		this._cardImage = ensureElement<HTMLImageElement>(
			`.${blockName}__image`,
			this.container
		);
		this._cardPrice = ensureElement<HTMLElement>(
			`.${blockName}__price`,
			this.container
		);
		this._button = this.container.querySelector(`.${blockName}__button`);

		if (this._button) {
			this._button.addEventListener(`click`, clickCardHandler);
		} else {
			this.container.addEventListener(`click`, clickCardHandler);
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
}

// Класс превью карточки
export class CardPreview extends Card {
	protected _description: HTMLElement;

	constructor(
		container: HTMLElement,
		blockName: string,
		clickCardHandler: (event: MouseEvent) => void
	) {
		super(container, `card`, clickCardHandler);
		this._description = ensureElement<HTMLElement>(
			`.${blockName}__text`,
			this.container
		);
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

	toogleButtonText(value: boolean) {
		if (value) {
			this.button = `Убрать из корзины`;
		} else this.button = `В корзину`;
	}
}

// Класс карточки в корзине
export class CardBasket extends Component<IProductItem> {
	protected _index: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _price: HTMLElement;
	protected _title: HTMLElement;

	constructor(
		container: HTMLElement,
		blockName: string,
		clickCardHandler: (event: MouseEvent) => void
	) {
		super(container);
		this._index = ensureElement<HTMLElement>(
			`.basket__item-index`,
			this.container
		);
		this._button = container.querySelector(`.${blockName}__button`);
		this._price = ensureElement<HTMLElement>(
			`.${blockName}__price`,
			this.container
		);
		this._title = ensureElement<HTMLElement>(
			`.${blockName}__title`,
			this.container
		);
		if (this._button) {
			this._button.addEventListener(`click`, (evt) => {
				clickCardHandler(evt);
			});
		}
	}

	set index(value: number) {
		this.setText(this._index, value);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title() {
		return this._title.textContent || ``;
	}
}
