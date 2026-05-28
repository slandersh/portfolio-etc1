"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentWorker = void 0;
const bull_1 = require("@nestjs/bull");
const prisma_service_1 = require("../../../database/prisma.service");
const client_1 = require("@prisma/client");
let PaymentWorker = class PaymentWorker {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async processPayment(job) {
        const { eventId, payload } = job.data;
        await this.prisma.$transaction(async (tx) => {
            const invoiceNumber = payload.external_id;
            const status = payload.status;
            const invoice = await tx.invoice.findUnique({
                where: { invoiceNumber },
                include: { organization: true },
            });
            if (!invoice)
                throw new Error(`Invoice ${invoiceNumber} not found`);
            if (status === 'PAID') {
                await tx.invoice.update({
                    where: { id: invoice.id },
                    data: {
                        status: client_1.InvoiceStatus.PAID,
                        paidAt: new Date(payload.updated),
                    },
                });
                await tx.payment.create({
                    data: {
                        invoiceId: invoice.id,
                        amount: payload.amount,
                        status: client_1.PaymentStatus.SUCCESS,
                        provider: 'XENDIT',
                        providerTxId: payload.id,
                    },
                });
                if (invoice.subscriptionId) {
                    const subscription = await tx.subscription.update({
                        where: { id: invoice.subscriptionId },
                        data: { status: 'ACTIVE' },
                        include: { plan: true },
                    });
                    const planFeatures = subscription.plan.features;
                    if (planFeatures && planFeatures.quotas) {
                        for (const key of Object.keys(planFeatures.quotas)) {
                            await tx.subscriptionUsage.upsert({
                                where: {
                                    subscriptionId_featureKey: {
                                        subscriptionId: subscription.id,
                                        featureKey: key,
                                    },
                                },
                                update: {
                                    limit: planFeatures.quotas[key],
                                    resetAt: subscription.currentPeriodEnd,
                                },
                                create: {
                                    subscriptionId: subscription.id,
                                    featureKey: key,
                                    limit: planFeatures.quotas[key],
                                    resetAt: subscription.currentPeriodEnd,
                                },
                            });
                        }
                    }
                }
                await tx.billingEvent.create({
                    data: {
                        organizationId: invoice.organizationId,
                        type: 'INVOICE_PAID',
                        description: `Invoice ${invoiceNumber} settled via Xendit.`,
                        amount: payload.amount,
                    },
                });
            }
            else if (status === 'EXPIRED') {
                await tx.invoice.update({
                    where: { id: invoice.id },
                    data: { status: client_1.InvoiceStatus.EXPIRED },
                });
            }
            await tx.webhookLog.update({
                where: { eventId },
                data: {
                    status: client_1.WebhookStatus.PROCESSED,
                    processedAt: new Date(),
                },
            });
        });
    }
};
exports.PaymentWorker = PaymentWorker;
__decorate([
    (0, bull_1.Process)('process-xendit-payment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentWorker.prototype, "processPayment", null);
exports.PaymentWorker = PaymentWorker = __decorate([
    (0, bull_1.Processor)('payment-processing'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentWorker);
//# sourceMappingURL=payment.worker.js.map