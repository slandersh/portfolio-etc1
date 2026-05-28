import { Job } from 'bull';
import { PrismaService } from '../../../database/prisma.service';
export declare class PaymentWorker {
    private readonly prisma;
    constructor(prisma: PrismaService);
    processPayment(job: Job<{
        eventId: string;
        payload: any;
    }>): Promise<void>;
}
