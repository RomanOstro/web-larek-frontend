import { createElement, ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

interface IBasket {
	list: HTMLElement[];
	total: string;
}

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement, protected event: IEvents) {
		super(container);
		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = ensureElement<HTMLElement>('.basket__price');
		this._button = ensureElement<HTMLButtonElement>('.basket__action');

		this._button.addEventListener('click', () => {
			event.emit('order:open');
		});

		this.list = [];
	}

  // Установка карточек в ul корзины
	set list(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
		// Если товары в корзине есть, кнопка активна, иначе - нет
		this._button.disabled = items.length? false : true;
	}

  // Общая сумма товаров
  set total(value:number) {
    this.setText(this._total, String(value))
  }
}
