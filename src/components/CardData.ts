import {
	IProductItem,
	IUserModel,
	ICardData,
	IOrderForm,
	IOrderValidate,
} from '../types/index';
import { IEvents } from '../components/base/events';
import { Model } from './base/Model';

export class CardData extends Model<ICardData> {
	protected catalog: IProductItem[] = [];
	protected basket: IProductItem[] = [];
	protected event: IEvents;

	// Поле заказа
	order: IUserModel = {
		payment: ``,
		address: ``,
		email: ``,
		phone: ``,
		total: 0,
		items: [],
	};

	// Объект с ошибками, для валидации форм
	formErrors: IOrderForm = {};

	//  Количество товаров в корзине
	get totalItem() {
		return this.basket.length;
	}

	// Установить и получить каталог
	setCatalog(cards: IProductItem[]) {
		this.catalog = cards;
		this.emitChanges(`catalog:changed`, { catalog: this.catalog });
	}

	// Получить каталог
	getCatalog() {
		return this.catalog;
	}

	// Метод для присвоения id товаров и итоговой суммы заказа в объект заказа покупателя
	addToOrder() {
		this.order.items = this.basket.map((item) => item.id);
		this.order.total = this.totalPrice();
	}

	// Общая сумма товаров в корзине
	totalPrice() {
		return this.basket.reduce((acum, item) => {
			return acum + (item.price || 0);
		}, 0);
	}

	// Добавить товар в корзину
	addItem(element: IProductItem): void | IProductItem {
		if (this.basket.find((card) => card.id === element.id)) {
			return;
		}

		this.basket.push(element);
	}

	// Удалить товар из корзины
	deleteItem(id: string) {
		this.basket = this.basket.filter((card) => card.id !== id);
	}

	// Проверка, есть ли продукт в массиве корзины
	inBasket(id: string) {
		return this.basket.some((card) => card.id === id);
	}

	// Получить каталог корзины
	getBasket() {
		return this.basket;
	}

	// Очистить корзину
	clearBasket() {
		this.basket = [];
	}
	// Очистить объект заказа для отправки на сервер
	clearOrder() {
		this.order = {
			payment: ``,
			address: ``,
			email: ``,
			phone: ``,
			total: 0,
			items: [],
		};
	}

	// Заполнение объекта пользователя для отправки на сервер
	setOrder(field: keyof IOrderValidate, value: string) {
		this.order[field] = value;

		if (field === `address` || field === `payment`) {
			this.validateOrderForm();
		} else {
			this.validateContactForm();
		}
	}

	// Валидация формы с табсами
	validateOrderForm() {
		const errors: IOrderForm = {};
		if (!this.order.address) {
			errors.address = `Введите адрес доставки`;
		}
		if (!this.order.payment) {
			errors.payment = `Выберите способ оплаты`;
		}
		this.formErrors = errors;
		this.emitChanges(`orderErrors:change`, this.formErrors);
	}

	// Валидация формы с даными покупателя
	validateContactForm() {
		const errors: IOrderForm = {};
		if (!this.order.email) {
			errors.email = `Введите email`;
		}
		if (!this.order.phone) {
			errors.phone = `Введите номер телефона`;
		}
		this.formErrors = errors;
		this.emitChanges(`contactErrors:change`, this.formErrors);
	}
}
