import {
	IProductItem,
	IOrder,
	IContacts,
	IOrderForm,
	IOrderResponse,
} from './types';
import { EventEmitter } from './components/base/events';
import { Api } from './components/base/Api';
import './scss/styles.scss';
import { cloneTemplate, ensureElement } from './utils/utils';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/AppApi';
import { Page } from './components/View/Page';
import { Modal } from './components/View/Modal';
import { CardData } from './components/CardData';
import { Card } from './components/View/Card';
import { Basket } from './components/View/Basket';
import { Order } from './components/View/Order';
import { Contacts } from './components/View/Contacts';
import { Sucsess } from './components/View/Sucsess';

// Шаблоны
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

// Брокер событий
const events = new EventEmitter();

// Инициализируем классы Апи
const api = new Api(API_URL);
const appApi = new AppApi(CDN_URL, api);

// Модель данных приложения
const appModel = new CardData({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Компоненты
const basket = new Basket(cloneTemplate(basketTemplate), events);
const ordersForm = new Order(cloneTemplate(orderTemplate), events);
const contactsForm = new Contacts(cloneTemplate(contactsTemplate), events);
const sucsess = new Sucsess(cloneTemplate(successTemplate), events);

// Получаем карточки с сервера

appApi.getCards()
.then((cards) => appModel.setCatalog(cards))
.catch((error) => console.log(error));

// Выводим карточки на страничку в каталог
events.on(`catalog:changed`, () => {
	const cards = appModel.getCatalog().map((product) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), `card`, () => {
			events.emit(`card:select`, product);
		});
		return card.render(product);
	});
	page.catalog = cards;
});

// Событие при клике на карточку в каталоге, для появления превью
events.on(`card:select`, (product: IProductItem) => {
	const cardPreview = new Card(
		cloneTemplate(cardPreviewTemplate),
		`card`,
		() => {
			events.emit(`basket:toggleItem`, product);
			cardPreview.toogleButtonText(appModel.inBasket(product.id));
		}
	);
	cardPreview.toogleButtonText(appModel.inBasket(product.id));
	modal.render({ content: cardPreview.render(product) });
});

// Добавление карточки в массив карточек корзины
events.on(`basket:toggleItem`, (product: IProductItem) => {
	if (!appModel.inBasket(product.id)) {
		appModel.addItem(product);
	} else {
		events.emit(`basket:deleteItem`, product)
	}
	page.counter = appModel.totalItem;
});

//  Рендер карточек корзины и открытие корзины
events.on(`basket:open`, () => {
	const items = appModel.getBasket().map((card, index) => {
		const itemInBasket = new Card(
			cloneTemplate(cardBasketTemplate),
			`card`,
			() => {
				events.emit(`basket:deleteItem`, card);
			}
		);
		return itemInBasket.render({
			title: card.title,
			price: card.price,
			index: index + 1,
			id: card.id
		});
	});
	modal.render({
		content: basket.render({ list: items, total: appModel.totalPrice() }),
	});
});


// Удаление карточки по кнопке в корзине
events.on(`basket:deleteItem`, (product: IProductItem) => {
	appModel.deleteItem(product.id);
});


// Корзина изменилась
events.on(`basket:changed`, () => {
	const items = appModel.getBasket().map((card, index) => {
		const itemInBasket = new Card(
			cloneTemplate(cardBasketTemplate),
			`card`,
			() => {
				events.emit(`basket:deleteItem`, card);
			}
		);
		return itemInBasket.render({
			title: card.title,
			price: card.price,
			index: index + 1,
			id: card.id
		});
	});
	basket.render({ list: items, total: appModel.totalPrice() });
	page.counter = appModel.totalItem;
});

// Открытие первой формы заказа
events.on('basket:order', () => {
	modal.render({
		content: ordersForm.render({
			valid: false,
			errors: [],
		}),
	});
});

// События вывода ошибок в форме с выбором способа оплаты
events.on(`orderErrors:change`, (errors: IOrderForm) => {
	ordersForm.valid = Object.keys(errors).length === 0;
	ordersForm.errors = Object.values(errors).join(`, `);
});

// События вывода ошибок в форме с телефоном и почтой
events.on(`contactErrors:change`, (errors: IOrderForm) => {
	contactsForm.valid = Object.keys(errors).length === 0;
	contactsForm.errors = Object.values(errors).join(`, `);
});

// Добавляем данные варианта оплаты
events.on(
	`order.payment:change`,
	(data: { field: keyof IOrder; value: string }) => {
		appModel.setOrder(data.field, data.value);
	}
);

// Добавляем данные адреса
events.on(
	`order.address:change`,
	(data: { field: keyof IOrder; value: string }) => {
		appModel.setOrder(data.field, data.value);
	}
);

// Добавляем email
events.on(
	`contacts.email:change`,
	(data: { field: keyof IContacts; value: string }) => {
		appModel.setOrder(data.field, data.value);
	}
);

// Добавляем телефон
events.on(
	`contacts.phone:change`,
	(data: { field: keyof IContacts; value: string }) => {
		appModel.setOrder(data.field, data.value);
	}
);

//  Открываем форму с контактами
events.on('order:submit', () => {
	modal.render({
		content: contactsForm.render({
			valid: false,
			errors: [],
		}),
	});
});

events.on('contacts:submit', () => {
	appApi
		.postOrder({
			...appModel.order,
			total: appModel.total,
			items: appModel.items,
		})
		.then((res) => {
			events.emit(`order:complete`, res);
			appModel.clearBasket();
			appModel.clearOrder();
			page.counter = 0;
			ordersForm.clearForm();
			contactsForm.clearForm();
		})
		.catch((error) => {
			console.log(error);
		});
});

events.on(`order:complete`, (res: IOrderResponse) => {
	modal.render({ content: sucsess.render({ total: res.total }) });
});

events.on(`modal:open`, () => {
	page.locked = true;
});

events.on(`order:finish`, () => {
	modal.close();
});

events.on(`modal:close`, () => {
	page.locked = false;
});
