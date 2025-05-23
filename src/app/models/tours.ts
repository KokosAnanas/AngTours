export interface ITour {
  id: string,
  name: string,
  description: string,
  tourOperator: string,
  price: string,
  img: string,
  type?: string,
  date?: string,
  locationId: string,
  country?: ICountriesResponseItem,
  code?: string,
  createdAt?: string,
  avatar?: string,
  inBasket?: boolean,
}

export interface ITourServerResponse {
  tours: ITour[];
}

export interface ICountriesResponseItem {
  iso_code2: string,
  iso_code3: string,
  name_ru: string,
  flag_url: string,
}

export interface IFilerTypeLogic {
  key: 'all' | 'single' | 'group',
  label?: string,
}

export interface ILocation {
  lat: number,
  lng: number,
}

export type Coords = {
  latlng: [number, number]
}

