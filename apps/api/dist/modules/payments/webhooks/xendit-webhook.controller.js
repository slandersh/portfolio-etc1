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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenditWebhookController = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const prisma_service_1 = require("../../../database/prisma.service");
const client_1 = require("@prisma/client");
let XenditWebhookController = class XenditWebhookController {
    constructor(queue, prisma) {
        this.queue = queue;
        this.prisma = prisma;
    }
    async handleWebhook(callbackToken, payload) {
        if (callbackToken !== process.env.XENDIT_CALLBACK_TOKEN) {
            throw new common_1.UnauthorizedException('Invalid callback token');
        }
        const eventId = payload.id;
        const eventType = payload.status;
        const existingLog = await this.prisma.webhookLog.findUnique({
            where: { eventId },
        });
        if (existingLog) {
            return { status: 'duplicate', message: 'Event already processed' };
        }
        await this.prisma.webhookLog.create({
            data: {
                provider: 'XENDIT',
                eventId,
                eventType,
                payload,
                status: client_1.WebhookStatus.RECEIVED,
            },
        });
        await this.queue.add('process-xendit-payment', { eventId, payload }, {
            attempts: 5,
            backoff: { type: 'exponential', delay: 2000 },
            removeOnComplete: true,
        });
        return { status: 'queued' };
    }
};
exports.XenditWebhookController = XenditWebhookController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Headers)('x-callback-token')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], XenditWebhookController.prototype, "handleWebhook", null);
exports.XenditWebhookController = XenditWebhookController = __decorate([
    (0, common_1.Controller)('webhooks/xendit'),
    __param(0, (0, bull_1.InjectQueue)('payment-processing')),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService])
], XenditWebhookController);
//# sourceMappingURL=xendit-webhook.controller.js.map