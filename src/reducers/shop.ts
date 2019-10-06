import moment from "moment";
import { Moment } from "moment-jalaali";

export interface IShopState {
  lastMarketId?: number;
  products: IProductsState;
  cart: ICartState;
  deliver: IDeliverState;
  error: string;
}

export interface IProductsState {
  [index: string]: IProductState;
}

export interface IProductState {
  id: number;
  title: string;
  price: number;
  max: number;
  img: string;
  enable: boolean;
}

export interface ICartState {
  [index: string]: number;
}

export interface ICartItem {
  id: number;
  title: string;
  amount: number;
  price: number;
}

export interface IDeliverState {
  deliverKind: string;
  deliverDistrict: string;

  mobile: string;
  fullName: string;
  address: string;

  location?: Position;
  date: Moment;
  time: string;

  loadingInfo: boolean;
  loadingAddress: boolean;
}

export const INITIAL_SHOPSTATE: IShopState = {
  products: {},
  cart: {},
  deliver: {
    deliverKind: "",
    deliverDistrict: "",
    fullName: "",
    address: "",
    mobile: "",
    date: moment(),
    time: "",
    loadingInfo: false,
    loadingAddress: false
  },
  error: ""
};
