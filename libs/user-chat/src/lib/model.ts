export class User {
  id?: string;
  name?: string;
  password?: string;
  email?: string;
  phone?: string;
  token?: string;
  isAdmin?: string;
  image?: string;
  street?: string;
  apartment?: string;
  zip?: string;
  city?: string;
  country?: string;
}

export interface Message {
  name: string;
  isSelf: boolean;
  message: string;
  time: string;
  image?: string;
}
