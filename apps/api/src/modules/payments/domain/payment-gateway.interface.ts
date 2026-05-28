export interface CreateGatewayInvoiceDto {
  invoiceNumber: string;
  amount: number;
  customerEmail: string;
  customerName: string;
  description: string;
  successRedirectUrl: string;
  failureRedirectUrl: string;
}

export interface GatewayInvoiceResponse {
  providerInvoiceId: string;
  paymentUrl: string;
  status: 'PENDING' | 'PAID' | 'EXPIRED';
}

export interface IPaymentGateway {
  createInvoice(dto: CreateGatewayInvoiceDto): Promise<GatewayInvoiceResponse>;
  verifyPayment(providerTxId: string): Promise<boolean>;
  refundPayment(providerTxId: string, amount: number): Promise<boolean>;
}
