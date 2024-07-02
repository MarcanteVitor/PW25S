import { IOrder } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const URL = "/orders";

const save = async (order: IOrder): Promise<any> => {
  let response;
  try {
    response = await api.post(URL, order);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const findAll = async (): Promise<any> => {
  let response;
  try {
      response = await api.get(URL);
  } catch (error: any) {
      response = error.response;
  }
  return response;
}


const OrderService = { save, findAll };

export default OrderService;