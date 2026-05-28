"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const xendit_webhook_controller_1 = require("./webhooks/xendit-webhook.controller");
const payment_worker_1 = require("./queues/payment.worker");
const xendit_adapter_1 = require("./infrastructure/xendit.adapter");
const prisma_service_1 = require("../../database/prisma.service");
let PaymentsModule = class PaymentsModule {
};
exports.PaymentsModule = PaymentsModule;
exports.PaymentsModule = PaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'payment-processing',
            }),
        ],
        controllers: [xendit_webhook_controller_1.XenditWebhookController],
        providers: [
            payment_worker_1.PaymentWorker,
            prisma_service_1.PrismaService,
            {
                provide: 'IPaymentGateway',
                useClass: xendit_adapter_1.XenditAdapter,
            },
        ],
        exports: ['IPaymentGateway'],
    })
], PaymentsModule);
//# sourceMappingURL=payments.module.js.map