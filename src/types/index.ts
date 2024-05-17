import { IEvents } from '../components/base/events';
// Объект данных карточки
export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	index?: number;
}

// Тип GET-запроса списка карточек
export interface IProductList {
	total: number;
	items: IProductItem[];
}

// Объект данных пользователя при оформлении заказа в POST запросе
export interface IOrderPost {
	payment: string;
	address: string;
	email: string;
	phone: string;
	total: number;
	items: string[];
}

// Ответ с сервера после оформления заказа
export interface IOrderResponse {
	id: string;
	total: number;
}

// Форма заказа со способом оплаты
export interface IOrder {
	address: string;
	payment: string;
}

// Форма заказа со контактами
export interface IContacts {
	phone: string;
	email: string;
}

// Типы для объекта с ошибками для валидации форм
export interface IOrderForm {
	address?: string;
	payment?: string;
	phone?: string;
	email?: string;
}

// Интерфейс для метода валидации форм
export interface IOrderValidate {
	payment: string,
	address: string
	email: string
	phone: string
}

// Тип модели данных
export interface ICardData {
	catalog: IProductItem[];
	basket: IProductItem[];
	events: IEvents;
	order: IUserModel;
	formErrors: IOrderForm;
	setCatalog(cards: IProductItem[]): void;
	getCatalog(): IProductItem[];
	addToOrder(): void;
	totalPrice(): number;
	addItem(element: IProductItem): void | IProductItem;
	deleteItem(id: string): void;
	inBasket(id: string): boolean;
	getBasket(): IProductItem[];
	clearBasket(): void;
	clearOrder(): void;
	setOrder(field: keyof IOrderValidate, value: string): void;
	validateOrderForm(): void;
	validateContactForm(): void;
}

// Модель данных пользователя (для отправки данных пользователя на сервер)
export interface IUserModel {
	payment: string;
	address: string;
	email: string;
	phone: string;
	total: number;
	items: string[];
}

// Тип методов запросов на сервер
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Типы для базового класса Api
export interface IApi {
	baseUrl: string;
	get<T>(url: string): Promise<T>;
	post<T>(url: string, data: object, method: ApiPostMethods): Promise<T>;
}
