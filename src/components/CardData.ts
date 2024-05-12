import { IProductItem, IUserModel, ICardData} from '../types/index';
import {IEvents} from '../components/base/events'
import { Model } from './base/Model';






export class CardData extends Model<ICardData>{
	protected _catalog: IProductItem[] = [];
	protected _basket: IProductItem[] = [];
  // protected _preview: boolean;
  protected events: IEvents;

	// Поле заказа
  protected order: IUserModel = {
    payment: ``,
	  address: ``,
	  email: ``,
	  phone: ``,
	  total: 0,
	  items: []
  }

	
	// Установить и получить каталог
	set catalog(cards: IProductItem[]) {
		this._catalog = cards;
	}

	get catalog() {
		return this._catalog;
	}
	//  Количество товаров в корзине
	get totalItem(){
		return this._basket.length
	}
  // Получить карточку
	getCard(cardId: string) {
		return this.catalog.filter((card) => card.id === cardId);
	}
	// Общая сумма товаров в корзине
	totalPrice(){
		return this._basket.reduce((acum, item) => {
			return acum + (item.price || 0)
		}, 0)
	}
	// Все id заказанных товаров в одном массиве
	allOrderId(){
		this.order.items = this._basket.map( card => card.id);
	}
	// Добавить товар в корзину
	addItem(element: IProductItem):void|IProductItem{

		if(this._basket.find(card => card.id === element.id)){
			return 
		}

		this._basket.push(element)
		// this.event.emit(`basket:addItem`, {...this._items});
	}
	// Очистить корзину
	clearBasket(){
		this._basket = []
	};

}
