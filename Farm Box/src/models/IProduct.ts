export interface ICharact {
  title: string;
  type: string;
}

export interface IProduct {
  title: string;
  product_id: number;
  rate: number;
  countFeedback: number;
  countVideo: number;
  countQuestion: number;
  image_name: string[];
  charact: ICharact[];
  sales: string;
  price: number;
  price_with_sales: number;
  product_description: string;
}
