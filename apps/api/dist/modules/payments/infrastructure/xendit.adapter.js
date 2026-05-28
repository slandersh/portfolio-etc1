"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenditAdapter = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let XenditAdapter = class XenditAdapter {
    constructor() {
        this.baseUrl = 'https://api.xendit.co';
        this.apiKey = process.env.XENDIT_SECRET_KEY;
    }
    get authHeader() {
        const encodedKey = Buffer.from(`${this.apiKey}:`).toString('base64');
        return { Authorization: `Basic ${encodedKey}` };
    }
    async createInvoice(dto) {
        const payload = {
            external_id: dto.invoiceNumber,
            amount: dto.amount,
            payer_email: dto.customerEmail,
            description: dto.description,
            success_redirect_url: dto.successRedirectUrl,
            failure_redirect_url: dto.failureRedirectUrl,
        };
        const { data } = await axios_1.default.post(`${this.baseUrl}/v2/invoices`, payload, {
            headers: this.authHeader,
        });
        return {
            providerInvoiceId: data.id,
            paymentUrl: data.invoice_url,
            status: data.status === 'PAID' ? 'PAID' : data.status === 'EXPIRED' ? 'EXPIRED' : 'PENDING',
        };
    }
    async verifyPayment(providerTxId) {
        const { data } = await axios_1.default.get(`${this.baseUrl}/v2/invoices/${providerTxId}`, {
            headers: this.authHeader,
        });
        return data.status === 'PAID';
    }
    async refundPayment(providerTxId, amount) {
        const payload = { amount };
        const { data } = await axios_1.default.post(`${this.baseUrl}/v2/invoices/${providerTxId}/refunds`, payload, {
            headers: this.authHeader,
        });
        return data.status === 'SUCCEEDED';
    }
};
exports.XenditAdapter = XenditAdapter;
exports.XenditAdapter = XenditAdapter = __decorate([
    (0, common_1.Injectable)()
], XenditAdapter);
//# sourceMappingURL=xendit.adapter.js.map