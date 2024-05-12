import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import {ensureElement} from './utils/utils';


const catalogContainer = document.querySelector('.gallery');

const events = new EventEmitter();


const successTemplate = ensureElement<HTMLTemplateElement>('#success')
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview')
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket')
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket')
const orderTemplate = ensureElement<HTMLTemplateElement>('#order')
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts')

const cards = {
	"items": [
		{
				"id": "854cef69-976d-4c2a-a18c-2aa45046c390",
				"description": "Если планируете решать задачи в тренажёре, берите два.",
				"image": "/5_Dots.svg",
				"title": "+1 час в сутках",
				"category": "софт-скил",
				"price": 750
		},
		{
				"id": "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
				"description": "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
				"image": "/Shell.svg",
				"title": "HEX-леденец",
				"category": "другое",
				"price": 1450
		}
	]
	
}

