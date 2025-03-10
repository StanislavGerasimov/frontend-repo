export interface Show {
  _id?: string;
  name: string;
  rating: number;
  pricePerMinute: number;
}

export interface Customer {
  _id?: string;
  name: string;
  bankDetails: string;
  phone: string;
  contactPerson: string;
}

export interface Agent {
  _id?: string;
  name: string;
  commissionRate: number;
}

export interface Advertisement {
  _id?: string;
  show: Show;
  customer: Customer;
  agent: Agent;
  date: string;
  duration: number;
  totalCost?: number;
}
