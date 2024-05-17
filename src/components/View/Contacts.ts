import { IContacts } from '../../types';
import { IEvents } from '../base/events';
import { Form } from './Form';

export class Contacts extends Form<IContacts> {
	constructor(container: HTMLFormElement, event: IEvents) {
		super(container, event);
	}

	set phone(value: number) {
		(this.container.elements.namedItem(`phone`) as HTMLInputElement).value =
			String(value);
	}

	set email(value: string) {
		(this.container.elements.namedItem(`email`) as HTMLInputElement).value =
			value;
	}
}
