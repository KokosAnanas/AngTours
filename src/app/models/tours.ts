export interface ITour {
  createdAt?: string,
  name: string,
  avatar?: string,
  id: string,
  description: string,
  tourOperator: string,
  price: string,
  img: string,
  type?: string,
  date?: string,
  locationId: string
}

export interface ITourServerResponse {
  tours: ITour[];
}
