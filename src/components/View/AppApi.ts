import {
	IApi,
	IOrderPost,
	IOrderResponse,
	IProductItem,
	IProductList,
} from '../../types/index';

export class AppApi {
	readonly cdn: string;
	private _baseApi: IApi;

	constructor(cdn: string, baseApi: IApi) {
		this._baseApi = baseApi;
		this.cdn = cdn;
	}

	getCards(): Promise<IProductItem[]> {
		return this._baseApi
			.get<IProductList>(`/product`)
			.then((data: IProductList) => {
				return data.items.map((item) => ({
					...item,
					image: this.cdn + item.image,
				}));
			});
	}

	postOrder(data: IOrderPost): Promise<IOrderResponse> {
		return this._baseApi
			.post<IOrderResponse>(`/order`, data, 'POST')
			.then((data: IOrderResponse) => data);
	}
}
