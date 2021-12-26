export class OrderItem {
  product?: {
    id?: string;
    name?: string;
    description?: string;
    richDescription?: string;
    image?: string;
    images?: string[];
    brand?: string;
    price?: number;
    category?: {
      id?: string;
      name?: string;
      icon?: string;
      color?: string;
      checked?: boolean;
    };
    countInStock?: number;
    rating?: number;
    numReviews?: number;
    isFeatured?: boolean;
    dateCreated?: string;
  };
  quantity?: number;
}
