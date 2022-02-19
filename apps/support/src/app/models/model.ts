export interface Message {
  name: string;
  isSelf: boolean;
  message: string;
  time: string;
  image?: string;
  isBot: boolean;
}

export interface WritingEvenetData {
  roomId: any;
  controller: any;
}
