export interface IPersonalData {
  firstName: string;
  lastName: string;
  carNumber: string;
  birthDate: Date;
  age: number;
  citizenship: string;
}

export interface IOrder {
  personalData: IPersonalData[];
  tourID: string;
  userLogin: string;
}

export interface IOrders {
  orders: IOrder[];
}

