
export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;


//  API_URL - используется для запросов данных о товарах и отправки заказа
//  CDN_URL - используется для формирования адреса картинки в товаре.

export const settings = {

};

export enum cardCategory {
  "софт-скил" = "soft",
  "другое" = "other",
  "дополнительное" = "additional",
  "кнопка" = "button",
  "хард-скил" = "hard"
}

