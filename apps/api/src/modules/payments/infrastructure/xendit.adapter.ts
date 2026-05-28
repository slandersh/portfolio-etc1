import { Injectable } from '@nestjs/common';
import { IPaymentGateway, CreateGatewayInvoiceDto, GatewayInvoiceResponse } from '../domain/payment-gateway.interface';
import axios from 'axios';

@Injectable()
export class XenditAdapter implements IPaymentGateway {
  private readonly baseUrl = 'https://api.xendit.co';
  private readonly apiKey = process.env.XENDIT_SECRET_KEY!;

  private get authHeader() {
    const encodedKey = Buffer.from(`${this.apiKey}:`).toString('base64');
    return { Authorization: `Basic ${encodedKey}` };
  }

  async createInvoice(dto: CreateGatewayInvoiceDto): Promise<GatewayInvoiceResponse> {
    const payload = {
      external_id: dto.invoiceNumber,
      amount: dto.amount,
      payer_email: dto.customerEmail,
      description: dto.description,
      success_redirect_url: dto.successRedirectUrl,
      failure_redirect_url: dto.failureRedirectUrl,
    };

    const { data } = await axios.post(`${this.baseUrl}/v2/invoices`, payload, {
      headers: this.authHeader,
    });

    return {
      providerInvoiceId: data.id,
      paymentUrl: data.invoice_url,
      status: data.status === 'PAID' ? 'PAID' : data.status === 'EXPIRED' ? 'EXPIRED' : 'PENDING',
    };
  }

  async verifyPayment(providerTxId: string): Promise<boolean> {
    const { data } = await axios.get(`${this.baseUrl}/v2/invoices/${providerTxId}`, {
      headers: this.authHeader,
    });
    return data.status === 'PAID';
  }

  async refundPayment(providerTxId: string, amount: number): Promise<boolean> {
    const payload = { amount };
    const { data } = await axios.post(`${this.baseUrl}/v2/invoices/${providerTxId}/refunds`, payload, {
      headers: this.authHeader,
    });
    return data.status === 'SUCCEEDED';
  }
}
