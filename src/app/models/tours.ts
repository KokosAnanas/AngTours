export interface ITour {
  id?: string;
  createdAt?: string;
  name?: string;
  description?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  cardNumber?: string;
  birthDate?: string;
  age?: number;
  citizenship?: string;
  tourOperator?: string;
  price?: string;
  img?: string;
  type?: string;
}

export interface ITourServerResponse {
  tours: ITour[];
}
