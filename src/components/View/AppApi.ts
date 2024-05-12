import {IOrderPost, IOrderResponse, IProductItem} from "../../types/index"
import { Api, ApiListResponse } from "../base/api";

interface ILarekApi {
  getCards(): Promise<IProductItem[]>,
  postOrder(data:IOrderPost): Promise<IOrderResponse>,

}

export class LarekApi extends Api implements ILarekApi {
  readonly cdn: string;

  constructor(cdn: string, baseUrl:string, options?:RequestInit){
    super(baseUrl, options)
    this.cdn = cdn;
  }

  getCards(): Promise<IProductItem[]> {
    return this.get(`/product`).then((data:ApiListResponse<IProductItem>) => {
      return data.items.map((item) => ({
          ...item,
          image: this.cdn + item.image
      }))
    }
  );
  }

  postOrder(data:IOrderPost):Promise<IOrderResponse> {
    return this.post(`/order`, data)
    .then((data:IOrderResponse) => data)
  }


}
