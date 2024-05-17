import { ensureAllElements } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Form } from './Form';
import { IOrder } from '../../types/index';

export class Order extends Form<IOrder> {
	protected _buttons: HTMLButtonElement[];

	constructor(container: HTMLFormElement, event: IEvents) {
		super(container, event);

		this._buttons = ensureAllElements(`.button_alt`, this.container);

		this._buttons.forEach((button) => {
			button.addEventListener('click', () => {
				this.paymentButton = button.name;
				this.oninputChange(`payment`, button.name);
			});
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	set paymentButton(name: string) {
		this._buttons.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === name);
		});
	}

	clearForm() {
		this._buttons.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', false);
		});

		this.container.reset();
	}
}
