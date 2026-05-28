import { Queue } from 'bull';
import { PrismaService } from '../../../database/prisma.service';
export declare class XenditWebhookController {
    private readonly queue;
    private readonly prisma;
    constructor(queue: Queue, prisma: PrismaService);
    handleWebhook(callbackToken: string, payload: any): Promise<{
        status: string;
        message: string;
    } | {
        status: string;
        message?: undefined;
    }>;
}
