import { IPaymentGateway, CreateGatewayInvoiceDto, GatewayInvoiceResponse } from '../domain/payment-gateway.interface';
export declare class XenditAdapter implements IPaymentGateway {
    private readonly baseUrl;
    private readonly apiKey;
    private get authHeader();
    createInvoice(dto: CreateGatewayInvoiceDto): Promise<GatewayInvoiceResponse>;
    verifyPayment(providerTxId: string): Promise<boolean>;
    refundPayment(providerTxId: string, amount: number): Promise<boolean>;
}
