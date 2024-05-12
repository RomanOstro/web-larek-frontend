import { IEvents } from "../components/base/events";
// Тип способа оплаты
// export type IPayment = 'онлайн' | 'при получении';

// Объект данных карточки
export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

// Отображение в калалоге карточки
export type ICatalogItem = Omit<IProductItem, 'description'>;

// Отображение карточки в модальном окне
export type IPreviewItem = IProductItem;

// Отображение карточки в корзине
export type IBasketItem = Pick<IProductItem, 'id' | 'title' | 'price'>;

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



// Типы модели каталога карточки
export interface ICardData {
	catalog: IProductItem[];
	basket: IProductItem[];
	events: IEvents;
	getCatalog(): IProductList;
	setCatalog(data: IProductList):void;
	totalPrice():number;
	allOrderId():void;
	clearBasket(): void;
	
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





