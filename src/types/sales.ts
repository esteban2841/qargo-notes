

// types/sales.ts
export interface Product {
  _id: string;
  codigo: string;
  referencia: string;
  color: string;
  material: string;
  categoria: string;
  costo: string;
  precio: string;
  stock: string;
  marca: string;
  genero: string;
  tallas: Array<{
    cantidad: string;
    talla: string;
  }>;
  ciudad: {
    name: string;
    id: string;
  };
  departamento: {
    name: string;
    id: string;
  };
}

export interface PaymentInfo {
  date_approved: number;
  date_created: number;
  cuotas: number;
  payment_methods: string[];
  payment_method: {
    type: string;
  };
  status: string;
  status_detail: string;
  taxes: Array<{
    type: string;
    value: number;
  }>;
  transaction_details: {
    total_paid_amount: number;
    total_paid_amount_currency: string;
    total_paid_amount_with_tax: number;
    total_paid_amount_with_tax_currency: string;
    total_paid_amount_with_tax_details: {
      tax: number;
      subtotal: number;
    };
    installments: number;
    payment_method_id: string[];
  };
}

export interface UserPayer {
  _id: string;
  nombre: string;
  apellido: string;
  correo: string;
  usuario: string;
  celular: string;
  direccion: string;
  cedula: number;
  ciudad: {
    name: string;
    id: number;
  };
  departamento: {
    name: string;
    id: number;
  };
  rol: string;
}

export interface ShippingDetails {
  celular: string;
  nombre: string;
  apellido: string;
  cedula: number;
  departamento: {
    name: string;
    id: number;
  };
  ciudad: {
    name: string;
    id: number;
  };
  direccion: string;
  correo: string;
  fecha: number;
}

export interface Ticket {
  _id: string;
  products: Product[];
  paymentInfo: PaymentInfo;
  userPayer: UserPayer;
  shippingDetails: ShippingDetails;
  createdAt: string;
  updatedAt: string;
  totalAmount: number;
  payment_method: string;
  date_approved: number;
  cuotas: number;
  taxes: Array<{
    type: string;
    value: number;
  }>;
  status: string;
  userId: string;
  cedula: number;
  nombre: string;
}

export interface SalesMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalTax: number;
  revenueGrowth: number;
  ordersGrowth: number;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
  count?: number;
}
