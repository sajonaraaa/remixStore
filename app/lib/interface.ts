export interface Product {
    name: string;
    currency: string;
    price: number;
    slug: {
        current: string};
    description: string;
    imageUrl: string;
}


export interface ProductId {
  [x: string]: any;
  name: string;
  price: number;
  
  slug: {
    current: string;
  };
  quantity: number;
  description: string;
  currency: string;
  image: {
    _key: string;
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  }[];
}